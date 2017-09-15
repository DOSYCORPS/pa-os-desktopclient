"use strict";
{
  const comms = require('../comms.js');

  let loaded = false;

  self.addEventListener('load', install);
  self.addEventListener('domcontentloaded', install);

  function install() {
    if ( loaded ) return;
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
    }
    localStorage.setItem('q', '[]');

    install_delete_handler();

    function install_delete_handler() {
      document.addEventListener('click', (e) => {
        if ( e.target && e.target.matches('button[name$="_delete"]') ) {
          do_delete(e); 
        }
      });
    }

    function generalize() {
      const generalize_btn = document.querySelector('#generalize');
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

    function do_delete(e) {
      const sel = e.target.parentNode.querySelector('input[type="text"]').value;
      const gsel = document.querySelector('#generalized').value;
      self.comms.send('browser-tab-guest', {
        untrackThis: true,
        canonicalSel: sel,
        generalizedSel: gsel
      });
      const queue = JSON.parse(localStorage.getItem('q'));
      queue.push({task: 'generalize'});
      localStorage.setItem('q',JSON.stringify(queue));
    }
    loaded = true;
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
