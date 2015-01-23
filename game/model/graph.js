'use strict';

var Vertex = require('../model/vertex');
var Edge   = require('../model/edge');

function Graph() {
  this.init();
}

Graph.prototype = {
  init: function() {
    this._vertices = {};
    this._edges    = {};
  },

  add: function(name, data) {
    this._vertices[name] = new Vertex(name, data);
    this._edges[name]    = new Edge(name, data); //TODO
    this._vertices[name].addEdges(this._edges[name]);
  },

  getVertexWithMinByName: function(name) {

    // naive way
    var vertex   = null;
    var maxValue = 0;

    for (var key in this._vertices) {
        if (this._vertices[key]._data.influence > maxValue) {
          vertex   = this._vertices[key];
          maxValue = vertex._data.influence;
        }
    }

    return vertex;
  },

  getVertexWithMaxByName: function(name) {
    // naive way
    var vertex   = null;
    var minValue = -1;

    for (var key in this._vertices) {
        if (minValue == -1 || this._vertices[key]._data.influence < minValue) {
          vertex   = this._vertices[key];
          minValue = vertex._data.influence;
        }
    }

    return vertex;
  },
}


module.exports = Graph;
