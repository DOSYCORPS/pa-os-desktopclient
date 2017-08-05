"use strict";
{
  const webview_configurer = require('./configurer.js');
  const webview_communicator = require('./communicator.js');
  const test = require('./test.js');

  module.exports = { install };

  function install() {
    console.log("Installing...");
    webview_configurer.install({ first_url : 'https://github.com'});
    webview_communicator.install();
    test.install();
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
