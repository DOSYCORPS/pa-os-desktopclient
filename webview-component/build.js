"use strict";
{
  const comms = require('../comms.js');

  self.addEventListener('load', install);

  function install() {
    const api = comms.install();
    Object.assign( self, { comms: api } );
    self.comms.nameSelf('build');
    self.comms.listen( handle );
  }

  function handle( event, msg ) {
    if ( msg.trackThis ) {
      const {canonicalSel} = msg;
      const newSel = document.querySelector(`input.new[name="${msg.type}"]`);
      const save = document.querySelector(`input.new[name="${msg.type}"] ~ button[value="save"]`);
      newSel.value = canonicalSel;
      save.click();
    }
  }
}
