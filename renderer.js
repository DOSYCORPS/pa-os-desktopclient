"use strict";
{
  const devToolsContextMenu = require('./debug/dev-tools-context-menu.js');

  module.exports = { install };

  function install() {
    devToolsContextMenu.install();
  }
}
