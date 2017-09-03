"use strict";
{
  /* guest-host communication, across webview boundary: host side */

  // We hook any incoming ipc message to window message event
  // So in the host ipc messages from webview can be subscribed to by using
  // message event of window

  module.exports = { install };

  function install(sel) {
    let wv;

    if ( !sel ) {
      throw new TypeError("Need to provide webview selector");
    }
    self.addEventListener('load', () => wv = document.querySelector(sel) );
    self.addEventListener('load', install_ipc_listener );
    self.addEventListener('load', install_ipc_messenger );

    function install_ipc_listener() {
      wv.addEventListener('ipc-message', message => {
        const {args} = message;
        self.postMessage(args,"*");
      });
    }

    function install_ipc_messenger() {
      Object.assign( self, { sendMessage } );
    }

    function sendMessage( ...args ) {
      wv.send('ipc-message', ...args ); 
    }

    return sendMessage;
  }
}
