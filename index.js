var http = require('http');
var NeuralNetwork = require('neural-network').NeuralNetwork;

var NeuralNow = {
  get: function (id, callback) {
    var options = {
      host: "localhost",
      port: 80,
      path: "/neuralnetwork/" + id
    }

    http.get(options, function (resp) {
      var chunks = "";

      resp.on('data', function (chunk) {
        chunks += chunk;
      });

      resp.on('end', function () {
        var json = JSON.parse(chunks);
        var neuralNetwork = new NeuralNetwork();
        neuralNetwork.generate(json);
        callback(neuralNetwork);
      });
    }).on("error", function (err) {
      console.log("Error connecting to Neural Now: " + err.message);
    });
  }
}

module.exports = NeuralNow;
