"use strict";
{
  const {remote} = require('electron');
  const {Menu,MenuItem} = remote;

  module.exports = { install };

  function install() {
    const currentMenu = Menu.getApplicationMenu();
    
    currentMenu.insert(currentMenu.items.length-2, new AccountMenu());
    
    const fileMenu = currentMenu.items[0];
    fileMenu.submenu.append( new ExportMenu() );

    Menu.setApplicationMenu(currentMenu);
  }

  function AccountMenu( opts = {} ) {
    opts.label = opts.label || 'Account';
    opts.submenu = [
      {
        label:"<account name> <tier>",
        click: () => console.log("action: show account profile modal")
      },
      {
        label:"Log Out",
        click: () => console.log("action: log out")
      },
      {
        label:"Settings",
        click: () => console.log("action: show settings modal")
      }
    ];
    opts.click = () => console.log("Account menu clicked");
    return new MenuItem(opts);
  }

  function ExportMenu( opts = {} ) {
    opts.label = opts.label || 'Export...';
    opts.submenu = [
      {
        label:"Export to NightmareJS script...",
        click: () => console.log("action: nightmarejs export")
      },
      {
        label:"Export to Chromeless script...",
        click: () => console.log("action: chromeless export")
      },
      {
        label:"Export to JSON...",
        click: () => console.log("action: JSON export")
      },
    ];
    opts.click = () => console.log("Export menu clicked");
    return new MenuItem(opts);
  }
}
