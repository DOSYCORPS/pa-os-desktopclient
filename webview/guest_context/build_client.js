"use strict";
{
  const capture = require('./capture.js');
  const instrument = require('./instrument.js');
  const communicate = require('./communicate.js');

  const build = {
    capture, instrument, communicate
  }

  module.exports = build;

  Object.assign( self, {
    build 
  });
  
  console.log("Build client", build);
}
