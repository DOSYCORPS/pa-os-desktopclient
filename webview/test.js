"use strict";
{
  module.exports = { install };

  let wv;

  function install() {
    self.addEventListener('load', run );
  }

  function run() {
    // this initial message doesn't necesarily work because the webview may not be loaded at that time
    sendMessage( "cris", "the host", {is:true}, 12312312321, {awesome:'really'});
    addEventListener('message', msg => {
      //console.log("What is saying?", msg.data );
      sendMessage( "cris", "the host", {is:true}, 12312312321, {awesome:'really'});
    });
  }
}
