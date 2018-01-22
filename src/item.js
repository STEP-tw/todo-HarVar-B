class Item{
  constructor(content){
    this._content=content;
    this._isDone=false;
  }
  get content(){
    return this._content;
  }
  get isDone(){
    return this._isDone;
  }
  changeContent(content){
    this._content=content;
  }
  tick(){
    this._isDone=true;
  }
  untick(){
    this._isDone=false;
  }
}
module.exports=Item;
