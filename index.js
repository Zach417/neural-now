var http = require('http');
var cnn = require('neural-now-cnn');

var NeuralNow = {
  get: function (id, callback) {
    var options = {
      host: "api.neuralnow.com",
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
        var net = new cnn.net();
        net.fromJSON(json);
        callback(net);
      });
    }).on("error", function (err) {
      console.log("Error connecting to Neural Now: " + err.message);
    });
  }
}

module.exports = NeuralNow;
