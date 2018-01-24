const timeStamp = require('./time.js').timeStamp;
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
let User = require('./src/user.js');
const StaticFileHandler = require('./handlers/staticFileHandler');
const PostAddTodoHandler = require('./handlers/postAddTodoHandler');
const PostUpdateTodoHandler = require('./handlers/postUpdateTodoHandler');
let registered_users = require('./users/allUsers.js')._allUsers;
let toS = o=>JSON.stringify(o,null,2);
/*============================================================================*/
let logRequest = (req,res,next)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
  next();
}
let loadUser = (req,res,next)=>{
  let sessionid = req.headers.cookie.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
  next();
};
const redirectToLoginPage = (req,res)=>{
  if(req.urlIsOneOf(['/','/homePage.html','/viewList.html','/addTodo.html','/viewTodo.html'])&&!req.user) res.redirect('/loginPage.html');
}
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/loginPage.html']) && req.user) res.redirect('/homePage.html');
}
/*============================================================================*/
let app = express();
app.use(logRequest);
app.use(express.urlencoded({extended:false,type:req=>true}))
app.use(cookieParser());
app.use(express.static('public'));
app.get('/',(req,res)=> !req.user && res.redirect('/loginPage.html'));
app.get('/logout',(req,res)=>{res.redirect('/loginPage.html')});
app.get('/getTodo',(req,res)=>{
  let data = fs.readFileSync(`./users/${req.cookies.userName}.json`);
  res.send(data);
})
app.post('/loginPage.html',(req,res,next)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.cookie('logInFailed','true',{maxAge : 5});
    res.redirect('/loginPage.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.cookie('user',user);
  res.cookie('sessionid',`${sessionid}`);
  res.cookie('userName',`${user.userName}`);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
});
let postAddTodoHandler = new PostAddTodoHandler(fs);
app.post("/addTodo.html",postAddTodoHandler.requestHandler());
let postUpdateTodoHandler = new PostUpdateTodoHandler(fs);
app.post("/updateTodo/action/:action/todoId/:todoId/itemId/:itemId",(req,res)=>{
  console.log(req);
  let todoHandler = new User(req.cookies.username);
  let user = registered_users.find(u=>u.userName==req.cookies.username);
  todoHandler.loadToDo_s(fs.readFileSync(`./users/${req.cookies.userName}.json`));
  let action = req.params.action;
  let todo = req.params.todoId;
  let item = req.params.itemId;
  console.log(`action===>${action}\ntodo===>${todo}\nitem===>${item}`);
  todoHandler[action](todo,item);
  let todos = JSON.stringify(todoHandler.todo_s,null,2);
  fs.writeFileSync(`./users/${req.cookies.userName}.json`,todos);
  res.end();
});
module.exports = app;
