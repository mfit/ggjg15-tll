'use strict';
function Edge(name, data) {
  this.init(name, data);
}



Edge.prototype = {
  init: function(name, data) {
    this._name = name;
    this._data = data;
  },
}


module.exports = Edge;
