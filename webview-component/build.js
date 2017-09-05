"use strict";
{
  const comms = require('../comms.js');

  self.addEventListener('load', install);

  function install() {
    console.log("Loading...");
    const api = comms.install();
    Object.assign( self, { comms: api } );
    self.comms.nameSelf('build');
    self.comms.listen( handle );
    let queue;
    try {
      queue = JSON.parse(localStorage.getItem('q'));
    } catch(e) {
      queue = [];
      localStorage.setItem('q','[]');
    }
    if ( !!queue ) {
      while(queue.length) {
        const {task} = queue.shift();
        switch(task) {
          case 'generalize':
            generalize();
            break;
        }
      }
    } else {
      localStorage.setItem('q', '[]');
    }

    function generalize() {
      const generalize_btn = document.querySelector('#generalize');
      console.log(generalize_btn);
      setTimeout( () => {
        generalize_btn.click();
        setTimeout( () => {
          const generalized = document.querySelector('#generalized');
          self.comms.send('browser-tab-guest', {
            trackThis: true,
            trackAll: true,
            canonicalSel: generalized.value
          });
        }, 50 );
      }, 50 );
    }
  }

  function handle( event, msg ) {
    if ( msg.trackThis ) {
      const {canonicalSel} = msg;
      const newSel = document.querySelector(`input.new[name="${msg.type}"]`);
      const save = document.querySelector(`input.new[name="${msg.type}"] ~ button[value="save"]`);
      newSel.value = canonicalSel;
      const queue = JSON.parse(localStorage.getItem('q'));
      queue.push({task: 'generalize'});
      localStorage.setItem('q',JSON.stringify(queue));
      save.click();
    }
  }
}
