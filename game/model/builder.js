(function() {


  var world = require('../model/decision');
  var vertex = require('../model/vertex');
  var graph = require('../model/graph');
  var gamemaster = require('../model/gamemaster');

  'use strict';

  function WorldBuilder() {};

  WorldBuilder.prototype = {
    buildFromConfig: function(game, config) {
        this.game = game;
      //
      // Init a world by config object
      //

      var propDomain = config.attributes;
      var myRoom = new world.RoomState(world.Decision);

      var g = new graph();
      // Set up all persons
      for ( personIndex in config.persons ) {
        var name = config.persons[personIndex].name;
        var startPos = config.persons[personIndex].startPosition;
        var personPrefs2 = Object.keys(config.prefs).map(function(k) {
          return config.prefs[k][name];
        });
        personPrefs = {};
        for (var i = 0; i < personPrefs2.length; i++)
        {
          var keys = Object.keys(config.prefs);
          personPrefs[keys[i]] = personPrefs2[i];
        }
        myRoom.addPerson(new world.Person(name,g,myRoom,startPos,propDomain, personPrefs));
      }

      this.game.room = myRoom;

      // Set up decicionOptions
      for (var name in config.decicionOptions) {
        myRoom.addOption(name, propDomain, config.decicionOptions[name]);
      }

      // Dialog options pool
      for (var i = 0; i < config.baseDialogOptions.length; i++)
      {
          var dialogOption = config.baseDialogOptions[i];
          myRoom.addDialog(dialogOption[0], dialogOption[1], dialogOption[2]);
      }

      //
      // TODO :  setup graph from config
      //

      for (pname in myRoom.persons) {
         g.addVertex(pname);
         g.getVertex(pname).assignPerson(myRoom.persons[pname]);
      }

      var edgeAttrs = {};
      for (attribute in config.edges) {
        for (from in config.edges[attribute]) {
            if (!edgeAttrs.hasOwnProperty(from))
                edgeAttrs[from] = {};
            for (to in config.edges[attribute][from]) {
                if (!edgeAttrs[from].hasOwnProperty(to)) {
                    edgeAttrs[from][to] = {};
                }
                edgeAttrs[from][to][attribute] = config.edges[attribute][from][to];
            }
        }
      }

      for (from in edgeAttrs) {
          for (to in edgeAttrs[from]) {
            g.addEdge(from, to, edgeAttrs[from][to]);
          }
      }

      console.log(g._edges);

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

  module.exports = {
    WorldBuilder: WorldBuilder
  };
}());

