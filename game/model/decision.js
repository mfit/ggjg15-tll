(function() {
    'user strict';


    var RoomState = function(decisionHandler) {

      this.options = {};
      this.persons = {};

    };

    RoomState.prototype = {
      addPerson: function(p) {
        this.persons[p.name] = p;
      },
      addOption: function(o) {
        this.options[o.name] = o;
      }
    };

    var WorldPerson = function(name, startPos, initOptions, prefs) {
      // Init the person with its 'set of believes'
      // attitudes towards things
      //
      // keys from initOptions will be used to set prefs and weights
      // prefs is a dict with tuples (pref, weight)

      // Init all options to zero , weigth zero

      this.name = name;
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
        npcTalk: function() {
            //TODO choose npcName
            selectNPC(npcName);
            getOptions();
            //TODO choose optionId
            selectOption(optionId);
            handleComment();
        },

        getOptions: function() {
           //TODO choose 3 options
           return [{id:"HALLO",  txt:"Hallo"},
                   {id:"HALLO2", txt:"Hallo2"},
                   {id:"HALLO3", txt:"Hallo3"}
           ];
        },

        selectNPC: function(npcName) {
            this.npc = npcName;
        },

        selectOption: function(id) {
            this.option = id;
        },

        /**
         * @opt_id opt id
         * other_character ? can be undefined, then it's the player ...
         */
        handleComment: function(opt_id, other_character) {

            var response = undefined;
            // TODO something with this.npc
            // TODO something with this.option
            response = "blabla";
            return response;
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

    function VectorDecision(person, options) {
      //
      // Calculate preference
      //

      var allkeys = Object.keys(person.preferences);

      return options.map(function(option) {
        // forall options :
        return Math.sqrt(allkeys.map(function(k) {
          var attrweight = Math.pow(person.preferences[k] - option.attributes[k], 2) *
            person.prefWeights[k];
          return attrweight;
        }).reduce(function(v, o) {return v+o;}));
      });
    };


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
      RoomState: RoomState
    };


    if (require.main === module) {
      // This part will be executed only if the file
      // is run directly from node

      _tests();
    }


}());
