(function() {
    'user strict';
var display = require('../helper/display');
    var DialogHandler = function(game) {
      this.game = game;
    };


    DialogHandler.prototype = {
      startLobbyingDialog: function(sprite) {
        console.log("Starting dialog with " + sprite);
        console.log(this.game.textData.NAME.format(sprite.persName));
      },
      showLobbyingDialogPanel: function(sprite) {
      
      if(this.game.dialog_open)
      {
        return;
      }

      this.game.dialog_open = true;



        var rt = new Phaser.RenderTexture(this.game, this.game.width, this.game.height/3, "DialogBox");
        var bmp = new Phaser.BitmapData(this.game, '', this.game.width, this.game.height/3);


        bmp.ctx.fillStyle = '#337711';
        bmp.circle(this.game.width/2, this.game.height/3/2, 10);
        bmp.ctx.fillStyle = '#137761';
        bmp.circle(this.game.width/2+10, this.game.height/3/2, 5);



      

        bmp.rect(0, 0, this.game.width, this.game.height/3);
        //bmp_person.rect(0, this.game.height/3, this.game.width, this.game.height);

        var spr = new Phaser.Sprite(rt, 0, 0, bmp.texture);
       // var spr_person = new Phaser.Sprite(rt_person, 0, 0, bmp_person.texture);

        var name = new Phaser.BitmapText(rt, 0, 0, 'nokia', sprite.persName + ":", 24);
        var txt2 = new Phaser.BitmapText(rt, 0, 0, 'nokia', this.game.textData.HELLO+" "+this.game.textData.NAME.format(sprite.persName), 24);


       // rt_person.render(spr_person, {x:0, y:0});
        rt.render(spr, {x:0, y:0});
        rt.render(name, {x:400, y:0});
        rt.render(txt2, {x:400, y:30});

        var dialogBox = this.game.add.sprite(0, 2*this.game.height/3, rt);
        //var person_profile = this.game.add.sprite(0, 0, rt_person);

      
      var profile = this.game.add.sprite(
        500,
        400,
        'sandy_profile');
      profile.anchor.setTo(1.3, 0);

        var option1 = display.makeButton(this.game, this.game.width-400, 30, "Option1", 'o1');
        var option1Button = this.game.add.sprite(400, 2*this.game.height/3+70, option1);
        option1Button.inputEnabled = true;

        var option2 = display.makeButton(this.game, this.game.width-400, 30, "Option2", 'o2');
        var option2Button = this.game.add.sprite(400, 2*this.game.height/3+100, option2);
        option2Button.inputEnabled = true;


        option1Button.events.onInputDown.add(
        function() {
          option1Button.kill();
          option2Button.kill();
   
          var name = new Phaser.BitmapText(rt, this.game.width-400, 0, 'nokia', sprite.persName + ":", 24);

        rt.render(spr, {x:0, y:0});
        rt.render(name, {x:400, y:0});

          var answer = display.makeButton(this.game, this.game.width-400 , 170, this.game.textData.BYE, 'a1');
          var answerButton = this.game.add.sprite(400, 2*this.game.height/3+30, answer);
          answerButton.inputEnabled = true;



          answerButton.events.onInputDown.add(
            function() {
            answerButton.kill();
            this.game.dialog_open = false;
            rt.clear();
            //this.game.state.start('play');
            }, rt);


        }, rt);

        option2Button.events.onInputDown.add(
        function() {
          option1Button.kill();
          option2Button.kill();
          var name = new Phaser.BitmapText(rt, this.game.width-400, 0, 'nokia', sprite.persName + ":", 24);

        rt.render(spr, {x:0, y:0});
        rt.render(name, {x:400, y:0});

          var answer = display.makeButton(this.game, this.game.width-400 , 170, this.game.textData.BYE, 'a2');
          var answerButton = this.game.add.sprite(400, 2*this.game.height/3+30, answer);
          answerButton.inputEnabled = true;



          answerButton.events.onInputDown.add(
            function() {
            answerButton.kill();
            this.game.dialog_open = false;
            rt.clear();
            //this.game.state.start('play');
            }, rt);
        }, rt);
       
      }
    }

    var Dialog = function(person) {

      // Initialise this class when a dialog starts
      //

      // Basic dialog :
      //  1. person says hello
      //  2. player chooses a dialog option
      //  3. person reacts

      this.person = person;

      this.greeting = "hi";

      this.player_options = [
        "what about X",
        "i really like Y",
        "i dont like Z, do you ?"
      ];
    };

    Dialog.prototype = {
      reaction : function (lobbyingObject, attitude) {
        // the person's reaction to the suggestion that
        // {lobbyingObject} is to be treated with {attitude} ?

        // TODO: calculate the influence
        // ( = change this.person.atts )

        // TODO : calculate the reaction as message
        return "Ok...!";
      }
    };


    module.exports = {
      DialogHandler:DialogHandler,
      Dialog: Dialog,
    };
}());
