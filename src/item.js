class Item{
  constructor(name){
    this.name=name;
    // this.description=description;
    this.done=false;
  }
  get getName(){
    return this.name;
  }
  // get getDescription(){
  //   return this.description;
  // }
  get isDone(){
    return this.done;
  }
  changeName(name){
    this.name=name;
  }
  // setDescription(description){
  //   this.description=description;
  // }
  tick(){
    this.done=true;
  }
  untick(){
    this.done=false;
  }
}
module.exports=Item;
