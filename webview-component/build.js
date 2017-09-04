"use strict";
{
  const comms = require('../comms.js');

  self.addEventListener('load', install);

  function install() {
    const api = comms.install();
    Object.assign( self, { comms: api } );
    self.comms.nameSelf('build');
  }
}
