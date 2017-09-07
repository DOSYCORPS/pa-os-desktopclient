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
        e.preventDefault();
        const textSel = self.getSelection();
        if ( !!textSel ) {
          textSel.removeAllRanges();
        }
        let type = 'positive';
        if ( e.alt || e.altKey ) {
          type = 'negative';
        }
        console.log("Shift pressed so preventing default and tracking."); 
        const message = {
          trackThis : true,
          type,
          canonicalSel : sg.get_canonical_sel( e.target )
        };
        comms.send('build', message);
        let color = 'rgba(0,200,50,0.5)';
        if ( message.type == 'negative' ) {
          color = 'rgba(200,0,100,0.5)';
        }
        dct.track(message.canonicalSel, {color, style: 'outline'});
      }
    });
    comms.listen( (e,m) => {
      let color;
      if ( m.trackThis ) {
        if ( m.trackAll ) {
          color = 'rgba(0,0,200,0.5)';
          if ( m.type == 'negative' ) {
            color = 'rgba(200,0,100,0.5)';
          }
          if ( m.canonicalSel ) {
            dct.track_all(m.canonicalSel, {color});
          }
        } else {
          color = 'rgba(0,200,0,0.5)';
          if ( m.type == 'negative' ) {
            color = 'rgba(200,0,100,0.5)';
          }
          dct.track(m.canonicalSel, {color});
        }
      } else if ( m.untrackThis ) {
        dct.untrack(m.canonicalSel); 
        dct.untrack_all(m.generalizedSel);
      }
    });
  }
}
