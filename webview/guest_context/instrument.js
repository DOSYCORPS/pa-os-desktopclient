"use strict";
{
  const dct = require('dosycanvasdomtracker');
  const instrument = {
    dct    
  };

  //test_integration_same_context();
  test_integration_split_context();

  function test_integration_same_context() {
    const c = document.createElement('canvas');
    self.addEventListener('load', () => {
      document.body.appendChild( c );
      dct.start_tracking();
      dct.track_all('a');
    });
  }

  function test_integration_split_context() {
    self.addEventListener('load', () => {
      dct.guest(true);
      dct.track_all('a');
      dct.restart_tracking();
    });
  }

  module.exports = instrument;
}
