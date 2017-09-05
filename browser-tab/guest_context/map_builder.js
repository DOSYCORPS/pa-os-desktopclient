"use strict";
{
  const sg = require('selector-generalization');
  const map_builder = { install };

  module.exports = map_builder;

  function install() {
    const dct = require('dosycanvasdomtracker');
    const sendMessage = (msg) => {
      comms.send('workspace', msg);
    };
    dct.guest(true, { sendMessage });
    
    document.addEventListener('click', e => {
      if ( e.shift || e.shiftKey ) {
        let type = 'positive';
        if ( e.alt || e.altKey ) {
          type = 'negative';
        }
        e.preventDefault();
        console.log("Shift pressed so preventing default and tracking."); 
        const message = {
          trackThis : true,
          type,
          canonicalSel : sg.get_canonical_sel( e.target )
        };
        comms.send('build', message);
        dct.track(message.canonicalSel);
      }
    });
    comms.listen( (e,m) => {
      console.log(e,m);
      if ( m.trackThis ) {
        if ( m.trackAll ) {
          dct.track_all(m.canonicalSel);
        } else {
          dct.track(m.canonicalSel);
        }
      }
    });
  }
}
