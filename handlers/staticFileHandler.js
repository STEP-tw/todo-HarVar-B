const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');

class StaticFileHandler extends DefaultHandler {
  constructor() {
    super();
  }
  setContentType(fileName) {
    let headers = {
      '.js': 'text/javascript',
      '.html': 'text/html',
      '.css': 'text/css',
      '.jpg': 'img/jpg',
      '.pdf': 'application/pdf',
      '.gif': 'image/gif',
      '.ico': 'image/ico',
      '.txt': 'text/plain',
      undefined: 'text/plain'
    }
    let fileType = fileName.slice(fileName.lastIndexOf('.'));
    return headers[fileType];
  };
  execute(req,res){
    let filePath = `./public${req.url}`;
    if(fs.existsSync(filePath)) {
      res.setHeader('Content-Type',this.setContentType(filePath));
      res.write(fs.readFileSync(filePath));
      res.end();
    }
  }
}

module.exports = StaticFileHandler;
