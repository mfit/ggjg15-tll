'use strict';

var Vertex = require('../model/vertex');
var Edge   = require('../model/edge');

function Graph() {
  this.init();
}
  
Graph.prototype = {
  init: function() {
    this._vertices = {};
	this._edges = {};
  },

  add: function(name, data) {
    this._vertices[name] = new Vertex(name, data);
    this._edges[name] = new Edge(name, data);
	this._vertices[name].addEdges(this._edges[name]);
  }
}


module.exports = Graph;
