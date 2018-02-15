var userTodos = {};
const getTodos = ()=>{
  let titles = document.getElementById("titles");
  let handler = function(){
    userTodos = JSON.parse(this.responseText);
    let todoIds = Object.keys(userTodos);
    let content = '';
    todoIds.forEach(id=>{
      content+=`<li id=todo_${id} ondblclick=expandTodo(${id})>`
      content+=userTodos[id]._title;
      content+=`</li>`
      // content+=`<br>`
    });
    titles.innerHTML = content;
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load',handler);
  xhr.open('GET','/getTodo');
  xhr.send();
}

window.onload = getTodos;
