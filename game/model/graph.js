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

  getVertex: function(name) {
      return this._vertices[name];
  },

  getEdge: function(from, to) {
      console.log(this._edges);
      return this._edges[from][to];
  },

  addVertex: function(name, data) {
    this._vertices[name] = new Vertex(name, data);
  },

  addEdge: function(from, to, data) {
      if (!this._edges.hasOwnProperty(from))
      {
          this._edges[from] = {};
      }
    this._edges[from][to] = new Edge(from, to, data);
    this._vertices[from].addEdges(this._edges[from][to]);
  },

  getVertexWithMaxProperty: function(property, dataset) {
    // naive way
    var vertex   = undefined;
    var maxValue = undefined;

    if (dataset == undefined) {
        dataset = this._vertices;
    }

    for (var key in dataset) {
        if (dataset[key]._data != undefined &&
            (dataset[key]._data[property] > maxValue || maxValue == undefined)) {
          vertex   = dataset[key];
          maxValue = vertex._data[property];
        }
    }

    return vertex;
  },

  getVertexWithMinProperty: function(property, dataset) {
    // naive way
    var vertex   = undefined;
    var minValue = undefined;

    if (dataset == undefined) {
        dataset = this._vertices;
    }

    for (var key in dataset) {
        if (dataset[key]._data != undefined &&
            (minValue == undefined || dataset[key]._data[property] < minValue)
           ) {
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
  g.addVertex('HAL9000');
  g.addEdge("Susi",  "Sarah" , {influence: 5});
  g.addEdge("Susi",  "Fritz" , {influence: 10});
  g.addEdge("Fritz", "Susi"  , {influence: 20});
  g.addEdge("Fritz", "Sarah" , {influence: 10});
  g.addEdge("HAL9000", "Fritz");

  console.log(g.getVertexWithMaxProperty("data")._name === "Sarah");
  console.log(g.getVertexWithMinProperty("data")._name === "Susi");
  console.log(g.getNeighborWithMinProperty("Susi", "data")._name  === "Fritz");
  console.log(g.getNeighborWithMaxProperty("Susi", "data")._name  === "Sarah");
  console.log(g.getNeighborWithMaxProperty("Fritz", "data")._name === "Sarah");
  console.log(g.getNeighborWithMinProperty("Fritz", "data")._name === "Susi");
  console.log(g.getVertexWithMinPropertyEdge("Fritz", "influence")._name === "Sarah");
  console.log(g.getVertexWithMaxPropertyEdge("Fritz", "influence")._name === "Susi");
  console.log(g.getVertexWithMinPropertyEdge("Susi", "influence")._name  === "Sarah");
  console.log(g.getVertexWithMaxPropertyEdge("Susi", "influence")._name  === "Fritz");
  console.log(g.getVertexWithMaxPropertyEdge("HAL9000", "influence") == undefined);
  console.log(g.getVertexWithMinPropertyEdge("HAL9000", "influence") == undefined);

}


module.exports = Graph;

if (require.main === module) {
    test();
}
