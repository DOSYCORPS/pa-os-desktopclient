"use strict";
{
  const CURRENT_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';
  const configurer = {
    install
  };

  module.exports = configurer;

  function install(sel, first_url = "about:blank") {
    if ( ! sel ) {
      throw new TypeError("Need to supply webview selector");
    }
    const wv = document.querySelector(sel);

    get_online(wv, first_url);

    setup_split_dct(sel);
  }

  function get_online(wv, url) {
    wv.src="data:text/html,<div>Connecting to the internet...";
    if ( navigator.onLine ) {
      queue_navigate(wv, url);
      wv.src+=`<div>Connected</div><div>Navigating to ${url}...</div>`;
    } else {
      wv.src+=`<div>Unable to connect to the internet.</div>`;
    }
  }

  function queue_navigate(wv, url) {
    wv.addEventListener('dom-ready', () => {
      const wc = wv.getWebContents();
      wc.setUserAgent( CURRENT_UA );
      wc.loadURL( url );
    }, { once: true } );
  }

  function setup_split_dct(sel) {
    const dct = require('dosycanvasdomtracker');
    dct.start_tracking({absolute: true, guest:sel});
  }
}
