'use strict';

var Decision = require("../model/decision");

function Player() {
  Decision.Person.call(this);
}

Player.prototype = Object.create(Decision.Person.prototype);

// Overwrite Person methods for Player
//Player.prototype.getOptions = function() {
//};

module.exports = Player;

function test() {
    // check object inheritance
    var person = new Decision.Person();
    console.log(person instanceof Decision.Person);
    var player = new Player();
    console.log(player instanceof Decision.Person);
    console.log(player instanceof Player);
    console.log(player.getOptions().length === 3);
    player.selectOption(3);
    player.selectNPC(3);
    console.log(player.handleComment() == "blabla");
    console.log(person.getOptions().length === 3);
    person.selectOption(3);
    person.selectNPC(3);
    console.log(player.handleComment() == "blabla");
}

if (require.main === module) {
    test();
}
