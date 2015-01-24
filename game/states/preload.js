
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //
    // Load a single image
    //
    this.load.image('character', 'assets/character.png');
    this.load.image('person', 'assets/person.png');
    this.load.image('sandy_profile', 'assets/cyberpunk_sandy_01.png');

    this.load.image('background', 'assets/vorgluehraum2.png');
    this.load.image('vodkaBottle', 'assets/vodka.png');

    //
    // Load text / config
    //
    this.game.load.text('textData', 'assets/texts.json');
    this.game.load.text('levelData', 'assets/gamedef.json');


    //
    // Load a spritesheet ... with params:
    //    asset-handle, file path,
    //    width, height, number of frames,
    //    margin, spacing
    //
    this.load.spritesheet('runner', 'assets/chmap.png',
        20, 20, 3
        // 0, 0
    );

    //
    // Load some audio
    //
    this.game.load.audio('background','assets/sound/main.ogg');
    this.game.load.audio('disco','assets/sound/edm_01.mp3');


    //
    // Load a bitmap font
    //

    this.bmpFont = this.game.load.bitmapFont('nokia',
      'assets/fonts/nokia.png',
      'assets/fonts/nokia.xml');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      // switch directly to 'play' state
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
