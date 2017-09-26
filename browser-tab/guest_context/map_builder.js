"use strict";
{
  const sg = require('selector-generalization');
  const map_builder = { install };
  const hovering = new Map();

  module.exports = map_builder;

  function install() {
    const dct = install_tracker();
    
    install_select_on_click(dct);

    install_distinguish_hover();

    install_track_on_message(dct);
  }

  function install_tracker() {
    const dct = require('dosycanvasdomtracker');
    const sendMessage = (msg) => {
      comms.send('workspace', msg);
    };
    dct.guest(true, { sendMessage });
    dct.add_name('singles', { color: 'rgba(0,200,50,0.6)', style: 'outline'} );
    dct.add_name('antis', { color: 'rgba(200,0,0,0.6)', style: 'outline'} );
    dct.add_name('antisets', { color: 'rgba(250,0,0,0.4)', style: 'fill'} );
    dct.add_name('sets', { color: 'rgba(100,0,200,0.4)', style: 'fill'} );

    return dct;
  }

  function install_distinguish_hover() {
    document.addEventListener('mouseover', e => hover_el(e), { capture: true } );
    document.addEventListener('mouseout', e => unhover_el(e), { capture: true } );
  }
  
  // FIXME: we also need a sweep at interval to remove everything 
  // since what if the page creates a new DOM element and replaces the previous one with it
  // then maybe our el will not come out
  function hover_el( e ) {
    hovering.set(e.target, { hoversel: sg.get_canonical_sel(e.target) }); 
    [...hovering.keys()].forEach( el => el.style.outline = "2px solid green" );
  }

  function unhover_el( e ) {
    e.target.style.outline = "2px solid grey";
    setTimeout( () => {
      const {hoversel} = hovering.get(e.target);
      const unhoversel = sg.get_canonical_sel(e.target);
      const hover_effect_removed_sel = sg.lcs_from_sel_pair(hoversel,unhoversel);
      console.log(hover_effect_removed_sel);
      hovering.delete(e.target);
      e.target.style.outline = "";
    }, 600 );
  }
  function install_select_on_click(dct) {
    document.addEventListener('click', e => {
      if ( e.shift || e.shiftKey ) {
        // track instead of clicking
        e.stopPropagation();
        e.preventDefault();
        const textSel = self.getSelection();
        if ( !!textSel ) {
          textSel.removeAllRanges();
        }
        let type = 'prop.locations';
        if ( e.alt || e.altKey ) {
          type = 'prop.nlocations';
        }
        const message = {
          trackThis : true,
          type,
          canonicalSel : sg.get_canonical_sel( e.target )
        };
        comms.send('build', message);
        if ( message.type == 'prop.nlocations' ) {
          dct.track(message.canonicalSel, 'antis');
        } else {
          dct.track(message.canonicalSel, 'singles');
        }
      }
    }, { capture: true } );
  }

  function install_track_on_message(dct) {
    comms.listen( (e,m) => {
      let color;
      if ( m.trackThis ) {
        if ( m.trackAll ) {
          if ( m.type == 'prop.locations' ) {
            dct.track_all(m.canonicalSel, 'antisets');
          } else {
            dct.track_all(m.canonicalSel, 'sets');
          }
        } else {
          if ( m.type == 'prop.nlocations' ) {
            dct.track(m.canonicalSel, 'antis');
          } else {
            dct.track(m.canonicalSel, 'singles');
          }
        }
      } else if ( m.untrackThis ) {
        dct.untrack(m.canonicalSel,'singles'); 
        dct.untrack(m.canonicalSel,'antis'); 
        dct.untrack_all(m.generalizedSel,'sets');
        dct.untrack_all(m.generalizedSel,'antisets');
      }
    });
  }
}
