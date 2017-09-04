"use strict";
{
  const sg = require('selector-generalization');
  const map_builder = { install };

  module.exports = map_builder;

  function install() {
    document.addEventListener('click', e => {
      if ( e.shift || e.shiftKey ) {
        let type = 'positive';
        if ( e.alt || e.altKey ) {
          type = 'negative';
        }
        e.preventDefault();
        console.log("Shift pressed so preventing default and tracking."); 
        comms.send('build',{
          trackThis : true,
          type,
          canonicalSel : sg.get_canonical_sel( e.target )
        });
      }
    });
  }
}
