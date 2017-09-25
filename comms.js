"use strict";
{
  const comms = {
    install
  };

  module.exports = comms;

  function install() {
    const isRenderer = process && process.type == 'renderer';
    const api = {
      get name() {
        return name;
      }
    };
    let ipc;
    let name;

    if ( isRenderer ) {
      ipc = require('electron').ipcRenderer;
      installRenderer(api);
    } else {
      ipc = require('electron').ipcMain;
      installMain(api);
    }

    return api;

    function installRenderer(api) {
      Object.assign( api, { send, nameSelf, listen } );

      return;

      function send( to, data ) {
        ipc.send('msg', { from:name, to, data });
      }

      function nameSelf( myName ) {
        name = myName;
        ipc.send('name', {name});
      }

      function listen( listener ) {
        ipc.on('msg', listener );
      }
    }

    function installMain(api) {
      const NAME = 'main';
      const listeners = [];
      const contexts = new Map();
      const reserved_channels = new Set( [ 'name', 'msg' ] );

      name = NAME;

      ipc.on('name', registerName);
      ipc.on('msg', switchMessage);

      Object.assign( api, { listen } );

      return;

      function listen( listener ) {
        listeners.push( listener );
      }

      function switchMessage( event, msg ) {
        const {to} = msg;
        if ( to == NAME ) {
          listeners.forEach( l => l(event, msg) );
        } else {
          const context = contexts.get(to);
          if ( ! context ) {
            throw new TypeError(`Message undeliverable. No context: ${to}`);
          }
          context.send('msg', msg.data);
        }
      }

      function registerName( event, msg ) {
        const {sender:context} = event;
        const {name:requestedName} = msg;
        if ( requestedName == NAME ) {
          throw new TypeError( `Only main process can use the name 'main'` );
        }
        contexts.set(requestedName,context);
      }
    }
  }
}
