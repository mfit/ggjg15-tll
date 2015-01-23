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
    module.exports = {
      DialogHandler:DialogHandler
    };
}());
