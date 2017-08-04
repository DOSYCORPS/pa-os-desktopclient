"use strict";
{
  const instrument = {
    install
  };

  module.exports = instrument;

  function install() {
    test_integration_split_context();
  }

  function test_integration_same_context() {
    const c = document.createElement('canvas');
    self.addEventListener('load', () => {
      document.body.appendChild( c );
      dct.start_tracking();
      dct.track_all('a');
    });
  }

  function test_integration_split_context() {
    const dct = require('dosycanvasdomtracker');
    const v8Util = process.atomBinding('v8_util');
    const sendMessage = v8Util.getHiddenValue(self,"sendMessage");
    self.addEventListener('load', () => {
      dct.guest(true, {sendMessage});
      dct.track_all('a');
      dct.restart_tracking();
    });
  }
}
