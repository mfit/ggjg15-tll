
    'user strict';


    var RoomState = function(decisionHandler) {
      this.decisionHandler = decisionHandler;
      this.options = {};
      this.persons = {};
      this.dialogs = {};
    };

    RoomState.prototype = {
      addPerson: function(p) {
        this.persons[p.name] = p;
      },
      // addOption: function(o) {
      //   this.options[o.name] = {"txt":o[1], "key":o[0], "prefs":o[2]};
      // },
      addOption: function(key, text, prefs) {
        this.options[key] = {"text":text, "prefs":prefs};
      },
      addDialog: function(key, text, prefs, answers, specAnsw) {
          this.dialogs[key] = {"text":text, "prefs":prefs, "answers":answers, "specAnswer":specAnsw};
      },
      getPersonsFavourite: function(personKey) {
        var pers = this.persons[personKey],
            self = this,

            // get the evaluation value (attitude towards..) foreach option
            // store in tuple with (value, optionkey)
            evaluations = Object.keys(this.options).map(function (optkey) {
              return [self.decisionHandler(pers, self.options[optkey].prefs), optkey];
            });

          // sort it
          evaluations.sort(function(a, b) { return a[0] - b[0]} );
          console.log(evaluations);

          // Pop the last one - it's the favourite option
          var winner = evaluations.pop();
          return winner[1];
      },
      evaluate: function() {
        /**
         * determine each person's decision / place-to-go-thing-to-do
         */
        // TODO:
        // Alpha:
        // Select the character with the highest influence
        // Find his winner
        // He offers that option to the other characters (call CalculateResponse)

        // Omega
        // Find the character with the lowest influence (influence from alpha to character)
        // Find his winner
        // If his winner is the same option as alpha's do nothing
        // Otherwise he offers his option to the other characters (call CalculateResponse)

        // Calculate the winners of the remaining characters
        // Then do the normal evaluation

        var p, o, winStruct = {}, self = this;

        InfluencerDiscussion(this);

        // Prepare the options-to-persons result-object ...
        for (o in this.options) {
          winStruct[o] = [];
        }

        for (p in this.persons) {
          var winkey = this.getPersonsFavourite(p)
          // last minute hack
          if (p == 'Player') {
            //continue;
              p = "You";
          }
          winStruct[winkey].push(p);
        }

        console.log(winStruct);
        return winStruct;
      }
    };

    var InfluencerDiscussion = function(room) {
        // TODO:
        // Alpha:
        // Select the character with the highest influence
        // Find his winner
        // He offers that option to the other characters (call CalculateResponse)

        // Omega
        // Find the character with the lowest influence (influence from alpha to character)
        // Find his winner
        // If his winner is the same option as alpha's do nothing
        // Otherwise he offers his option to the other characters (call CalculateResponse)

        // Calculate the winners of the remaining characters
        // Then do the normal evaluation

        var max = [0, ''], alpha, omega, min = [999, ''], sum;
        for (from in room.influenceGraph._vertices)
        {
          if (from === 'Player') continue;
          sum = 0;
          for (to in room.influenceGraph._vertices)
          {
            if (from === 'Player' || from === to) continue;
            var edge = room.influenceGraph.getEdge(from, to);
            sum += edge.getData('influence');
          }
          console.log(from + " " + sum);
          if (sum > max[0]) {
            max = [sum, from];
          }
        }
        alpha = max[1];

        console.log(alpha + "'s fav: " + room.getPersonsFavourite(alpha));
        console.log(room.options[room.getPersonsFavourite(alpha)]);

        var temp;
        for (to in room.influenceGraph._vertices) {
          if (to === 'Player') continue;
          if (alpha !== to) {
            temp = room.influenceGraph.getEdge(alpha, to).getData('influence');
          }
          if (temp < min[0]) {
            min = [temp, to];
          }
        }

        omega = min[1];

        console.log(omega + "'s fav: ");
        console.log(room.options[room.getPersonsFavourite(omega)]);

        // room.decisionHandler(room.persons[alpha],

        console.log ("Alpha / Omega = ");
        console.log(alpha);
        console.log(omega);
    }

    var WorldPerson = function(name, game, graph, room, startPos, initOptions, prefs) {
      this.game = game;
      // Init the person with its 'set of believes'
      // attitudes towards things
      //
      // keys from initOptions will be used to set prefs and weights
      // prefs is a dict with tuples (pref, weight)

      // Init all options to zero , weigth zero

      this.room = room;
      this.name = name;
      this.graph = graph;
      this.startPos = startPos;
      var k;

      this.preferences = {};
      this.prefWeights = {};
      for ( k in initOptions ) {
        this.preferences[k] = 0;
        this.prefWeights[k] = 0;
      }

      //
      // set initial person's prefs
      // either numbers ( prefValue), or tuple ( prefValue AND weight )
      for (k in prefs) {
        if (typeof prefs[k] === 'number') {
          this.preferences[k] = prefs[k];
        } else if (typeof prefs[k] === 'object') {
          this.preferences[k] = prefs[k][0];
          this.prefWeights[k] = prefs[k][1];
        }
      }

    };

    WorldPerson.prototype = {
        getOptions: function() {
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
           var shuffle = function(o){ //v1.0
           for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
               return o;
           };

           var possibleAttributes = Object.keys(this.game.config.attributes);
           var attrs = shuffle(possibleAttributes);

           console.log('choosen values: ' + attrs[0] + ' ' + attrs[1] + ' ' + attrs[2]);
           var dialogValues = [];
           for (var key in this.room.dialogs) {
               if(this.room.dialogs[key].prefs[attrs[0]] == undefined &&
                  this.room.dialogs[key].prefs[attrs[1]] == undefined &&
                  this.room.dialogs[key].prefs[attrs[2]] == undefined) {
                      continue;
               }
               dialogValues.push(this.room.dialogs[key]);
           }

           var opt = shuffle(dialogValues);

           //TODO choose 3 options
           return [opt[0], opt[1], opt[2]];
           // TODO: 3 random options:
           // - select 3 out of the 5 attributes
           // - for each attribute select a random option that includes that attribute
        },


        /**
         * @opt_id opt id
         * other_character ? can be undefined, then it's the player ...
         */
        handleComment: function(other_character, option, charName) {

            var importance = CalculateResponse(this.graph, other_character, this, option); // care its around

            if (option.specAnswer[charName] != undefined) {
                return option.specAnswer[charName];
            }

            if (importance < 0.30) {
                return option.answers[2];
            } else if (importance > 0.30) {
                return option.answers[0];
            } else {
                return option.answers[1];
            }

            return importance;
        },
    };

    var WorldOption = function(name, initOptions, attrs) {
      // An option of "WHAT TO DO"
      // Has a set of features / attributes
      //
      // initOptions - creates keys and initialises with 0
      // attrs  - all or subset of initOptions , initialised to value
      //
      var k;

      this.name = name;
      this.attributes = {};

      for ( k in initOptions ) {
        this.attributes[k] = 0;
      }

      for ( k in attrs ) {
        this.attributes[k] = attrs[k];
      }

    }

    function VectorDecision(person, optionPrefs) {
      //
      // Calculate preference
      //

      var allkeys = Object.keys(person.preferences),
        // what norm ? nth or 2nd ?
        // norm_n = allkeys.length
        norm_n = 2
        ;

        var optionsCopy = {};
        var numPrefs = Object.keys(optionPrefs).length;

        // forall options :
        var imp = 1 - 1.0/Math.sqrt(4*numPrefs)*Math.pow(allkeys.map(function(k) {
            var pref = -1;
            if (optionPrefs.hasOwnProperty(k))
              pref = optionPrefs[k];
            var attrweight = Math.pow(person.preferences[k] - pref, 2) *
            (1 - person.prefWeights[k]);
            return attrweight;
        }).reduce(function(v, o) {return v+o;}), 1/norm_n);
        return imp;
    };

    function CalculateResponse(graph, initPerson, targetPerson, option) {
        console.log(initPerson, "talks to", targetPerson);
        var influence = graph.getEdge(initPerson.name, targetPerson.name).getData('influence');
        console.log("influence", influence);

        var allkeys = Object.keys(initPerson.preferences);

        // how important the topic is to the target person
        var importance = VectorDecision(targetPerson, option.prefs);

        console.log("importance", importance);

        console.log("attrs");
        for (var prefKey in initPerson.preferences) {
            var old = targetPerson.prefWeights[prefKey];
            var newWeight = old;
            if (option.prefs.hasOwnProperty(prefKey))
            {
                console.log("Option", option.prefs[prefKey]);
                var positive = Math.pow(old, 2 - 2*importance);
                newWeight = positive;


            } else
            {
                var negative = Math.pow(old, 2*importance);
                newWeight = negative;
            }
            console.log(prefKey, targetPerson.preferences[prefKey], old, newWeight);
            targetPerson.prefWeights[prefKey] = newWeight;
        }

        // modify influence (decrease influence if importance was low / increase otherwise)
        if (importance <= 0.5) {

          var newInfluence = influence - 0.5 * importance;
          if (newInfluence < 0) {
            newInfluence = 0;  }
            graph.getEdge(initPerson.name, targetPerson.name).setData('influence', newInfluence);
        } else {
          var newInfluence = influence + 0.5 * (- 0.5 + importance);
          if (newInfluence > 1){
            newInfluence = 1; }
            graph.getEdge(initPerson.name, targetPerson.name).setData('influence', newInfluence);
        }

        var influenceNew = graph.getEdge(initPerson.name, targetPerson.name).getData('influence');
        console.log("Old influence", influence, "New influence", influenceNew);
        return importance;
    }


    // function Decision(person, options) {
    //   //
    //   // Evaluate a person's favour regarding the options
    //   // ** Calculation / Berechnung **
    //   //

    //   var preferences = options.map(function(option) {
    //     var attr, tendency = 0, weights;

    //     // for every matching attribute, feature-weight
    //     // is the the feature (0.0, 1.0) x the pref of person (-1.0, 1.0)
    //     weights = Object.keys(option.attributes).map(function(k) {
    //       return k in person.preferences ?
    //         option.attributes[k] * person.preferences[k] : 0;
    //     });

    //     // pref for an option is average of the weights
    //     tendency =
    //       (weights.reduce(function(v, o) { return v+o; }) / weights.length);

    //     return tendency;
    //   });

    //   return preferences;

    //   //.reduce(function(v, old) { return old+v; });

    // }

    function _tests() {

      var allOptions = {
        music:0,
        brightness:0,
        talk:0,
        dance:0
      };

      var options = [
        new WorldOption("Skybar", allOptions, {
          music:1,
        }),
        new WorldOption("The Shelter", allOptions, {
          music:0.3,
          brightness: 0.0,
          dance:-1,
          talk:0.5,
        })
      ];

      var person = new WorldPerson("Tommy L. Jones", allOptions, {
        music : [1.0, 1],
        brightness : [-1.0, 1],
        talk : [0, 1],
        dance: [0.2, 1],
      });

      console.log(person);
      console.log(options);
      console.log(VectorDecision(person, options));
    }

    module.exports = {
      Person : WorldPerson,
      Option: WorldOption,
      Decision: VectorDecision,
      RoomState: RoomState,
      CalculateResponse: CalculateResponse
    };


    if (require.main === module) {
      // This part will be executed only if the file
      // is run directly from node

      _tests();
    }


// someone deleted the upper part ... }());
