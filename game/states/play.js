  'use strict';

  var contr = require('../helper/controller');
  var display = require('../helper/display');

  var dialog = require('../helper/dialog');
  var builder = require('../model/builder');
  var player = require('../model/player.js');

  var objectPositions = {onStereo : {x : 1270, y :490},
                         onTable : {x : 660, y : 615},
                         onBookShelf : {x : 100, y : 430},
                         onCommode : {x : 930, y : 460}
                         };

  var _placeObject = function(object, place){
    object.x = place.x - object.width;
    object.y = place.y - object.height;
  };

  var fishBounds = {upper_x : 1210, lower_x : 1170, left: true};

  function Play() {}
  Play.prototype = {
    create: function() {

      this.dialogHelper = new dialog.DialogHandler(this.game);

      var myDemoSound = this.game.add.audio('actionsound');
      var backgroundAudio = this.game.add.audio('background');
      backgroundAudio.play();

      this.game.textData = JSON.parse(this.game.cache.getText('textData'));
      var gameSetup = JSON.parse(this.game.cache.getText('levelData'));

      //this.game.player = new player.Player();

      this.game.myRoom = new builder.WorldBuilder().buildFromConfig(this.game, gameSetup);

      var bg = this.game.add.sprite(
        0,
        0,
        'background');
      bg.scale.setTo(0.25,0.25);

      // beerBottle
      // vodkaBottle
      // clock

      this.partyObjects = this.game.add.group();
      var vBottle1 = this.game.add.sprite(
        0,
        0,
        "beerBottle");
      vBottle1.scale.setTo(0.04,0.04);
      _placeObject(vBottle1, objectPositions.onCommode);
      vBottle1.inputEnabled = false;
      vBottle1.events.onInputDown.add(this.dialogHelper.startObjectDialogPanel, this);
      vBottle1.objName = "beerBottle";
      this.partyObjects.add(vBottle1);

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
      for (var pName in this.game.myRoom.persons) {

        if (pName == "Player") {
          // don't add player as sprite ..
          continue;
        }

        var pers = this.game.add.sprite(
          this.game.myRoom.persons[pName].startPos[0],
          this.game.myRoom.persons[pName].startPos[1],

          pName // Asset is loaded with same key as Playername
          );
        //console.log(this.game.myRoom.persons[pName].startPos);
        pers.anchor.setTo(0.5, 0.5);
        //pers.scale.setTo((400+pers.y)/this.game.height, (400+pers.y)/this.game.height);
        pers.scale.setTo(0.5,0.5);
        pers.inputEnabled = false;
        pers.persName = pName;

        // references
        pers.worldObject = this.game.myRoom.persons[pName];
        this.game.myRoom.persons[pName].sprite = pers;

        pers.events.onInputDown.add(this.dialogHelper.showLobbyingDialogPanel, this);

        // add to group
        this.npcs.add(pers);


      }

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
        this.lineBreakCounter = function(text) {
        var charArray = text.split('');
        var counter = 0;
        for(var i = 0; i < charArray.length; i ++) {
          if(charArray[i] == "\n"){
            counter++;
          }
        }
        return counter;
      };

      this.dialogBox = this.game.add.graphics(0,0);
      this.dialogBox.beginFill(0x001170, 0.5);
      this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
      this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
      this.dialogBox.drawRect(50, 50, this.game.width-100, this.game.height-100);

      var places = ["steakhouse", "strip club", "irish pub", "playground"];

      var testText = 'You are on a party with your friends and the party draws to its end. The question now is, where should everyone go together after the party? Should they go to'
      // irish pub, to a steakhouse or to a strip club? Your objective is to convice the rest of the guests to go to the place where you want to go.'
      for(var i = 0; i < places.length - 1; i++){
        testText += " a " + places[i] + ",";
      }
      testText += " or to a " + places[places.length-1] + "? ";
      testText += 'Your objective is to convice the rest of the guests to go to the place where you want to go.';
      var output = this.addLineBreakToText(testText, 50);
      output += '\n\nAnd you want to go to the ';
      output += places[Math.floor(Math.random()*places.length)] + ".";

      var style = { font: '30px Helvetica', fill: '#ffffff', align: 'center'};

      this.instructionsText = this.game.add.text(this.game.world.centerX,
         this.game.world.centerY,
        output, style);
      this.instructionsText.anchor.setTo(0.5, 0.5);

      this.fish = this.game.add.sprite(
        0,
        0,
        "fish");
      this.fish.scale.setTo(-0.2,0.2);
      this.fish.anchor.setTo(0.5,0.5);
      this.fish.x = fishBounds.upper_x;
      this.fish.angle = 15;
      this.fish.y = 530;

      this.IsStartTextOn = true;

      this.game.input.keyboard.onDownCallback = function(e){
        if(e.keyCode >= 49 && e.keyCode <= 57){
          var num = e.keyCode-49;
          var counter = 0;
          for (var pName in this.game.myRoom.persons) {
            if(counter == num) {
              console.log("*********************************");
              console.log("NAME: " + pName);
              console.log("*********************************");
              console.log("MUSIC: " + this.game.myRoom.persons[pName].preferences.music);
              console.log("TALK : " + this.game.myRoom.persons[pName].preferences.talk);
              console.log("DANCE: " + this.game.myRoom.persons[pName].preferences.dance);
              console.log("GAMES: " + this.game.myRoom.persons[pName].preferences.games);
              console.log("DRUNK: " + this.game.myRoom.persons[pName].preferences.drunk);
              console.log("*********************************");
            }
            counter++;
          }
        }
      };

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
        if(this.IsStartTextOn) {
          this.instructionsText.destroy();
          this.dialogBox.destroy();
          this.IsStartTextOn = false;
          this.npcs.forEach(function(item){
            item.inputEnabled = true;
          });
          this.partyObjects.forEach(function(item){
            item.inputEnabled = true;
          });
          return;
        }
      }

      if(fishBounds.left){
          this.fish.y -= 0.05;
          this.fish.x -= 0.2;
          if(this.fish.x < fishBounds.lower_x + 2 && this.fish.x > fishBounds.lower_x){
            this.fish.scale.setTo(0.2,0.2);
            this.fish.angle = 30;
            fishBounds.left = false;
          }
        }
        else{
          this.fish.y += 0.05;
          this.fish.x += 0.2;
          if(this.fish.x > fishBounds.upper_x-2 && this.fish.x < fishBounds.upper_x)
          {
            this.fish.angle = 15;
            this.fish.scale.setTo(-0.2,0.2);
            fishBounds.left = true;
          }
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
// =======

//   'use strict';

//   var contr = require('../helper/controller');
//   var display = require('../helper/display');

//   var dialog = require('../helper/dialog');
//   var decision = require('../model/decision');
//   var builder = require('../model/builder');

//   function Play() {}
//   Play.prototype = {
//     create: function() {

//       //
//       // Start a physics system
//       //
//       this.game.physics.startSystem(Phaser.Physics.ARCADE);

//       this.dialogHelper = new dialog.DialogHandler(this.game);

//       var backgroundAudio = this.game.add.audio('background');
//       backgroundAudio.play();

//       this.game.textData = JSON.parse(this.game.cache.getText('textData'));
//       var gameSetup = JSON.parse(this.game.cache.getText('levelData'));

//       this.game.myRoom = new builder.WorldBuilder().buildFromConfig(gameSetup);


//       var bg = this.game.add.sprite(
//         -10,
//         -10,
//         'background');
//       //bg.width = this.game.width;
//       //bg.height = this.game.height;
//       bg.scale.setTo(0.25,0.25);

//       // //
//       // // Add player sprite
//       // // Setting up a controller
//       // this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'runner');
//       // this.sprite.inputEnabled = true;
//       // this.sprite.scale.setTo(2.5, 2.5);
//       // this.sprite.anchor.setTo(0.5, 0.5);
//       // this.sprite.animations.add('run', [0,1,0,2]);
//       // this.sprite.animations.play('run', 8, true);
//       // this.game.controller = new contr.KeyboardController(
//       //         this.game.input.keyboard,
//       //         {left:Phaser.Keyboard.A,
//       //           right: Phaser.Keyboard.D,
//       //           up: Phaser.Keyboard.W,
//       //           down: Phaser.Keyboard.S,
//       //           jump: Phaser.Keyboard.W,
//       //           block: Phaser.Keyboard.S
//       //         }
//       // );

//       //
//       // use a group for other characters
//       //
//       this.npcs = this.game.add.group();
//       var pers = this.game.add.sprite(
//         this.game.width/3,
//         2*this.game.height/3,
//         'person');
//       pers.anchor.setTo(0.5, 0.5);
//       pers.inputEnabled = false;
//       pers.persName = "Fritz";

//       pers.events.onInputDown.add(this.dialogHelper.showLobbyingDialogPanel, this);

//       this.npcs.add(pers);

//       var pers2 = this.game.add.sprite(
//         2* this.game.width/3,
//         3*this.game.height/5,
//         'person');
//       pers2.anchor.setTo(0.5, 0.5);
//       pers2.scale.setTo(0.7, 0.7);
//       pers2.inputEnabled = false;

//       // Add click handler ( handler, context )
//       pers2.events.onInputDown.add(this.dialogHelper.showLobbyingDialogPanel, this);
//       pers2.persName = "Suzy";
//       this.npcs.add(pers2);

//       //---------------------------------------------------------------------------------------------
//       this.addLineBreakToText = function(text, maxCharNumInLine) {
//         var charArray = text.split('');
//         var output = "";
//         var counter = 0;
//         for(var i = 0; i < charArray.length; i ++) {
//           //console.log(charArray[i]);
//           if(counter<maxCharNumInLine){
//             output += charArray[i];
//           }
//           else {
//             if(charArray[i] == " "){
//               output += "\n";
//               counter = 0;
//               continue;
//             }
//             else
//               output += charArray[i];
//           }
//           counter++;
//         }
//         return output;
//       };
//       //--------------------------------------------------------------------------------------------

//       this.dialogBox = this.game.add.graphics(0,0);
//       this.dialogBox.beginFill(0x001170, 0.5);
//       this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
//       this.dialogBox.bounds = new PIXI.Rectangle(50, 50, this.game.width-100, this.game.height-100);
//       this.dialogBox.drawRect(50, 50, this.game.width-100, this.game.height-100);

//       var places = ["steakhouse", "strip club", "irish pub", "playground", "school"];

//       var testText = 'You are on a party with your friends and the party draws to its end. The question now is, where should everyone go together after the party? Should they go to'
//       // irish pub, to a steakhouse or to a strip club? Your objective is to convice the rest of the guests to go to the place where you want to go.'
//       for(var i = 0; i < places.length - 1; i++){
//         testText += " a " + places[i] + ",";
//       }
//       testText += " or to a " + places[places.length-1] + "? ";
//       testText += 'Your objective is to convice the rest of the guests to go to the place where you want to go.';
//       var output = this.addLineBreakToText(testText, 50);
//       output += '\n\nAnd you want to go to the ';
//       output += places[Math.floor(Math.random()*places.length)] + ".";

//       var style = { font: '30px Helvetica', fill: '#ffffff', align: 'center'};

//       this.instructionsText = this.game.add.text(this.game.world.centerX,
//          this.game.world.centerY,
//         output, style);
//       this.instructionsText.anchor.setTo(0.5, 0.5);

//       this.IsStartTextOn = true;

//       // //
//       // // Buttons
//       // //
//       // var buttonBmp = display.makeButton(this.game, 80, 30, "Button1", 'b1');
//       // var buttonBmp2 = display.makeButton(this.game, 80, 30, "XYZ .. 2",'b2');
//       // var buttonBmp3 = display.makeButton(this.game, 80, 30, "----", 'b3');

//       // // button from sprite
//       // var mybutton = this.game.add.sprite(50, 10, buttonBmp);
//       // mybutton.inputEnabled = true; // have to enable input to capture events
//       // mybutton.events.onInputDown.add(
//       //   function(sprite) {
//       //     // switching to another state on click:
//       //     this.game.state.start('gameover');
//       //   }, this);

//       // // button from factory
//       // var mybutton2 = this.game.add.button(160, 10, buttonBmp2, function() {
//       //   myDemoSound.play();
//       // }, this, buttonBmp3, buttonBmp);
//       // mybutton2.onInputOver.add(function() { console.log("over"); });

//       // // background = game.add.tileSprite(0, 0, 800, 600, 'background');


//     },
//     update: function() {
//       if(this.game.input.activePointer.justPressed()) {
//       // move to antoher game state on button-press
//         if(this.IsStartTextOn) {
//           this.instructionsText.destroy();
//           this.dialogBox.destroy();
//           this.IsStartTextOn = false;
//           this.npcs.forEach(function(item){
//             item.inputEnabled = true;
//           });
//           return;
//         }
//       }

//       //
//       // controller, sample direction at update time use for movement
//       //
//       // var contrDir;
//       // contrDir = this.game.controller.getDirection();

//       // Move by adding to sprite's absolute body x,y
//       //
//       // this.sprite.body.x += 3 * contrDir.x;
//       // this.sprite.body.y += 3 * contrDir.y;

//       // Move by setting the velocity
//       // var playerSpeed = 150;
//       // this.sprite.body.velocity.setTo(150 * contrDir.x, 150 * contrDir.y);
//     },
//   };

//   module.exports = Play;
// >>>>>>> 5e9000d0981e2af660e9c14739eed40ca1c8325e
