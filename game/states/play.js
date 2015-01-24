
  'use strict';

  var contr = require('../helper/controller');
  var display = require('../helper/display');

  var dialog = require('../helper/dialog');
  var decision = require('../model/decision');

  function Play() {}
  Play.prototype = {
    create: function() {

      //
      // Start a physics system
      //
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.dialogHelper = new dialog.DialogHandler(this.game);

      var backgroundAudio = this.game.add.audio('background');
      backgroundAudio.play();

      this.game.textData = JSON.parse(this.game.cache.getText('textData'));


      var bg = this.game.add.sprite(
        0,
        0,
        'background');
      bg.scale.setTo(0.2,0.2);

      // //
      // // Add player sprite
      // // Setting up a controller
      // this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'runner');
      // this.sprite.inputEnabled = true;
      // this.sprite.scale.setTo(2.5, 2.5);
      // this.sprite.anchor.setTo(0.5, 0.5);
      // this.sprite.animations.add('run', [0,1,0,2]);
      // this.sprite.animations.play('run', 8, true);
      // this.game.controller = new contr.KeyboardController(
      //         this.game.input.keyboard,
      //         {left:Phaser.Keyboard.A,
      //           right: Phaser.Keyboard.D,
      //           up: Phaser.Keyboard.W,
      //           down: Phaser.Keyboard.S,
      //           jump: Phaser.Keyboard.W,
      //           block: Phaser.Keyboard.S
      //         }
      // );

      //
      // use a group for other characters
      //
      this.npcs = this.game.add.group();
      var pers = this.game.add.sprite(
        this.game.width/3,
        2*this.game.height/3,
        'person');
      pers.anchor.setTo(0.5, 0.5);
      pers.inputEnabled = true;
      pers.persName = "Fritz";

      pers.events.onInputDown.add(this.dialogHelper.showLobbyingDialogPanel, this);

      this.npcs.add(pers);

      var pers2 = this.game.add.sprite(
        2* this.game.width/3,
        3*this.game.height/5,
        'person');
      pers2.anchor.setTo(0.5, 0.5);
      pers2.scale.setTo(0.7, 0.7);
      pers2.inputEnabled = true;

      // Add click handler ( handler, context )
      pers2.events.onInputDown.add(this.dialogHelper.showLobbyingDialogPanel, this);
      pers2.persName = "Suzy";
      this.npcs.add(pers2);

      //---------------------------------------------------------------------------------------------
      this.addLineBreakToText = function(text, maxCharNumInLine) {
        var charArray = text.split('');
        var output = "";
        var counter = 0;
        for(var i = 0; i < charArray.length; i ++) {
          //console.log(charArray[i]);
          if(counter<maxCharNumInLine){
            output += charArray[i];
          }
          else {
            if(charArray[i] == " "){
              output += "\n";
              counter = 0;
              continue;
            }              
            else
              output += charArray[i];
          }
          counter++;
        }
        return output;
      };
      //--------------------------------------------------------------------------------------------

      this.dialogBox = this.game.add.graphics(0,0);
      this.dialogBox.beginFill(0x001170, 0.5);
      this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
      this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
      this.dialogBox.drawRect(50, 50, this.game.width-100, this.game.height-100);

      var text = '';
      text += 'Lorem ipsum dolor sit amet, consetetur sadipscing \nelitr, sed diam nonumy';
      text += 'eirmod tempor \ninvidunt ut labore\n et dolore magna aliquyam erat, sed diam voluptua\n';
      text += 'At vero eos et accusam et justo\n duo dolores et ea rebum. Stet clita\nkasd gubergren,';
      text += 'no sea takimata sanctus \nest Lorem ipsum dolor sit amet.\n';
      text += 'Lorem ipsum dolor sit amet, consetetur sadipscing \nelitr, sed diam nonumy';

      var testText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';      
      var output = this.addLineBreakToText(testText, 20);

      var style = { font: '30px Helvetica', fill: '#ffffff', align: 'center'};

      this.instructionsText = this.game.add.text(this.game.world.centerX,
         this.game.world.centerY,
        text, style);
      this.instructionsText.anchor.setTo(0.5, 0.5);

      // //
      // // Buttons
      // //
      // var buttonBmp = display.makeButton(this.game, 80, 30, "Button1", 'b1');
      // var buttonBmp2 = display.makeButton(this.game, 80, 30, "XYZ .. 2",'b2');
      // var buttonBmp3 = display.makeButton(this.game, 80, 30, "----", 'b3');

      // // button from sprite
      // var mybutton = this.game.add.sprite(50, 10, buttonBmp);
      // mybutton.inputEnabled = true; // have to enable input to capture events
      // mybutton.events.onInputDown.add(
      //   function(sprite) {
      //     // switching to another state on click:
      //     this.game.state.start('gameover');
      //   }, this);

      // // button from factory
      // var mybutton2 = this.game.add.button(160, 10, buttonBmp2, function() {
      //   myDemoSound.play();
      // }, this, buttonBmp3, buttonBmp);
      // mybutton2.onInputOver.add(function() { console.log("over"); });

      // // background = game.add.tileSprite(0, 0, 800, 600, 'background');


    },
    update: function() {
      if(this.game.input.activePointer.justPressed()) {
      // move to antoher game state on button-press
        this.instructionsText.destroy();
        this.dialogBox.destroy();
      }

      //
      // controller, sample direction at update time use for movement
      //
      // var contrDir;
      // contrDir = this.game.controller.getDirection();

      // Move by adding to sprite's absolute body x,y
      //
      // this.sprite.body.x += 3 * contrDir.x;
      // this.sprite.body.y += 3 * contrDir.y;

      // Move by setting the velocity
      // var playerSpeed = 150;
      // this.sprite.body.velocity.setTo(150 * contrDir.x, 150 * contrDir.y);
    },
  };

  module.exports = Play;
