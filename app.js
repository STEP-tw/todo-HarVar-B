const timeStamp = require('./time.js').timeStamp;
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
let User = require('./src/user.js');
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
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.id==sessionid);
  if(sessionid && user){
    req.user = user;
  }
  next();
};
const redirectToLoginPage = (req,res,next)=>{
  if(['/','/homePage.html','/viewList.html','/addTodo.html','/viewTodo.html'].includes(req.url)&& !req.user) res.redirect('/loginPage.html');
  else next();
}
const redirectLoggedInUserToHome = (req,res,next)=>{
  if(['/','/loginPage.html'].includes(req.url) && req.user) {
    res.redirect('/homePage.html');
  } else next();
}
/*============================================================================*/
let postAddTodoHandler = new PostAddTodoHandler(fs);
let postUpdateTodoHandler = new PostUpdateTodoHandler(fs);
let app = express();
app.use(logRequest);
app.use(express.urlencoded({extended:false,type:req=>true}))
app.use(cookieParser());
app.use(loadUser);
app.use(redirectToLoginPage);
app.use(redirectLoggedInUserToHome);
app.use(express.static('public'));
app.get('/logout',(req,res)=>{
  res.clearCookie('username');
  res.clearCookie('username');
  res.clearCookie('user');
  res.clearCookie('sessionid');
  res.redirect('/loginPage.html')
});
app.get('/getTodo',(req,res)=>{
  let data = fs.readFileSync(`./users/${req.user.username}.json`,'utf8');
  res.send(data);
})
app.post('/loginPage.html',(req,res,next)=>{
  let user = registered_users.find(u=>u.username==req.body.username);
  if(!user) {
    res.cookie('logInFailed','true',{maxAge:3000});
    res.redirect('/loginPage.html');
    return;
  }
  let sessionid = user.id;
  res.cookie('sessionid',`${sessionid}`);
  res.cookie('username',`${user.username}`);
  res.redirect('/homePage.html');
});
app.post("/addTodo.html",postAddTodoHandler.requestHandler());
app.post("/updateTodo/action/:action/todoId/:todoId/itemId/:itemId",(req,res)=>{
  let todoHandler = new User(req.cookies.username);
  let user = req.user;
  todoHandler.loadToDo_s(fs.readFileSync(`./users/${req.cookies.username}.json`));
  let action = req.params.action;
  let todo = req.params.todoId;
  let item = req.params.itemId;
  todoHandler[action](todo,item);
  let todos = JSON.stringify(todoHandler.todo_s,null,2);
  fs.writeFileSync(`./users/${req.cookies.username}.json`,todos);
  res.end();
});
module.exports = app;
