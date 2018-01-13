const ToDo = require('./todo.js');
const fs = require('fs');

class ToDoHandler{
  constructor(name){
    this.userName=name;
    this.storagePath="./users/"+name+".js";
    this.todo_s={};
    this.readFile();
  }
  readFile(){
    if(fs.existsSync(this.storagePath)){
      let data = null;
      try{
        data =  fs.readFileSync(this.storagePath,'utf-8');
        this.todo_s = JSON.parse(data);
        // this.rebuildPrototypes();
      }catch(e){console.error(e);}
    }
  }
  addItem(todo,itemName,description){
    this.todo_s[todo].addItem(itemName,description);
  }
  createNew(name,description){
    let todo = new ToDo(name,description);
    this.todo_s[name] = todo;
  }
  get getStoragePath(){
    return this.storagePath;
  }
  deleteToDo(name){
    delete this.todo_s[name];
  }
  getToDo(name){
    return this.todo_s[name];
  }
  editToDo(oldTitle,newTitle,newDescription){
    let todo = this.todo_s[oldTitle];
    todo.changeTitle(newTitle);
    if(newDescription) todo.changeDescription(newDescription);
    this.deleteToDo(oldTitle);
    this.todo_s[newTitle]=todo;
  }
  get todo_s_count(){
    return Object.keys(this.todo_s).length;
  }
  saveToDo_s(){
    let data = JSON.stringify(this.todo_s);
    fs.writeFileSync(this.storagePath,data,'utf-8');
  }
}
module.exports= ToDoHandler;
