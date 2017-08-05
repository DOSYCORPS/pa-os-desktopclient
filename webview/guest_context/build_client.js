"use strict";
{
  const capture = require('./capture.js');
  const communicate = require('./communicate.js');
  const instrument = require('./instrument.js');
  const test = require('./test.js');

  const build = {
    capture, instrument, communicate
  }

  communicate.install();
  instrument.install();
  test.install();

  module.exports = build;
}
