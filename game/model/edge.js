'use strict';
function Edge(from, to, data) {
  this.init(from, to, data);
}

Edge.prototype = {
  init: function(from, to, data) {
    this._from = from;
    this._to   = to;
    this._data = data;
  },
}


module.exports = Edge;
