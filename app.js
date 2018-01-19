const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const handleRequests = require('./serverLib.js').handleRequests;
const User = require('./src/user.js');
let registered_users = [{userName:'harshab',name:'Harsha Vardhana B'}];
let toS = o=>JSON.stringify(o,null,2);
/*============================================================================*/
let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const redirectToLoginPage = (req,res)=>{
  if(req.urlIsOneOf(['/','/homePage.html'])&&!req.user) res.redirect('/loginPage.html');
}

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/loginPage.html']) && req.user) res.redirect('/homePage.html');
}
/*============================================================================*/
let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectToLoginPage);
// app.get('/',handleRequests);
app.get('/homePage.html',handleRequests);
app.get('/css/style.css',handleRequests);
app.get('/viewList.html',handleRequests);
app.get("/viewList.js",handleRequests);

app.get('/loginPage.html',(req,res)=>{
  if(req.user && req.user.sessionid){
    res.redirect('/homePage.html');
    res.end();
    return;
  }
  if(req.cookies.logInFailed) {res.write('<p>logIn Failed</p>')};
  res.write(fs.readFileSync('./public/loginPage.html','utf-8'));
  res.end();
});
app.get("/todoS",(req,res)=>{
  let user = req.cookies.username;
  let handler = new User(user);
  let userData = fs.readFileSync('./users/'+user+'.json','utf-8');
  res.write(userData);
  res.end();
});
app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=null;Expires=${new Date(1).toUTCString()}`,`username=null;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
});

app.post('/loginPage.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true;max-age=5;`);
    res.redirect('/loginPage.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',[`sessionid=${sessionid}`,`username=${user.userName}`]);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
});
app.post("/homePage.html",(req,res)=>{
  let user = req.cookies.username;
  let handler = new User(user);
  let title = req.body.todoTitle.toString();
  let description = req.body.todoDescription.toString();
  handler.createNew(title,description);
  handler.saveToDo_s();
  res.redirect('/homePage.html')
  res.end();
});

module.exports = app;
