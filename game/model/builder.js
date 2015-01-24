(function() {


  var world = require('../model/decision');
  var vertex = require('../model/vertex');
  var graph = require('../model/graph');
  var gamemaster = require('../model/gamemaster');

  'use strict';

  WorldBuilder() {};

  WorldBuilder.prototype = {

    setUpWorld: function() {
      // later, this might parse json configs blah, for now,
      // set it all up here

      // define available domains
      var propDomain = {

        music:0,
        talk:0,
        dance:0,
        games:0,

        light:0,
        smell:0,
        damp:0,
        dirt:0,
        tidy:0,
        smoke:0,

        actionMovie:0,
        romanceMovie:0,
        theaterPlay:0,
        sportsEvent:0,
        gambling:0,

        // etc
      }

      var myRoom = new RoomState(new VectorDecision()) {
      };

      //
      // Create persons
      // All features set to 0,0 except the ones passed in
      //
      myRoom.addPerson(new world.Person("Fritz", propDomain, {music: [1, 1]}));
      myRoom.addPerson(new world.Person("Tommy", propDomain, {talk: [1, 1]}));
      myRoom.addPerson(new world.Person("Dora", propDomain, {dance: [1, 1]}));


      //
      // DecisionOptions (answers to "WHAT TO DO NOW")
      //
      myRoom.addOption(new world.Option("Skybar", propDomain, {music:1, tidy:1}));
      myRoom.addOption(new world.Option("The Shelter", propDomain, {music:1, dirt:1}));


      //
      // Set up the social graph
      //

      var g = new Graph();
      for (pname in myRoom.person) {
        g.addVertex(pname);
        g.getVertex(pname).assignPerson(myRoom.person[pname]);
      }

      g.addEdge("Fritz",  "Tommy" , {influence: 0.5});
      g.addEdge("Fritz",  "Dora" , {influence: 0.5});
      g.addEdge("Tommy",  "Fritz" , {influence: 0.5});
      g.addEdge("Tommy",  "Dora" , {influence: 0.5});
      g.addEdge("Dora",  "Fritz" , {influence: 0.5});
      g.addEdge("Dora",  "Tommy" , {influence: 0.5});


  };
}());

