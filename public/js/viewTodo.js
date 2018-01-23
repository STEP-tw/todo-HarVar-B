const processItems = (todo,todoId)=>{
  let itemsBox = document.getElementById("items");
  let allItems = todo._items;
  let itemsId = Object.keys(allItems);
  content = `<tr><td><b>Items<b></td><td></td></tr>`
  itemsId.forEach(id=>{
    content+=`<tr id="${id}">`
    content+=`<td><input  type="checkbox" name="" value=""`;
    allItems[id]['_isDone'] && (content+=`checked`);
    content+=`></input></td>`;
    content+=`<td>${allItems[id]._content}</td>`
    content+=`<td><button type="button" onclick="editItem(event)">Edit</button></td>`;
    content+=`<td><button type="button" onclick="deleteItem(event,${todoId},${id})">Delete</button></td>`;
  });
  return content;
}
const processTitle=(_title)=>{
  return `<tr><td><b>Title<b></td><td>${_title}</td></tr>`;
}
const processdescription=(_description)=>{
  return `<tr><td><b>Description<b></td><td>${_description}</td></tr>`;
}
const expandTodo = (todoId)=>{
  let reqTodo = userTodos[todoId];
  let title = reqTodo._title;
  let description = reqTodo._description;
  let titleBox = document.getElementById("title");
  let descriptionBox = document.getElementById("description");
  let formDiv = document.getElementById("form");
  let content =`<table>`
  content+=processTitle(title);
  content+= processdescription(description);
  content+=processItems(reqTodo,todoId);
  content+=`<tr><td></td><td><button type="button" style="font-size:16px">Save</button></td></tr>`
  content+=`</table>`
  formDiv.innerHTML=content;
}
