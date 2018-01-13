let todoS = {};

const getTodoS= function() {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.responseText);
    todoS=JSON.parse(this.responseText);
    console.log(todoS);
    let block = document.getElementById("title");
    block.innerHTML = JSON.stringify(todoS);
  };
  xhttp.open("GET","todoS");
  xhttp.send();
}
window.onload = getTodoS;
