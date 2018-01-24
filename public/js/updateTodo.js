const deleteItemAtServer = function(todoId,itemId){
  let todoData="";
  todoData += `action/deleteItem/todoId/${todoId}/itemId/${itemId}`;
  console.log(`todoData ========> ${JSON.stringify(todoData)}`);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `/updateTodo/${todoData}`);
  xhr.send(todoData);
}
const deleteItem = function(event,todoId,itemId){
  console.log(`itemID=======>${JSON.stringify(itemId)}`);
  deleteItemAtServer(todoId,itemId);
  window.location.reload();
}
const editItem = function(){

}
