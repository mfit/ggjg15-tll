
'use strict';
var display = require('../helper/display');
function Menu() {}

/**
  * Start / Title View
  */
Menu.prototype = {
  preload: function() {

  },
  create: function() {


      var title = this.game.add.sprite(
        0,
        0,
        'start');
      title.scale.setTo(0.25,0.25);



  },
  update: function() {


      var topLeftQuarter = new Phaser.Rectangle(550,520,185,70);
        var self = this;
        //listen for pointers
        this.game.input.onDown.add( function(pointer){
            //this is the test, contains test for a point belonging to a rect definition
            var inside = topLeftQuarter.contains(pointer.x,pointer.y)
            if(inside)
            {

             self.game.state.start('play');
            }

            //console.log('x',pointer.x);
            //console.log('y',pointer.y);
            //do whatever with the result
            //console.log('pointer is inside region top left quarter', inside)
        });
  }
};

module.exports = Menu;
