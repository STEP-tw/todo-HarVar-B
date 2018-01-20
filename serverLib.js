let fs = require('fs');
let registered_users = [{userName:'harshab',name:'Harsha Vardhana B'}];
let setContentType = function (fileName) {
  let headers = {
    js: 'text/javascript',
    html: 'text/html',
    css: 'text/css',
    jpg: 'img/jpg',
    pdf: 'application/pdf',
    gif: 'image/gif',
    ico: 'image/ico',
    txt: 'text/plain',
    undefined: 'text/plain'
  }
  let fileType = fileName.split('.')[2];
  return headers[fileType];
};

let getFileName = function (request) {
  let fileName = request.url.substr(1);
  return './public/' + (fileName || 'homePage.html');
};

let joinStrings = function (strg1,strg2) {
  return strg1 + " " + strg2;
};

let getTime = function () {
  let date = new Date;
  let humanReadableDate = date.toDateString();
  let humanReadableTime = date.toLocaleTimeString();
  return joinStrings(humanReadableDate,humanReadableTime);
};

let handleRequests = function (request,response) {
  let fileName = getFileName(request);
  let data = fs.readFileSync(fileName);
  if(request.user && request.cookies.sessionid){
    response.setHeader('Content-Type',setContentType(fileName));
    response.write(data);
    response.end();
    return;
  }
  response.setHeader('Content-Type',setContentType(fileName));
  response.write(data);
  response.end();
}

exports.handleRequests = handleRequests;
