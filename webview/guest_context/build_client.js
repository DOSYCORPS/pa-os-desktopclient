"use strict";
{
  const capture = require('./capture.js');
  const communicate = require('./communicate.js');
  const instrument = require('./instrument.js');
  const map_builder = require('./map_builder.js');
  const test = require('./test.js');

  const build = {
    capture, instrument, communicate, map_builder
  }

  communicate.install();
  instrument.install();
  map_builder.install();
  test.install();

  module.exports = build;
}
