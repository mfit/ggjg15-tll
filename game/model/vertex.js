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

  getNeighborWithMaxProperty: function(property, graphObj) {
    if (this._edges.length == 0) {
      return undefined;
    }

    return graphObj.getVertexWithMaxProperty(property, this.getVerticesOfEdges(graphObj));
  },

  getNeighborWithMinProperty: function(property, graphObj) {
    if (this._edges.length == 0) {
      return undefined;
    }

    return graphObj.getVertexWithMinProperty(property, this.getVerticesOfEdges(graphObj));
  },

  getVerticesOfEdges: function(graphObj) {
    var vertices = {};

    for (var i = 0; i < this._edges.length; i++) {
        vertices[this._edges[i]._to] = graphObj._vertices[this._edges[i]._to];
    }

    return vertices;
  },

  getVertexWithMinPropertyEdge: function(property, graphObj) {
    var vertex = undefined;
    var minVal = undefined;
    for (var i = 0; i < this._edges.length; i++) {
        if (this._edges[i]._data != undefined && (
            this._edges[i]._data[property] < minVal ||
            minVal == undefined)) {
          minVal = this._edges[i]._data[property];
          vertex = graphObj._vertices[this._edges[i]._to];
        }
    }

    return vertex;
  },

  getVertexWithMaxPropertyEdge: function(property, graphObj) {
    var vertex = undefined;
    var minVal = undefined;
    for (var i = 0; i < this._edges.length; i++) {
        if (this._edges[i]._data != undefined && (
            this._edges[i]._data[property] > minVal ||
            minVal == undefined)) {
          minVal = this._edges[i]._data[property];
          vertex = graphObj._vertices[this._edges[i]._to];
        }
    }

    return vertex;
  },

  assignPerson: function(person) {
    /**
     * set reference to person / vertex and vice versa
     */
    this.person = person;
    person.vertex = this;
  }
}


module.exports = Vertex;
