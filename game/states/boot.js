
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');


    //
    // Add a sprintf like format to String.prototype
    // Taken from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    //
    String.prototype.format = function() {
      var formatted = this;
      for( var arg in arguments ) {
          formatted = formatted.replace("{" + arg + "}", arguments[arg]);
      }
      return formatted;
    };

  }
};

module.exports = Boot;
