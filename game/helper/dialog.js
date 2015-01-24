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
      startObjectDialogPanel: function(sprite) {
        console.log("OBJECT: " + sprite.objName);
      },
      showLobbyingDialogPanel: function(sprite) {

        var opt_list = [],
          wo = sprite.worldObject;

        for (var i=0; i < wo.getOptions.length; i++) {
          opt_list.push({text: wo.getOptions[i].txt, callback: function() {
            wo.handleComment(i);
          }});
        }

        data = {text:"Startsay", options: opt_list};

      if(this.game.dialog_open)
      {
        return;
      }

      this.game.dialog_open = true;



        var rt = new Phaser.RenderTexture(this.game, this.game.width, 500, "DialogBox");
        var bmp = new Phaser.BitmapData(this.game, '', this.game.width, 500);


        bmp.ctx.fillStyle = '#337711';
        bmp.circle(this.game.width/2, 500/2, 10);
        bmp.ctx.fillStyle = '#137761';
        bmp.circle(this.game.width/2+10, 500/2, 5);





        bmp.rect(0, 0, this.game.width, 500);
        //bmp_person.rect(0, this.game.height/3, this.game.width, this.game.height);

        var spr = new Phaser.Sprite(rt, 0, 0, bmp.texture);
       // var spr_person = new Phaser.Sprite(rt_person, 0, 0, bmp_person.texture);
        //var text = this.addLineBreakToText(this.game.textData.HELLO+" "+this.game.textData.NAME.format(sprite.persName)+this.game.textData.HELLO+" "+this.game.textData.NAME.format(sprite.persName)+this.game.textData.HELLO+" "+this.game.textData.NAME.format(sprite.persName),60);
        var name = new Phaser.BitmapText(rt, 0, 0, 'nokia', sprite.persName + ":", 24);
        var txt2 = new Phaser.BitmapText(rt, 0, 0, 'nokia', data.text, 24);
  //      var lineCount = this.lineBreakCounter(text);
//console.log(lineCount);
       // rt_person.render(spr_person, {x:0, y:0});

       console.log(data.text);
        rt.render(spr, {x:0, y:0});
        rt.render(name, {x:400, y:0});
        rt.render(txt2, {x:400, y:30});

        var dialogBox = this.game.add.sprite(0, 500, rt);
        //var person_profile = this.game.add.sprite(0, 0, rt_person);


      var profile = this.game.add.sprite(
        500,
        400,
        'sandy_profile');
      profile.anchor.setTo(1.3, 0);

        //var options;

        for(var i = 0; i < data.options.length; i++)
        {
          if(i == 0)
          {
            var option1 = display.makeButton(this.game, this.game.width-400, 60, data.options[0].text, 'o1');
            var option1Button = this.game.add.sprite(400, 620, option1);
            option1Button.inputEnabled = true;
          }
          if(i == 1)
          {
            var option2 = display.makeButton(this.game, this.game.width-400, 60, data.options[1].text, 'o1');
            var option2Button = this.game.add.sprite(400, 680, option2);
            option2Button.inputEnabled = true;
          }
          if(i == 2)
          {
            var option3 = display.makeButton(this.game, this.game.width-400, 60, data.options[2].text, 'o1');
            var option3Button = this.game.add.sprite(400, 740, option3);
            option3Button.inputEnabled = true;
          }
        }
/*

        var option1 = display.makeButton(this.game, this.game.width-400, 60, data.options[0].text, 'o1');
        var option1Button = this.game.add.sprite(400, 620, option1);
        option1Button.inputEnabled = true;

        var option2 = display.makeButton(this.game, this.game.width-400, 60, "Option2", 'o2');
        var option2Button = this.game.add.sprite(400, 680, option2);
        option2Button.inputEnabled = true;

        var option3 = display.makeButton(this.game, this.game.width-400, 60, "Option3", 'o3');
        var option3Button = this.game.add.sprite(400, 740, option3);
        option3Button.inputEnabled = true;
*/
/*

        bmp.circle(380, 645, 16,'#cfffff');
        var circle = new Phaser.Sprite(rt, 0, 0, bmp.texture);
        rt.render(circle, {x:380, y:645});

        var circle1 = new Phaser.Circle(380, 645,16);
        this.game.debug.geom(circle1,'#cfffff');
        var circle2 = new Phaser.Circle(380, 705,16);
        this.game.debug.geom(circle2,'#cfffff');
        var circle3 = new Phaser.Circle(380, 765,16);
        this.game.debug.geom(circle3,'#cfffff');
*/

        //option1Button.events.onInputOver.add(function() { console.log(option1.txt); });

        option1Button.events.onInputDown.add(
        function() {
          option1Button.kill();
          option2Button.kill();
          option3Button.kill();
/*           this.game.debug.geom(circle1,'',false);
           this.game.debug.geom(circle2,'',false);
           this.game.debug.geom(circle3,'',false);
  */
          var name = new Phaser.BitmapText(rt, this.game.width-400, 0, 'nokia', sprite.persName + ":", 24);

          rt.render(spr, {x:0, y:0});
          rt.render(name, {x:400, y:0});

          var answer = display.makeButton(this.game, this.game.width-400 , 170, this.game.textData.BYE, 'a1');
          var answerButton = this.game.add.sprite(400,530, answer);
          answerButton.inputEnabled = true;

          answerButton.events.onInputDown.add(
            function() {
            answerButton.kill();
            this.game.dialog_open = false;
            rt.clear();
            profile.kill();
            //this.game.state.start('play');
            }, rt);
        }, rt);

        option2Button.events.onInputDown.add(
        function() {
          option1Button.kill();
          option2Button.kill();
          option3Button.kill();
/*
          circle1=null;
          circle2=null;
          circle3=null;
*/
          var name = new Phaser.BitmapText(rt, this.game.width-400, 0, 'nokia', sprite.persName + ":", 24);

          rt.render(spr, {x:0, y:0});
          rt.render(name, {x:400, y:0});

          var answer = display.makeButton(this.game, this.game.width-400 , 170, this.game.textData.BYE, 'a2');
          var answerButton = this.game.add.sprite(400, 530, answer);
          answerButton.inputEnabled = true;

          answerButton.events.onInputDown.add(
            function() {
            answerButton.kill();
            this.game.dialog_open = false;
            rt.clear();
            profile.kill();
            //this.game.state.start('play');
            }, rt);
        }, rt);

        option3Button.events.onInputDown.add(
        function() {
          option1Button.kill();
          option2Button.kill();
          option3Button.kill();
          /*
          circle1.kill();
          circle2.kill();
          circle3.kill();
          */
          var name = new Phaser.BitmapText(rt, this.game.width-400, 0, 'nokia', sprite.persName + ":", 24);

          rt.render(spr, {x:0, y:0});
          rt.render(name, {x:400, y:0});

          var answer = display.makeButton(this.game, this.game.width-400 , 170, this.game.textData.BYE, 'a2');
          var answerButton = this.game.add.sprite(400, 530, answer);
          answerButton.inputEnabled = true;

          answerButton.events.onInputDown.add(
            function() {
            answerButton.kill();
            this.game.dialog_open = false;
            rt.clear();
            profile.kill();
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
