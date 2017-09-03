"use strict";
{
  const map_builder = require('./map_builder.js');

  const build = {
    install
  };

  module.exports = build;

  function install() {
    map_builder.install();
  }
}
