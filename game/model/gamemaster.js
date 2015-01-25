'use strict';

var Graph = require("../model/graph");

function GameMaster(graph, maxRound, config, room, game) {
  this.init(graph, maxRound, config, room, game);
}

GameMaster.prototype = {
  init: function(graph, maxRound, config, room, game) {
      this._tick     = -1;
      this._graph    = graph;
      this._maxRound = maxRound;
      this._config = config;
      this._room     = room;
      this.game = game;
  },

  tick: function() {
      this._tick += 1;
  },

  playRound: function(interactions, propertyChangeCallback) {
      this.tick();
      console.log("current round " + this._tick);
      if (this._tick >= this._maxRound) {
          this.finalStep();
          return;
      }

      if (interactions === undefined) {
          console.error("interactions are empty - but not last round");
          return;
      }

      if (interactions.length <= this._tick)
      {
          console.log("interactions for tick do not exist", this._tick, interactions);
          var winstruct = this._room.evaluate();
          console.log(winstruct);

          this.game.winStruct = winstruct;

          // TODO : possibly remove with some kind of anim - characters move left or right
          // to signal their option-choice ??
          this.game.state.start('gameover');

          return;
      }

      for (var index = 0; index < interactions[this._tick].length; index++) {
          if (interactions[this._tick][index] === undefined) {
              continue;
          }

          this.interact(interactions[this._tick][index][0],
                        interactions[this._tick][index][1],
                        propertyChangeCallback);
      }
  },

  finalStep: function() {
      console.log("finalStep");
  },

  interact: function(from, to, callback) {

      return callback(this._graph._vertices[from],
                      this._graph._vertices[to], this._tick);

  },

}


function test() {
  var g = new Graph();
  g.addVertex('Susi',  {data: 5});
  g.addVertex('Fritz', {data: 10});
  g.addVertex('Sarah', {data: 15});
  g.addVertex('HAL9000');
  g.addEdge("Susi",  "Sarah" , {influence: 5});
  g.addEdge("Susi",  "Fritz" , {influence: 10});
  g.addEdge("Fritz", "Susi"  , {influence: 20});
  g.addEdge("Fritz", "Sarah" , {influence: 10});
  g.addEdge("HAL9000", "Fritz");


  var interactions1 = [
    {from: "Susi", to: "Sarah", topic: "blablabla", props: {}},
  ];

  var gm = new GameMaster(g, 3);
  gm.playRound(interactions1);
  gm.playRound();
  gm.playRound();
}

module.exports = GameMaster;

if (require.main === module) {
    test();
}
