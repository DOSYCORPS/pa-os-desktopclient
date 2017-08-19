"use strict";
{
  const appMenu = require('./appMenu.js');
  const devToolsContextMenu = require('./debug/dev-tools-context-menu.js');

  module.exports = { install };

  function install() {
    appMenu.install();
    devToolsContextMenu.install();
  }
}
