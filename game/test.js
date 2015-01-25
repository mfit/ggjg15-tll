(function(){
    'use strict';

    //
    // some test cases
    //

    function assert(condition, message) {
      if (!condition) {
        throw message;
      }
    }


    var world = require('./model/decision');

    assert(
      world.Decision({preferences: {music:1},
                                prefWeights: {music:1}},
                               {music:1})
      == 0 , "Distance is 0");


    assert(
      world.Decision({preferences: {music:-1},
                      prefWeights: {music:1}},
                      {music:1}) == 2, "Dist is 2");


    var prefers_one_cares_about_both = (world.Decision({preferences: {music:1, talk:-1},
                                prefWeights: {music:1, talk:1}},
                               {music:0.5, talk:0.5}));

    var prefers_one_cares_about_one = (world.Decision({preferences: {music:1, talk:-1},
                                prefWeights: {music:1, talk:0}},
                               {music:0.5, talk:0.5}));

    assert(prefers_one_cares_about_both > prefers_one_cares_about_one);

}());
