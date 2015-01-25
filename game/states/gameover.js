
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

    var title = this.game.add.sprite(
      0,
      0,
      'end');
    title.scale.setTo(0.25,0.25);

    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,280, 'And this is what we did ...', style);
    this.titleText.anchor.setTo(0.5, 0.5);


    // this.back

    var statustext = "";
    var max = [0, ''];
    for(var opt in this.game.winStruct) {

      statustext+= "\n" +
        (this.game.winStruct[opt].length ? this.game.winStruct[opt].join(', ') : 'no one')
        + " wanted to go to the " + opt + ",";

      if(this.game.winStruct[opt].length>max[0]) max = [this.game.winStruct[opt].length, opt];
    }

    statustext+="\n\n ... so everyone went to the " + max[1] + "!";


    this.statusText = this.game.add.text(this.game.world.centerX / 3.0, 340,
      statustext,
      { font: '32px Arial', fill: '#ffffff', align: 'left'});

  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('credits');
    }
  }
};
module.exports = GameOver;
