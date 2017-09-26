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
    run_task_queue();
    document.querySelector('#propview').addEventListener('load', run_task_queue);
    install_delete_handler();
    loaded = true;
  }

  function install_delete_handler() {
    document.addEventListener('click', (e) => {
      if ( e.target && e.target.matches('button[name$="_delete"]') ) {
        do_delete(e); 
      }
    });
  }

  function generalize() {
    console.log("Generalize called");
    const generalize_btn = frames.propview.document.querySelector('#generalize');
    setTimeout( () => {
      generalize_btn.click();
      setTimeout( () => {
        const generalized = frames.propview.document.querySelector('#generalized');
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
    const gsel = frames.propview.document.querySelector('#generalized').value;
    self.comms.send('browser-tab-guest', {
      untrackThis: true,
      canonicalSel: sel,
      generalizedSel: gsel
    });
    const queue = JSON.parse(localStorage.getItem('q'));
    queue.push({task: 'generalize'});
    localStorage.setItem('q',JSON.stringify(queue));
  }

  function run_task_queue() {
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
  }

  function handle( event, msg ) {
    console.log("msg", msg);
    if ( msg.trackThis ) {
      const {canonicalSel} = msg;
      const newSel = frames.propview.document.querySelector(`input.new[name="${msg.type}"]`);
      const save = frames.propview.document.querySelector(`input.new[name="${msg.type}"] ~ button[name="prop.savelocation"]`);
      newSel.value = canonicalSel;
      const queue = JSON.parse(localStorage.getItem('q'));
      queue.push({task: 'generalize'});
      localStorage.setItem('q',JSON.stringify(queue));
      save.click();
    } else if ( msg.size ) {
      const sizeEl = frames.propview.document.querySelector(`input[name="prop.size"]`);
      sizeEl.value = msg.size;
    }
  }
}
