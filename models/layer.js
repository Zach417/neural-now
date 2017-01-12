var nj = require('numjs');

function Layer() {
  this.size = 0;
  this.activation;

  this.z; //
  this.a; // activation function of z

  this.activate = function (z) {
    if (!this.activation) {
      throw "Activation function has not been set for this layer";
    }

    var a = z.tolist();
    var zlist = z.tolist();
    for (var i = 0; i < zlist.length; i++) {
      for (var j = 0; j < zlist[i].length; j++) {
        a[i][j] = this.activation(zlist[i][j]);
      }
    }

    return nj.array(a);
  }

  this.setActivation = function (af, afp) {
    if (typeof af === "function") {
      this.activation = af;
    } else if (typeof af === "string") {
      this.activation = this.deriveActivation(af);
    } else {
      throw "Activation must be of type function or string";
    }
  }

  this.deriveActivation = function (af) {
    switch (af) {
      case "sigmoid":
        return function (x) {
          return 1 / (1 + Math.exp(-x));
        }
      case "linear":
        return function (x) {
          return x;
        }
    }
  }
}

module.exports = Layer;
