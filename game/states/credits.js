
'use strict';
function Credits() {}

Credits.prototype = {
  preload: function () {

  },
  create: function () {



      var title = this.game.add.sprite(
        0,
        0,
        'end');
      title.scale.setTo(0.25,0.25);

    var style = { font: '64px Arial', fill: '#ffffff', align: 'center'};
    var stylePos = { font: 'bold 32px Arial', fill: '#ffffff', align: 'center'};
    var styleName = { font: '32px Arial', fill: '#ffffff', align: 'center'};
    this.titleText1 = this.game.add.text(this.game.world.centerX,300, 'The Little Lobbyist\n\n', style);
    this.titleText2 = this.game.add.text(this.game.world.centerX/3*2,340, 'Art\n', stylePos);
    this.titleText3 = this.game.add.text(this.game.world.centerX/3*2,430, 'Manfred Rohrer\nRaphaela Klein\n\n', styleName);
    this.titleText4 = this.game.add.text(this.game.world.centerX/2*3-50,340, 'Programming\n', stylePos);
    this.titleText5 = this.game.add.text(this.game.world.centerX/2*3-50,430, 'Ilija Simic\nChristian Paier\nMatthias Frey\nStefan Reichenauer', styleName);
    this.titleText6 = this.game.add.text(this.game.world.centerX/3*2,500, 'Sound\n', stylePos);
    this.titleText7 = this.game.add.text(this.game.world.centerX/3*2,565, 'Mathias Lux\n\n', styleName);
    this.titleText8 = this.game.add.text(this.game.world.centerX/2*3-50,580, 'Mascot\n', stylePos);
    this.titleText9 = this.game.add.text(this.game.world.centerX/2*3-50,645, 'Marco Fruhwirth\n\n', styleName);
//     this.titleText = this.game.add.text(this.game.world.centerX,300, 'The Little Lobbyist\n\n\nGame Design\nMarco\n\nArt\nManfred\nRaphaela\n\nProgramming\nIlija\nChristian\nMatthias\nStefan', style);
    this.titleText1.anchor.setTo(0.5, 0.5);
    this.titleText2.anchor.setTo(0.5, 0.5);
    this.titleText3.anchor.setTo(0.5, 0.5);
    this.titleText4.anchor.setTo(0.5, 0.5);
    this.titleText5.anchor.setTo(0.5, 0.5);
    this.titleText6.anchor.setTo(0.5, 0.5);
    this.titleText7.anchor.setTo(0.5, 0.5);
    this.titleText8.anchor.setTo(0.5, 0.5);
    this.titleText9.anchor.setTo(0.5, 0.5);

  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Credits;
