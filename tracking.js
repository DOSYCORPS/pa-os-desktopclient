"use strict";
{
  module.exports = { install };

  function install(sel) {
    const dct = require('dosycanvasdomtracker');
    dct.start_tracking({absolute: true, guest:sel});
  }
}
