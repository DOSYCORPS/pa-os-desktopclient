"use strict";
{
  const webview_configurer = require('./configurer.js');

  module.exports = { install };

  function install(sel) {
    console.log("Installing...");
    webview_configurer.install(sel, { first_url : 'https://github.com'});
    addEventListener('load', setup);
  }

  function setup() {
    console.log("Setting up...");
    setTimeout( () => run(), 0 );
  }

  function run() {
    console.log("Running...");
  }
}
