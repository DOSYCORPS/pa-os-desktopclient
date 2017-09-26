"use strict";
{
  const map_builder = require('./map_builder.js');
  
  self.addEventListener('load', install);

  function install() {
    map_builder.install();
  }
}
