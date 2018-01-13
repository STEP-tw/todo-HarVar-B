let todoS = {};

const getTodoS= function() {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.res);
  };
  xhttp.open("GET","todoS");
  xhttp.send();
}
window.onload = getTodoS;
