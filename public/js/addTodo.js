const addMoreItem = ()=>{
  let newItem = document.getElementById("addItem");
  let textBox = document.createElement("textarea");
  let newLine = document.createElement("br");
  textBox.rows="2";
  textBox.cols="60";
  textBox.name="items";
  newItem.appendChild(newLine);
  newItem.appendChild(textBox);
}
