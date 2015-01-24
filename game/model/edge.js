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
  getData: function(key) {
      return this._data[key];
  },
  setData: function(key, value) {
      this._data[key] = value;
  }
}


module.exports = Edge;
