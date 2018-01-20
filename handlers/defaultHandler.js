class DefaultHandler {
  constructor() {}
  execute(){}
  requestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = DefaultHandler;
