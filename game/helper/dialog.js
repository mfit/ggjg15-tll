(function() {
    'user strict';

    var DialogHandler = function(game) {
      this.game = game;
    };

    DialogHandler.prototype = {
      startLobbyingDialog: function(sprite) {
        console.log("Starting dialog with " + sprite);
        console.log(this.game.textData.NAME.format(sprite.persName));
      },
      showLobbyingDialogPanel: function(x, y) {

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
