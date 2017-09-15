"use strict";
{
  const configurer = {
    install
  };

  module.exports = configurer;

  function install(sel, { first_url: first_url = 'about:blank' } = {}) {
    if ( ! sel ) {
      throw new TypeError("Need to supply webview selector");
    }
    const wv = document.querySelector(sel);

    wv.addEventListener('dom-ready', () => {
      const wc = wv.getWebContents();
      wc.loadURL( first_url );
      Object.assign( self, { wv, wc } );
    }, { once: true } )

    wv.src="data:text/html,<div>Connecting to the internet...";

    if ( navigator.onLine ) {
      wv.src+=`<div>Connected</div><div>Navigating to ${first_url}...</div>`;
    } else {
      wv.src+=`<div>Unable to connect to the internet.</div>`;
    }
  }
}
