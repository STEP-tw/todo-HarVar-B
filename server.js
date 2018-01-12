const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');

const registered_users=[{userName:'harshab',name:'Harsha Vardhana'}];

let app = WebApp.create();
app.get("/index.html",(req,res)=>{
  console.log(req.cookies);
  let user = registered_users.find(u=>u.userName==req.cookies.userName);
  res.write(`<p>welcome ${user.name}</p>`);
  res.end();
});
app.get("/homePage.html",(req,res)=>{
  // console.log("req.cookies:\n",req.cookies);
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./homePage.html'));
  res.end();
});
app.get("/login.html",(req,res)=>{
  // console.log("req.cookies:\n",req.cookies);
  res.setHeader('Content-type','text/html');
  if(req.cookies.logInFailed) res.write('<p>please login to continue.</p>');
  res.write('<form method="POST"> UserName: <input name="userName"><br>place: <input name="place"> <br><input type="submit"></form>');
  // res.write(fs.readFileSync('login.html'));
  res.end();
});
app.post('/login.html',(req,res)=>{
  // console.log("***\n",req.body);
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/homePage.html');
    res.end();
    return;
  }
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  res.setHeader('Set-Cookie',[`sessionid=${sessionid}`,`userName=${user.userName}`]);
  res.redirect('/index.html');
  res.end();
});
app.get('/logout.html',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=null;Expires=${new Date(1).toUTCString()}`,`logInFailed=null;Expires=${new Date(1).toUTCString()}`])
  res.redirect('/login.html');
  res.end();
});

const PORT = 8000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
