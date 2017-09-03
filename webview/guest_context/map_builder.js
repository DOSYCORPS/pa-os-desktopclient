"use strict";
{
  const {send} = require('../comms.js');
  const sg = require('selector-generalization');
  const map_builder = { install };

  module.exports = map_builder;

  function install() {
    document.addEventListener('click', e => {
      if ( e.shift || e.shiftKey ) {
        e.preventDefault();
        console.log("Shift pressed so preventing default and tracking."); 
        send('main',{
          trackThis : true,
          canonicalSel : sg.get_canonical_sel( e.target )
        });
      }
    });
  }
}
