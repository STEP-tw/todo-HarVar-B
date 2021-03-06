const DefaultHandler = require('./defaultHandler.js');
const User = require('../src/user.js');
const registered_users = require('../users/allUsers.js')._allUsers;

class PostAddTodoHandler extends DefaultHandler {
  constructor(fs) {
    super();
    this.fs=fs;
  }
  addItems(req,todoHandler){
    let items = req.body.items;
    typeof(items)=='string' && todoHandler.addItem(items);
    Array.isArray(items) && items && items.forEach(content=>todoHandler.addItem(content));
    return todoHandler;
  }
  addTodo(req,todoHandler){
      let title = req.body.title;
      let description = req.body.description;
      todoHandler.createNew(title,description);
      todoHandler = this.addItems(req,todoHandler);
      return todoHandler;
  }
  writeToFile(user,todoHandler){
    let todos = JSON.stringify(todoHandler.todo_s,null,2);
    this.fs.writeFileSync(`./users/${user.username}.json`,todos);
    return;
  }
  execute(req,res){
    let todoHandler = new User(req.cookies.username);
    let user = req.user;
    todoHandler.loadToDo_s(this.fs.readFileSync(`./users/${user.username}.json`));
    todoHandler = this.addTodo(req,todoHandler);
    this.writeToFile(user,todoHandler);
    res.redirect('/homePage.html');
    res.end();
  }
}
module.exports = PostAddTodoHandler;
