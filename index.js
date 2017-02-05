var fs = require('fs');
var http = require('http');
var cnn = require('neural-now-cnn');

function getOptions (id) {
  return {
    host: "api.neuralnow.com",
    port: 80,
    path: "/neuralnetwork/" + id,
  }
}

var NeuralNow = {
  get: function (id, callback) {
    function _get () {
      var options = getOptions(id);
      http.get(options, function (resp) {

        var chunks = "";
        resp.on('data', function (chunk) {
          chunks += chunk;
        });

        resp.on('end', function () {
          var json = JSON.parse(chunks);
          var net = new cnn.net();
          net.fromJSON(json);
          net.name = json.name;
          net.outputClasses = json.outputClasses;
          callback(net);

          fs.writeFile(netPath, JSON.stringify(json), function (err) {
            if (err) {
              console.log("Error saving file: " + err.message);
              return;
            }
          });

        });
      }).on("error", function (err) {
        console.log("Error connecting to Neural Now: " + err.message);
      });
    }

    var netPath = __dirname + "/models/" + id + ".json";
    if (fs.existsSync(netPath)) {
      fs.readFile(netPath, function (err, data) {
        if (err) {
          console.log("Error reading Neural Net file:" + err.message);
          return;
        }

        var net = new cnn.net();
        try {
          net.fromJSON(JSON.parse(data));
          callback(net);
        } catch (err) {
          _get();
        }
      });
      return;
    }

    _get();
  },

  parseOutput: function (net, output) {
    var result = [];
    if (output.length > 0 && net.outputClasses.length > 0) {
      for (var i = 0; i < output.length; i++) {
        result.push({
          class: net.outputClasses[i],
          prediction: output[i],
        });
      }
      // descending
      result.sort(function (a, b) {
        return b.prediction - a.prediction;
      });
      return result;
    } else {
      return output;
    }
  },
}

module.exports = NeuralNow;
