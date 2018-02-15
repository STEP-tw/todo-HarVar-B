const addMoreItem = function(){
  let newItem = document.getElementById("addItem");
  let itemsCount = newItem.children.length/2;
  let textBox = document.createElement("textarea");
  let newLine = document.createElement("br");
  textBox.rows="2";
  textBox.cols="60";
  textBox.name="items";
  textBox.id="item"+itemsCount+"content";
  newItem.appendChild(newLine);
  newItem.appendChild(textBox);
}
