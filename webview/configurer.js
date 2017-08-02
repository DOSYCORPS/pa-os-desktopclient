"use strict";
{
  const CURRENT_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';
  const WVC = {
    setup_webview
  };

  module.exports = WVC;

  function setup_webview({ first_url: first_url = 'about:blank' } = {}) {
    const wv = document.querySelector('webview');

    wv.addEventListener('dom-ready', () => {
      const wc = wv.getWebContents();
      wc.setUserAgent( CURRENT_UA );
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
