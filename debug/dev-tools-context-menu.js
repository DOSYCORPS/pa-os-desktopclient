/**
 * Taken and adapted from here: https://stackoverflow.com/a/32636751
 * SO answer by Tanner Semarad (https://stackoverflow.com/users/427339/tanner-semerad)
 **/


// TODO: target the right click to the actual webview ( if any ) and it's webcontents
// that were the target of the right click
// instead of just the main window's web contents
// this makes developing our components inside webviews easier as we can inspect them 
// with 1 click

"use strict";
{
  const {remote} = require('electron');
  const {Menu,MenuItem} = remote;

  const menu = new Menu();
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: (e,wc) => {
      if ( !!wvtarget ) {
        wc = wvtarget;
      }
      if ( wc.isDevToolsOpened() ) {
        wc.devToolsWebContents.focus();
        wc.inspectElement(rightClickPosition.x, rightClickPosition.y)
      } else {
        wc.once('devtools-opened', () => {
          wc.devToolsWebContents.focus();
          wc.inspectElement(rightClickPosition.x, rightClickPosition.y)
        });
        wc.openDevTools();
      }
    }
  });

  const dev_tools_context_menu = {
    install
  };

  let wvtarget = null;
  let rightClickPosition = null;

  menu.append(menuItem);

  module.exports = dev_tools_context_menu;

  function install() {
    self.addEventListener('contextmenu', e => {
      e.preventDefault();
      let targetX = 0, targetY = 0;
      if ( e.target.matches && e.target.matches('webview') ) {
        wvtarget = e.target.getWebContents();
        const rect = e.target.getBoundingClientRect();
        targetX = Math.round(rect.left);
        targetY = Math.round(rect.top);
      } else {
        wvtarget = null;
      }
      rightClickPosition = {x: e.x - targetX, y: e.y - targetY};
      menu.popup(remote.getCurrentWindow());
    }, false);
  }
}
