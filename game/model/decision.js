(function() {
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
      addDialog: function(key, text, prefs) {
          this.dialogs[key] = {"text":text, "prefs":prefs};
      },
      evaluate: function() {
        /**
         * determine each person's decision / place-to-go-thing-to-do
         */
        var p, o, winStruct = {}, self = this;

        // Prepare the options-to-persons result-object ...
        for (o in this.options) {
          winStruct[o] = [];
        }

        for (p in this.persons) {

          // forall persons, get the evaluation value (attitude towards..) foreach option
          // store in tuple with (value, optionkey)
          var pers = this.persons[p],
            evaluations = Object.keys(this.options).map(function (optkey) {
              return [self.decisionHandler(pers, self.options[optkey]), optkey];
            });
          // sort it
          evaluations.sort(function(a, b) { return a[0] - b[0]} );
          console.log(evaluations);

          // Pop the last one - it's the favourite option
          var winner = evaluations.pop();
          winStruct[winner[1]].push(p);
        }

        console.log(winStruct);
        return winStruct;
      }
    };

    var WorldPerson = function(name, graph, room, startPos, initOptions, prefs) {
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

           var dialogValues = [];
           for (var key in this.room.dialogs) {
               dialogValues.push(this.room.dialogs[key]);
           }
           var opt = shuffle(dialogValues);

           //TODO choose 3 options
           return [opt[0], opt[1], opt[2]];
        },


        /**
         * @opt_id opt id
         * other_character ? can be undefined, then it's the player ...
         */
        handleComment: function(other_character, option) {
            console.log(option);
            console.log(other_character);

            var importance = CalculateResponse(this.graph, other_character, this, option); // care its around

            // TODO something with this.npc
            // TODO something with this.option
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

    function VectorDecision(person, option) {
      //
      // Calculate preference
      //

      var allkeys = Object.keys(person.preferences),
        // what norm ? nth or 2nd ?
        // norm_n = allkeys.length
        norm_n = 2
        ;


        // forall options :
        return Math.pow(allkeys.map(function(k) {
            if (!option.hasOwnProperty(k)) {
                option[k] = 0.0;
            }
            var attrweight = Math.pow(person.preferences[k] - option[k], 2) *
            (1 - person.prefWeights[k]);
            return attrweight;
        }).reduce(function(v, o) {return v+o;}), 1/norm_n);
    };

    function CalculateResponse(graph, initPerson, targetPerson, option) {
        var influence = graph.getEdge(initPerson.name, targetPerson.name).getData('influence');
        console.log("influence", influence);

        var allkeys = Object.keys(initPerson.preferences);

        // how important the topic is to the target person
        var importance = VectorDecision(targetPerson, option.prefs);
        console.log("importance", importance);

        // if influence is low we prefer other topics
        var finalP = Math.pow(importance/2.0, 2 - influence*2.0);
        var finalN = Math.pow(importance/2.0, influence*2.0);

        console.log("final", finalP, finalN);
        if (finalP < 0 || finalN < 0 || finalP > 1 || finalN > 1)
            console.warn("Values are off");

        console.log("attrs");
        for (var prefKey in initPerson.preferences) {
            var old = targetPerson.prefWeights[prefKey];
            var newWeight = old;
            if (option.prefs.hasOwnProperty(prefKey))
            {
                console.log("Option", option.prefs[prefKey]);
                newWeight = (old + finalP)/2.0;
            } else
            {
                newWeight = (old + finalN)/2.0;
            }
            console.log(prefKey, targetPerson.preferences[prefKey], old, newWeight);
            targetPerson.prefWeights[prefKey] = newWeight;
        }
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


}());
