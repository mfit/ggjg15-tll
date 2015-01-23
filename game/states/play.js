
  'use strict';

  var contr = require('../helper/controller');
  var display = require('../helper/display');
  var Bacon = require('baconjs');

  function Play() {}
  Play.prototype = {
    create: function() {

      //
      // Start a physics system
      //
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //
      // Add a sprite
      // ... on which you can click
      // ... that is scaled, anchor set to center
      // ... set up + start an animation
      // ... enable physics for the sprite (it gets sprite.body)
      //
      this.sprite = this.game.add.sprite(
        this.game.width/2,
        this.game.height/2,
        'runner');
      this.sprite.inputEnabled = true;
      this.sprite.scale.x=2.5;
      this.sprite.scale.y=2.5;
      this.sprite.anchor.setTo(0.5, 0.5);

      this.sprite.animations.add('run', [0,1,0,2]);
      this.sprite.animations.play('run', 8, true);

      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(0.2,0.2); // small bounce

      var myDemoSound = this.game.add.audio('actionsound');

      // Setting up a controller
      this.game.controller = new contr.KeyboardController(
              this.game.input.keyboard,
              {left:Phaser.Keyboard.A,
                right: Phaser.Keyboard.D,
                up: Phaser.Keyboard.W,
                down: Phaser.Keyboard.S,
                jump: Phaser.Keyboard.W,
                block: Phaser.Keyboard.S
              }
      );

      // Moving with physics ...
      // ...
      // this.sprite.body.velocity.x = 20;
      // etc.

      this.sprite.events.onInputDown.add(
        function(sprite) {
            console.log('the sprite was clicked');
            console.log(sprite);
            myDemoSound.play();
        }, this);


      //
      // Buttons
      //

      var buttonBmp = display.makeButton(this.game, 80, 30, "Button1", 'b1');
      var buttonBmp2 = display.makeButton(this.game, 80, 30, "XYZ .. 2",'b2');
      var buttonBmp3 = display.makeButton(this.game, 80, 30, "----", 'b3');

      // button from sprite
      var mybutton = this.game.add.sprite(50, 10, buttonBmp);
      mybutton.inputEnabled = true; // have to enable input to capture events
      mybutton.events.onInputDown.add(
        function(sprite) {
          // switching to another state on click:
          this.game.state.start('gameover');
        }, this);

      // button from factory
      var mybutton2 = this.game.add.button(160, 10, buttonBmp2, function() {
        myDemoSound.play();
      }, this, buttonBmp3, buttonBmp);
      mybutton2.onInputOver.add(function() { console.log("over"); });

      // background = game.add.tileSprite(0, 0, 800, 600, 'background');


        // use a group for other characters
        //
        this.npcs = this.game.add.group();

        // sprite = ...
        // this.npcs.add(sprite)

    },
    update: function() {


      //
      // controller, sample direction at update time use for movement
      //
      var contrDir;
      contrDir = this.game.controller.getDirection();

      // Move by adding to sprite's absolute body x,y
      //
      // this.sprite.body.x += 3 * contrDir.x;
      // this.sprite.body.y += 3 * contrDir.y;

      // Move by setting the velocity
      var playerSpeed = 150;
      this.sprite.body.velocity.setTo(150 * contrDir.x, 150 * contrDir.y);
    },
  };

  module.exports = Play;
