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
  // console.log('Content-Type has been set as', headers[fileType]);
  return headers[fileType];
};

let getFileName = function (request) {
  let fileName = request.url.substr(1)
  return './public/' + (fileName || 'loginPage.html');
};

let replaceEqualsWithColon = function (string) {
  return string.replace('=',':');
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
  // console.log("Request for " + fileName + " received.");
  // console.log(request);
  // Print the name of the file for which request is made.
  let data = fs.readFileSync(fileName);
  // Read the requested file content from file system
  // console.log(request.user);
  // console.log(setContentType(fileName));
  if(request.user &&request.headers.cookies.sessionid){
    if(request.cookies.logInFailed) response.write('<p>logIn Failed</p>');
    response.setHeader('Content-Type',setContentType(fileName))
    response.write(data);
    response.end();
    return;
  }
  response.redirect('/loginPage.html')
  response.end();
}

exports.handleRequests = handleRequests;
