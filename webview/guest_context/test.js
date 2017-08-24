"use strict";
{
  const v8Util = process.atomBinding('v8_util');

  module.exports = { install };

  function install() {
    addEventListener('load', run );
  }

  function run() {
    self.inbox = [];
    const sendMessage = v8Util.getHiddenValue(self, "sendMessage");
    const onMessage = v8Util.getHiddenValue(self, "onMessage");
    sendMessage("cris", "is", 1000, { awesome: true } );
    onMessage( (...args) => {
      //console.log("Incoming message from host", ...args );
      self.inbox.push( args );
    });
  }
}
