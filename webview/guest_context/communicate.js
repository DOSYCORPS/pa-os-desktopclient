"use strict";
{
  /* guest-host communication across webview: guest side */

  /* we must use ipcRenderer.sendToHost */
  /* and we hide it from the guest page */

  const {ipcRenderer} = require('electron');
  const v8Util = process.atomBinding('v8_util');

  function install() {
    v8Util.setHiddenValue(self, "sendMessage", sendMessage);
  }

  function sendMessage( ...args ) {
    ipcRenderer.sendToHost('ipc-message', ...args );
  }
}
