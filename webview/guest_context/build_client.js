"use strict";
{
  const capture = require('./capture.js');
  const instrument = require('./instrument.js');
  const build = {
    capture, instrument
  }

  module.exports = build;

  Object.assign( self, {
    build 
  });
  
  console.log("Build client", capture, instrument);
}
