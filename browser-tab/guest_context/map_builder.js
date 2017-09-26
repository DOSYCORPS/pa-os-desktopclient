"use strict";
{
  const map_builder = { install };

  module.exports = map_builder;

  function install() {
    const dct = install_tracker();
    
    install_select_on_click(dct);

    install_distinguish_hover();
  }

  function install_tracker() {
    const dct = require('dosycanvasdomtracker');
    dct.guest(true);
    dct.add_name('singles', { color: 'rgba(0,200,50,0.6)', style: 'outline'} );
    dct.add_name('antis', { color: 'rgba(200,0,0,0.6)', style: 'outline'} );
    dct.add_name('antisets', { color: 'rgba(250,0,0,0.4)', style: 'fill'} );
    dct.add_name('sets', { color: 'rgba(100,0,200,0.4)', style: 'fill'} );
    return dct;
  }

  function install_distinguish_hover() {
  }
  
  function install_select_on_click(dct) {

  }

}
