'use strict';
function GameMaster(maxRound) {
  this.init(maxRound);
}

GameMaster.prototype = {
  init: function(maxRound) {
      this._tick = 0;
      this._maxRound = maxRound;
  },

  tick: function() {
      this._tick += 1;
  },

  playRound: function() {
      this.tick();
      console.log("current round " + this._tick);
      // TODO
      if (this._tick >= this._maxRound) {
          this.finalStep();
      }
  },

  finalStep: function() {
      console.log("finalStep");
  },
}


function test() {
  var gm = new GameMaster(3);
  gm.playRound();
  gm.playRound();
  gm.playRound();
}

module.exports = GameMaster;

if (require.main === module) {
    test();
}
