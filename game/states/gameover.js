
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'And this is what we did ...', style);
    this.titleText.anchor.setTo(0.5, 0.5);


    // this.back

    var statustext = "";
    var max = [0, ''];
    for(var opt in this.game.winStruct) {

      statustext+= "\n" +
        (this.game.winStruct[opt].length ? this.game.winStruct[opt].join(',') : 'no one')
        + " wanted to go to the " + opt + ",";

      if(this.game.winStruct[opt].length>max[0]) max = [this.game.winStruct[opt].length, opt];
    }

    statustext+="\n\n ... so everyone went to the " + max[1] + "!";


    this.statusText = this.game.add.text(this.game.world.centerX / 2, 250,
      statustext,
      { font: '16px Arial', fill: '#ffffff', align: 'left'});

  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('credits');
    }
  }
};
module.exports = GameOver;
