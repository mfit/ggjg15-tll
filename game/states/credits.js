
'use strict';
function Credits() {}

Credits.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '64px Arial', fill: '#ffffff', align: 'center'};
    var stylePos = { font: 'bold 32px Arial', fill: '#ffffff', align: 'center'};
    var styleName = { font: '32px Arial', fill: '#ffffff', align: 'center'};
    this.titleText1 = this.game.add.text(this.game.world.centerX,150, 'The Little Lobbyist\n\n', style);
    this.titleText2 = this.game.add.text(this.game.world.centerX,180, 'Art\n', stylePos);
    this.titleText3 = this.game.add.text(this.game.world.centerX,270, 'Manfred Rohrer\nRaphaela Klein\n\n', styleName);
    this.titleText4 = this.game.add.text(this.game.world.centerX,340, 'Programming\n', stylePos);
    this.titleText5 = this.game.add.text(this.game.world.centerX,430, 'Ilija Simic\nChristian Paier\nMatthias Frey\nStefan Reichenauer', styleName);
    this.titleText6 = this.game.add.text(this.game.world.centerX,580, 'Sound\n', stylePos);
    this.titleText7 = this.game.add.text(this.game.world.centerX,645, 'Mathias Lux\n\n', styleName);
    this.titleText8 = this.game.add.text(this.game.world.centerX,700, 'Mascot\n', stylePos);
    this.titleText9 = this.game.add.text(this.game.world.centerX,765, 'Marco Fruhwirth\n\n', styleName);
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
