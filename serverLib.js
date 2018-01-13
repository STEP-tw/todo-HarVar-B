let fs = require('fs');
let registered_users = [{userName:'dev',name:'sridevs'}];
let setContentType = function (fileName) {
  let headers = {
    js: {'Content-Type': 'text/javascript'},
    html: {'Content-Type': 'text/html'},
    css: {'Content-Type': 'text/css'},
    jpg: {'Content-Type': 'img/jpg'},
    pdf: {'Content-Type': 'application/pdf'},
    gif: {'Content-Type': 'image/gif'},
    ico: {'Content-Type': 'image/ico'},
    txt: {'Content-Type': 'text/plain'},
    undefined: {'Content-Type': 'text/plain'}
  }

  let fileType = fileName.split('.')[2];
  console.log('Content-Type has been set as', headers[fileType]);
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

let handleRequests = function (request, response) {
  // Read the requested file content from file system
  let fileName = getFileName(request);
  // Print the name of the file for which request is made.
  console.log("Request for " + fileName + " received.");
  let data = fs.readFileSync(fileName);
  if(request.cookies.logInFailed) response.write('<p>logIn Failed</p>');
  response.write(data);
  response.end();
}

exports.handleRequests = handleRequests;
