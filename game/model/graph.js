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

  addVertex: function(name, data) {
    this._vertices[name] = new Vertex(name, data);
  },

  addEdge: function(from, to, data) {
    this._edges[to] = new Edge(from, to, data);
    this._vertices[from].addEdges(this._edges[to]);
  },

  getVertexWithMaxProperty: function(property, dataset) {
    // naive way
    var vertex   = null;
    var maxValue = 0;

    if (dataset == undefined) {
        dataset = this._vertices;
    }

    for (var key in dataset) {
        if (dataset[key]._data[property] > maxValue) {
          vertex   = dataset[key];
          maxValue = vertex._data[property];
        }
    }

    return vertex;
  },

  getVertexWithMinProperty: function(property, dataset) {
    // naive way
    var vertex   = null;
    var minValue = -1;

    if (dataset == undefined) {
        dataset = this._vertices;
    }

    for (var key in dataset) {
        if (minValue == -1 || dataset[key]._data[property] < minValue) {
          vertex   = dataset[key];
          minValue = vertex._data[property];
        }
    }

    return vertex;
  },

  getNeighborWithMaxProperty: function(name, property) {
      return this._vertices[name].getNeighborWithMaxProperty(property, this);
  },

  getNeighborWithMinProperty: function(name, property) {
      return this._vertices[name].getNeighborWithMinProperty(property, this);
  },

  getVertexWithMaxPropertyEdge: function(name, property) {
     return this._vertices[name].getVertexWithMaxPropertyEdge(property, this);
  },

  getVertexWithMinPropertyEdge: function(name, property) {
      return this._vertices[name].getVertexWithMinPropertyEdge(property, this);
  },


}


function test()
{
  var g = new Graph();
  g.addVertex('Susi',  {data: 5});
  g.addVertex('Fritz', {data: 10});
  g.addVertex('Sarah', {data: 15});
  var data = {};
  g.addEdge("Susi",  "Sarah" , {influence: 5});
  g.addEdge("Susi",  "Fritz" , {influence: 10});
  g.addEdge("Fritz", "Susi"  , {influence: 20});
  g.addEdge("Fritz", "Sarah" , {influence: 10});

  console.log(g.getVertexWithMaxProperty("data")._name === "Sarah");
  console.log(g.getVertexWithMinProperty("data")._name === "Susi");
  console.log(g.getNeighborWithMinProperty("Susi", "data")._name === "Fritz");
  console.log(g.getNeighborWithMaxProperty("Susi", "data")._name === "Sarah");
  console.log(g.getNeighborWithMaxProperty("Fritz", "data")._name === "Sarah");
  console.log(g.getNeighborWithMinProperty("Fritz", "data")._name === "Susi");

  console.log(g.getVertexWithMinPropertyEdge("Fritz", "influence")._name === "Sarah");
  console.log(g.getVertexWithMaxPropertyEdge("Susi", "influence")._name === "Fritz");
}


module.exports = Graph;

if (require.main === module) {
    test();
}
