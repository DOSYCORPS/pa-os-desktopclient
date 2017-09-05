"use strict";
{
  const map_builder = require('./map_builder.js');
  const comms = require('../../comms.js');
  
  self.addEventListener('load', install);

  function install() {
    const api = comms.install();
    api.nameSelf('browser-tab-guest');
    Object.assign( self, { comms : api } );
    map_builder.install();
  }
}
