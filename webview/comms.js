"use strict";
{
  const isRenderer = process && process.type == 'renderer';
  const listeners = [];
  let selfName;
  let ipc;

  if ( isRenderer ) {
    ipc = require('electron').ipcRenderer;
  } else {
    ipc = require('electron').ipcMain;
  }

  const comms = {
    send, listen
  };

  if ( isRenderer ) {
    Object.assign( comms, { nameSelf } );
  } else {
    nameSelf('main');
  }

  module.exports = comms;

  function send( name, msg ) {
    msg.from = selfName;
    ipc.send(name, msg); 
  }

  function listen( listener ) {
    listeners.push( listener );
  }

  function nameSelf( name ) {
    //FIXME : ensure no name conflict
    selfName = name;
    ipc.on(selfName, runListeners);
  }

  function runListeners( msg ) {
    listeners.forEach( l => l( msg ) );
  }
}
