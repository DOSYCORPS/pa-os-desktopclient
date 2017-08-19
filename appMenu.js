"use strict";
{
  const {remote} = require('electron');
  const {Menu,MenuItem} = remote;

  module.exports = { install };

  function install() {
    const currentMenu = Menu.getApplicationMenu();
    
    currentMenu.insert(currentMenu.items.length-2, new AccountMenu());
    currentMenu.insert(currentMenu.items.length-2, new JourneyMenu());
    
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
        label:"Export to Puppeteer script...",
        click: () => console.log("action: puppeteer export")
      },
      {
        label:"Export to JSON...",
        click: () => console.log("action: JSON export")
      },
    ];
    opts.click = () => console.log("Export menu clicked");
    return new MenuItem(opts);
  }

  function TestMenu( opts = {} ) {
    opts.label = opts.label || 'Test...';
    opts.submenu = [
      {
        label:"Test in NightmareJS",
        click: () => console.log("action: nightmarejs test")
      },
      {
        label:"Test in Chromeless",
        click: () => console.log("action: chromeless test")
      },
      {
        label:"Test in Puppeteer",
        click: () => console.log("action: puppeteer test")
      }
    ];
    opts.click = () => console.log("Test menu clicked");
    return new MenuItem(opts);
  }

  function JourneyMenu( opts = {} ) {
    opts.label = opts.label || 'Journey';
    opts.submenu = [
      new TestMenu(),
      new ExportMenu() 
    ];
    opts.click = () => console.log("Journey menu clicked");
    return new MenuItem(opts);
  }
}
