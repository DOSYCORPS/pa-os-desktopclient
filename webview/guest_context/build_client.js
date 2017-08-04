"use strict";
{
  const capture = require('./capture.js');
  const communicate = require('./communicate.js');
  const instrument = require('./instrument.js');

  const build = {
    capture, instrument, communicate
  }

  communicate.install();
  instrument.install();

  module.exports = build;
}
