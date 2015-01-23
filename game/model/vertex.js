'use strict';
function Vertex(name, data) {
  this.init(name, data);
}

Vertex.prototype = {
  init: function(name, data) {
    this._name  = name;
    this._data  = data;
    this._edges = [];
  },

  addEdges: function(edges) {
    this._edges.concat(edges);
  },
}


module.exports = Vertex;
