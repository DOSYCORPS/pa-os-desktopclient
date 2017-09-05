"use strict";
{

  module.exports = { install };

  function install(sel) {

    const comms = require('./comms.js');
    const api = comms.install();
    const dct = require('dosycanvasdomtracker');
    api.nameSelf('workspace');
    api.listen( (e,m) => {
      self.postMessage(m,'*');
    });
    dct.start_tracking({absolute: true, guest:sel});
    
  }

}
