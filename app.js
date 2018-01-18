const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const handleRequests = require('./serverLib.js').handleRequests;
const User = require('./src/user.js');
let registered_users = [{userName:'harshab',name:'Harsha V Boorla'}];
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

  // console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/login']) && req.user) res.redirect('homePage.html');
}
/*============================================================================*/
let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.get('/',handleRequests)
app.get('/homePage.html',handleRequests);
app.get('/css/style.css',handleRequests);
app.get('/viewList.html',handleRequests);
app.get("/todoS",(req,res)=>{
  // console.log(req.body);
  let user = req.cookies.username;
  let handler = new User(user);
  res.write(JSON.stringify(handler.todo_s));
  res.end();
});
app.get("/viewList.js",handleRequests);
app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=null;Expires=${new Date(1).toUTCString()}`,`username=null;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
});
app.post('/',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true;max-age=5;`);
    res.redirect('/');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',[`sessionid=${sessionid}`,`username=${user.userName}`]);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
});
app.post("/homePage.html",(req,res)=>{
  // console.log(req.body);
  let user = req.cookies.username;
  let handler = new User(user);
  let title = req.body.todoTitle.toString();
  // console.log(title);
  let description = req.body.todoDescription.toString();
  // console.log(description);
  handler.createNew(title,description);
  // console.log(handler);
  handler.saveToDo_s();
  res.redirect('/homePage.html')
  res.end();
});

module.exports = app;
