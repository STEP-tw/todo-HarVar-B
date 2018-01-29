const DefaultHandler = require('./defaultHandler.js');
const User = require('../src/user.js');
const registered_users = require('../users/allUsers.js')._allUsers;

class PostUpdateTodoHandler extends DefaultHandler {
  constructor(fs) {
    super();
    this.fs=fs;
  }
  writeToFile(user,todoHandler){
    let todos = JSON.stringify(todoHandler.todo_s,null,2);
    this.fs.writeFileSync(`./users/${user.username}.json`,todos);
    return;
  }
  execute(req,res){
    let todoHandler = new User(req.cookies.username);
    let user = req.user;
    todoHandler.loadToDo_s(this.fs.readFileSync(`./users/${req.cookies.username}.json`));
    let action = req.body.action;
    let todo = req.body.todoId;
    let item = req.body.itemId;
    todoHandler[action](todo,item);
    this.writeToFile(user,todoHandler);
    res.end();
  }
}
module.exports = PostUpdateTodoHandler;
