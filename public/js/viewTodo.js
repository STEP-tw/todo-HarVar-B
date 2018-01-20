const processItems = (todo)=>{
  let allItems = todo._items;
  let itemsId = Object.keys(allItems);
  let items = '';
  itemsId.forEach(id=>{
    items+=`${allItems[id]._content}<br>`
  })
  return items;
}

const expandTodo = (id)=>{
  let reqTodo = userTodos[id];
  let todo = document.getElementById("todo");
  let title = reqTodo._title;
  let description = reqTodo._description;
  let items = processItems(reqTodo);
  let requestedTodo = `Title : ${title} <br> Description : ${description} <br> Todo Items : ${items}`;
  todo.innerHTML = requestedTodo;
}
