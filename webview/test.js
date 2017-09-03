"use strict";
{
  module.exports = { install };

  let wv;

  function install() {
    self.addEventListener('load', run );
  }

  function run() {
    // this initial message doesn't necesarily work because the webview may not be loaded at that time
    sendMessage( {ping:true} );
    addEventListener('message', msg => {
      console.log("Message in", msg.data );
      sendMessage( {ack:true} );
    });
  }
}
