
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
    this.load.image('person', 'assets/gremila.png');
    this.load.image('sandy_profile', 'assets/cyberpunk_sandy_01.png');

    this.load.image('background', 'assets/vorgluehraum2.png');
    this.load.image('vodkaBottle', 'assets/vodka.png');
    this.load.image('beerBottle', 'assets/beer.png');
    this.load.image('cup', 'assets/cup.png');
    this.load.image('clock', 'assets/uhr.png');
    this.load.image('beerBottle', 'assets/beer.png');
    this.load.image('beerBottle', 'assets/beer.png');
    this.load.image('fish', 'assets/fiisch.png');

    //
    // Load text / config
    //
    this.game.load.text('textData', 'assets/texts.json');

    // the main game config : loaded in boot-state
    //  this.game.load.text('levelData', 'assets/gamedef.json');

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


    // Load character sprites
    var gameSetup = JSON.parse(this.game.cache.getText('levelData'));
    for (var p in gameSetup.persons) {
      if (gameSetup.persons[p].name === 'Player') {
          continue;
      }
      this.game.load.image(gameSetup.persons[p].name, 'assets/' + gameSetup.persons[p].icon);
      this.game.load.image('normal_profile_' + gameSetup.persons[p].name, 'assets/profiles/' + gameSetup.persons[p].name.toLowerCase() + '_normal_01.png');
      this.game.load.image('angry_profile_' + gameSetup.persons[p].name, 'assets/profiles/' + gameSetup.persons[p].name.toLowerCase() + '_angry_01.png');
      this.game.load.image('smile_profile_' + gameSetup.persons[p].name, 'assets/profiles/' + gameSetup.persons[p].name.toLowerCase() + '_smile_01.png');
    }

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
