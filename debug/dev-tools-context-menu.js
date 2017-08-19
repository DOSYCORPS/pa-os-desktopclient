/**
 * Taken and adapted from here: https://stackoverflow.com/a/32636751
 * SO answer by Tanner Semarad (https://stackoverflow.com/users/427339/tanner-semerad)
 **/

"use strict";
{
  const {remote} = require('electron');
  const {Menu,MenuItem} = remote;

  const menu = new Menu();
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: () => {
      remote.getCurrentWindow().webContents.openDevTools();
      remote.getCurrentWindow().devToolsWebContents.focus();
      remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
    }
  });

  const dev_tools_context_menu = {
    install
  };

  let rightClickPosition = null;

  menu.append(menuItem);

  module.exports = dev_tools_context_menu;

  function install() {
    window.addEventListener('contextmenu', e => {
      e.preventDefault();
      rightClickPosition = {x: e.x, y: e.y};
      menu.popup(remote.getCurrentWindow());
    }, false);
  }
}
