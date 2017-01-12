var nj = require('numjs');
var Layer = require('./layer');

function NeuralNetwork () {
  this.input = new Layer();
  this.hidden = []; // array of layers
  this.output = new Layer();
  this.weights = []; // array of matrices (weights)

  this.generate = function (json) {
    // input layer
    this.input.size = json.input.size;
    this.input.setActivation(json.input.activation);

    // hidden layer
    this.hidden = [];
    for (var i = 0; i < json.hidden.length; i++) {
      var layer = new Layer();
      layer.size = json.hidden[i].size;
      layer.setActivation(json.hidden[i].activation);
      this.hidden.push(layer);
    }

    // output layer
    this.output.size = json.output.size;
    this.output.setActivation(json.output.activation);

    // weights
    this.weights = [];
    for (var i = 0; i < json.weights.length; i++) {
      var w = nj.array(json.weights[i]);
      this.weights.push(w);
    }
  }

  this.forward = function (x) {
    var z = nj.array(x);
    var a = nj.array(x);

    for (var i = 0; i < this.hidden.length; i++) {
      z = a.dot(this.weights[i]);
      a = this.hidden[i].activate(z);
      this.hidden[i].z = z;
      this.hidden[i].a = a;
    }

    this.output.z = a.dot(this.weights[this.weights.length - 1]);
    this.yHat = this.output.activate(this.output.z);
    return this.yHat.tolist();
  }
}

module.exports = NeuralNetwork;
