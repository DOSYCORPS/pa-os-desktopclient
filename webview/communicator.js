"use strict";
{
  /* guest-host communication, across webview boundary: host side */

  // We hook any incoming ipc message to window message event
  // So in the host ipc messages from webview can be subscribed to by using
  // message event of window

  module.exports = { setup_webview };

  function setup_webview() {
    self.addEventListener('load', install_ipc_listener );
  }

  function install_ipc_listener() {
    const wv = document.querySelector('webview');
    wv.addEventListener('ipc-message', message => {
      const {args} = message;
      self.postMessage(args,"*");
    });
  }
}
