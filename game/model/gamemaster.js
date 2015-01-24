'use strict';

var Graph = require("../model/graph");

function GameMaster(graph, maxRound) {
  this.init(graph, maxRound);
}

GameMaster.prototype = {
  init: function(graph, maxRound) {
      this._tick     = 0;
      this._graph    = graph;
      this._maxRound = maxRound;
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

      for (var index = 0; index < interactions.length; index++) {
          if (interactions[index] === undefined) {
              continue;
          }

          this.interact(interactions[index].from,
                        interactions[index].to,
                        interactions[index].topic,
                        interactions[index].props,
                        propertyChangeCallback);
      }
  },

  finalStep: function() {
      console.log("finalStep");
  },

  interact: function(from, to, topic, props, callback) {

      return callback(this._graph._vertices[from],
                      this._graph._vertices[to], this._tick, topic, props);

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
