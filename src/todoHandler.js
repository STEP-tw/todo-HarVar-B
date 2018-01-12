const ToDo = require('./todo.js');
const fs = require('fs');

class ToDoHandler{
  constructor(name){
    this.userName=name;
    this.storagePath="./users/"+name+".json";
    this.todo_s={};
    this.readFile();
  }
  readFile(){
    if(fs.existsSync(this.storagePath)){
      let data = fs.readFileSync(this.storagePath);
      try{
        this.todo_s = JSON.parse(data);
        // this.rebuildPrototypes();
      }catch(e){console.log(e);}

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
  editToDo(oldName,newName,newDescription){
    let todo = this.todo_s[oldName];
    todo.changeName(newName);
    if(newDescription) todo.changeDescription(newDescription);
    this.deleteToDo(oldName);
    this.todo_s[newName]=todo;
  }
  get todo_s_count(){
    return Object.keys(this.todo_s).length;
  }
  saveToDo_s(){
    let data = JSON.stringify(this.todo_s);
    fs.writeFileSync(this.storagePath,data);
  }
}
module.exports= ToDoHandler;
