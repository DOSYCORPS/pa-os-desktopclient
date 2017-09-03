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
    sendMessage({ping:true});
    onMessage( (...args) => {
      console.log("Message in", ...args );
      self.inbox.push( args );
    });
  }
}
