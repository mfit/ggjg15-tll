(function() {


  var world = require('../model/decision');
  var vertex = require('../model/vertex');
  var graph = require('../model/graph');
  var gamemaster = require('../model/gamemaster');

  'use strict';

  function WorldBuilder() {};

  WorldBuilder.prototype = {
    buildFromConfig: function(config) {
      //
      // Init a world by config object
      //

      var propDomain = config.attributes;
      var myRoom = new RoomState(new world.VectorDecision());

      // Set up all persons
      for ( name in config.persons ) {
        var personPrefs = Object.keys(config.prefs).map(function(k) {
          return config.prefs[k][name];
        });
        myRoom.addPerson(new world.Person(name, propDomain, personPrefs));
      }

      // Set up decicionOptions
      for (name in config.decicionOptions) {
        myRoom.addOption(name, propDomain, config.decicionOptions[name]);
      }

      // Dialog options pool
      myRoom.dialog = config.baseDialogOptions;


      // var g = new Graph();
      // for (pname in myRoom.person) {
      //   g.addVertex(pname);
      //   g.getVertex(pname).assignPerson(myRoom.person[pname]);
      // }

      // g.addEdge("Fritz",  "Tommy" , {influence: 0.5});
      // g.addEdge("Fritz",  "Dora" , {influence: 0.5});
      // g.addEdge("Tommy",  "Fritz" , {influence: 0.5});
      // g.addEdge("Tommy",  "Dora" , {influence: 0.5});
      // g.addEdge("Dora",  "Fritz" , {influence: 0.5});
      // g.addEdge("Dora",  "Tommy" , {influence: 0.5});

      console.log(myRoom);
      return myRoom;

    },
  };
  //   setUpWorld: function() {
  //     //
  //     // hard coded demo world ...
  //     //

  //     // define available domains
  //     var propDomain = {

  //       music:0,
  //       talk:0,
  //       dance:0,
  //       games:0,

  //       light:0,
  //       smell:0,
  //       damp:0,
  //       dirt:0,
  //       tidy:0,
  //       smoke:0,

  //       actionMovie:0,
  //       romanceMovie:0,
  //       theaterPlay:0,
  //       sportsEvent:0,
  //       gambling:0,

  //       // etc
  //     }

  //     var myRoom = new RoomState(new world.VectorDecision());

  //     //
  //     // Create persons
  //     // All features set to 0,0 except the ones passed in
  //     //
  //     myRoom.addPerson(new world.Person("Fritz", propDomain, {music: [1, 1]}));
  //     myRoom.addPerson(new world.Person("Tommy", propDomain, {talk: [1, 1]}));
  //     myRoom.addPerson(new world.Person("Dora", propDomain, {dance: [1, 1]}));


  //     //
  //     // DecisionOptions (answers to "WHAT TO DO NOW")
  //     //
  //     myRoom.addOption(new world.Option("Skybar", propDomain, {music:1, tidy:1}));
  //     myRoom.addOption(new world.Option("The Shelter", propDomain, {music:1, dirt:1}));


  //     //
  //     // Set up the social graph
  //     //

  //     var g = new Graph();
  //     for (pname in myRoom.person) {
  //       g.addVertex(pname);
  //       g.getVertex(pname).assignPerson(myRoom.person[pname]);
  //     }

  //     g.addEdge("Fritz",  "Tommy" , {influence: 0.5});
  //     g.addEdge("Fritz",  "Dora" , {influence: 0.5});
  //     g.addEdge("Tommy",  "Fritz" , {influence: 0.5});
  //     g.addEdge("Tommy",  "Dora" , {influence: 0.5});
  //     g.addEdge("Dora",  "Fritz" , {influence: 0.5});
  //     g.addEdge("Dora",  "Tommy" , {influence: 0.5});

  //     return myRoom;
  // };

  module.exports = {
    WorldBuilder: WorldBuilder
  };
}());

