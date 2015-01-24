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
    this._edges.push(edges);
  },

  getNeighborWithMaxProperty: function(name, property, graphObj) {
    if (this._edges.length == 0) {
      return null;
    }

    return graphObj.getVertexWithMaxProperty(property, this.getVerticesOfEdges(graphObj));
  },

  getNeighborWithMinProperty: function(name, property, graphObj) {
    if (this._edges.length == 0) {
      return null;
    }

    return graphObj.getVertexWithMinProperty(property, this.getVerticesOfEdges(graphObj));
  },

  getVerticesOfEdges: function(graphObj) {
    var vertices = {};

    for (var i = 0; i < this._edges.length; i++) {
        vertices[this._edges[i]._to] = graphObj._vertices[this._edges[i]._to];
    }

    return vertices;
  }
}


module.exports = Vertex;
