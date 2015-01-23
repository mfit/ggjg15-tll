
'use strict';
function Menu() {}

/**
  * Start / Title View
  */
Menu.prototype = {
  preload: function() {

  },
  create: function() {


    //
    // Bring a title image onto the stage
    //
    var title_image = this.game.add.image(0, 0, 'title');


    //
    // Set angular movement and tweening to a sprite:
    //
    // this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'character');
    // this.sprite.anchor.setTo(0.5, 0.5);
    // this.sprite.angle = -20;
    //     this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //
    // Render Text
    //
    // Note : text rendering is slow - switch to bitmaps prob. better
    //
    //
    // Define styles:
    var styleLarge = { font: '65px Helvetica', fill: '#ffffff', align: 'center'};
    var style = { font: '16px Helvetica', fill: '#ffffff', align: 'center'};

    // Large title text
    this.titleText = this.game.add.text(this.game.world.centerX,
      300,
      'Game Title',
      styleLarge);
    this.titleText.anchor.setTo(0.5, 0.5);

    // Smaller subtitle text
    this.instructionsText = this.game.add.text(this.game.world.centerX,
      400,
      'Click anywhere to start', style);
    this.instructionsText.anchor.setTo(0.5, 0.5);


  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      // move to antoher game state on button-press
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
