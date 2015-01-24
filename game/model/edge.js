'use strict';
function Edge(name, data) {
  this.init(name, data);
}

Edge.prototype = {
  init: function(from, to, data) {
    this._from = from;
    this._to   = to;
    this._data = data;
  },
}


module.exports = Edge;
