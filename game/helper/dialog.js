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

        var player = this.game.room.persons["Player"];
        console.log(player);
        var opt_list = [],
                  wo = sprite.worldObject;

        for (var i=0; i < wo.getOptions().length; i++) {
          console.log(wo.getOptions());

          if ( ! wo.getOptions()[i] ) {
            console.log("WARNING ! Dialog option without text for player " + wo.name);
            continue;
          }

          opt_list.push(
                  {text:     wo.getOptions()[i].text,
                   callback: (function(option, worldObject) {
                       return function() { return wo.handleComment(player, option); };
                   })(wo.getOptions()[i], wo)
                  }
          );
        }

        this.data = {text:"Hello !", options: opt_list};

        if(this.game.dialog_open) {
          return;
        }

        this.game.dialog_open = true;
        var rt  = new Phaser.RenderTexture(this.game, this.game.width, 500, "DialogBox");
        var bmp = new Phaser.BitmapData(this.game, '', this.game.width, 500);

        bmp.ctx.fillStyle = '#337711';
        bmp.circle(this.game.width/2, 500/2, 10);
        bmp.ctx.fillStyle = '#137761';
        bmp.circle(this.game.width/2+10, 500/2, 5);

        bmp.rect(0, 0, this.game.width, 500);

        var spr  = new Phaser.Sprite(rt, 0, 0, bmp.texture);
        var name = new Phaser.BitmapText(rt, 0, 0, 'nokia', wo.name + ":", 24);
        var txt2 = new Phaser.BitmapText(rt, 0, 0, 'nokia', this.data.text, 24);

        rt.render(spr,  {x:  0, y: 0});
        rt.render(name, {x:400, y: 0});
        rt.render(txt2, {x:400, y:30});

        var dialogBox = this.game.add.sprite(0, 500, rt);

        var profile = this.game.add.sprite(500, 400, 'sandy_profile');
        profile.anchor.setTo(1.3, 0);

        var amountOfOptions = this.data.options.length;
        var buttons = [];

        for (var buttonIndex = 0; buttonIndex < amountOfOptions; buttonIndex++) {
            var option = display.makeButton(this.game, this.game.width - 400, 60, this.data.options[buttonIndex].text, 'o1');
            var button = this.game.add.sprite(400, 620 + buttonIndex * 60, option);
            button.inputEnabled = true;

            var self = this;

            button.events.onInputDown.add((function(buttonIdx){
                return function() {
                    for (var index = 0; index < amountOfOptions; index++) {
                        buttons[index].kill();
                    }

                    var responseTxt = self.data.options[buttonIdx].callback();
                    var name = new Phaser.BitmapText(rt,
                                                     self.game.width - 400,
                                                     0,
                                                     'nokia',
                                                     sprite.persName + ":",
                                                     24);

                    rt.render(spr,  {x:  0, y:0});
                    rt.render(name, {x:400, y:0});

                    console.log(responseTxt);
                    var answer = display.makeButton(self.game,
                                                    self.game.width - 400,
                                                    170,
                                                    responseTxt,
                                                    'a1');

                    var answerButton = self.game.add.sprite(400, 530, answer);
                    answerButton.inputEnabled = true;


                    answerButton.events.onInputDown.add(
                        function() {
                            answerButton.kill();
                            self.game.dialog_open = false;
                            rt.clear();
                            profile.kill();
                        },rt
                    );
                }
            })(buttonIndex), rt);

            buttons.push(button);
        }
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
