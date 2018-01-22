const processItems = (todo)=>{
  let itemsBox = document.getElementById("items");
  let allItems = todo._items;
  let itemsId = Object.keys(allItems);
  content = ""
  itemsId.forEach(id=>{
    content+=`<input type="checkbox" name="" value=""></input>
    <input id="items"type="text" name="items" value="${allItems[id]._content}"></input><br>`
  });
  return content;
}
const processTitle=(_title)=>{
  return `Title :<input id="title"type="text" name="title" value='${_title}'></input>`;
}
const processdescription=(_description)=>{
  return `Description :<input id="title"type="text" name="title" value='${_description}'></input>`;
}
const expandTodo = (id)=>{
  let reqTodo = userTodos[id];
  let title = reqTodo._title;
  let description = reqTodo._description;
  let titleBox = document.getElementById("title");
  let descriptionBox = document.getElementById("description");
  let formDiv = document.getElementById("form");
  let content = `<form class="todo" action="/updateTodo" method="post">`;
  content+= processTitle(title);
  content+= processdescription(description);
  content+=`<br>Items :<br>`
  content+= processItems(reqTodo);
  content+= `<button type="submit" name="submit">Submit</button>
</form>`
  formDiv.innerHTML=content;
}
