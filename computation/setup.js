"use strict";
{
  const sg = require('selector-generalization');
  const computation = {
    install
  };

  module.exports = computation;

  function install() {
    Object.assign( self, { sg } ); 
    console.log("Selector generalization installed", sg );
  }
}
