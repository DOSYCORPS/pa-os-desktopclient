"use strict";
{

  const v8Util = process.atomBinding('v8_util');
  const sg = require('selector-generalization');
  const map_builder = { install };

  module.exports = map_builder;

  function install() {
    const sendMessage = v8Util.getHiddenValue(self, "sendMessage");
    document.addEventListener('click', e => {
      if ( e.shift || e.shiftKey ) {
        console.log("Preventing default. Tracking."); 
        e.preventDefault();
        sendMessage( {
          trackThis : true,
          canonicalSel : sg.get_canonical_sel( e.target )
        });
      }
    });
  }

}
