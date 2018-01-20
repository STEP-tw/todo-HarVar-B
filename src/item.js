class Item{
  constructor(content){
    this._content=content;
    // this.description=description;
    this._isDone=false;
  }
  get content(){
    return this._content;
  }
  // get getDescription(){
  //   return this.description;
  // }
  get isDone(){
    return this._isDone;
  }
  changeContent(content){
    this._content=content;
  }
  // setDescription(description){
  //   this.description=description;
  // }
  tick(){
    this._isDone=true;
  }
  untick(){
    this._isDone=false;
  }
}
module.exports=Item;
