const DefaultHandler = require('./defaultHandler.js');
const User = require('../src/user.js');
const registered_users = require('../users/allUsers.js')._allUsers;
const fs = require('fs');

class PostAddTodoHandler extends DefaultHandler {
  constructor() {
    super();
  }
  addItems(req,todoHandler){
    let items = req.body.items;
    items && items.forEach(content=>todoHandler.addItem(content));
    return todoHandler;
  }
  addTodo(req,user,todoHandler){
      let title = req.body.title;
      let description = req.body.description;
      todoHandler.createNew(title,description);
      todoHandler = this.addItems(req,todoHandler);
      return todoHandler;
  }
  writeToFile(user,todoHandler){
    let todos = JSON.stringify(todoHandler.todo_s,null,2);
    fs.writeFileSync(`./users/${user.userName}.json`,todos);
    return;
  }
  execute(req,res){
    let todoHandler = new User(req.cookies.username);
    let user = registered_users.find(u=>u.userName==req.cookies.username);
    todoHandler.loadToDo_s(fs.readFileSync(`./users/${user.userName}.json`));
    todoHandler = this.addTodo(req,user,todoHandler);
    this.writeToFile(user,todoHandler);
    res.redirect('/homePage.html');
    res.end();
  }
}
module.exports = PostAddTodoHandler;
