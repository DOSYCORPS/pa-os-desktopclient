"use strict";
{
  const map_builder = require('./map_builder.js');
  const comms = require('../../comms.js');
  
  self.addEventListener('load', install);

  function install() {
    map_builder.install();
    const api = comms.install();
    Object.assign( self, { comms : api } );
  }
}
