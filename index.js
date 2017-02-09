var fs = require('fs');
var http = require('http');
var cnn = require('neural-now-cnn');
var wrapper = require('./apiWrapper');

var NeuralNow = {
  wrapper: new wrapper(),

  get: function (id, callback) {
    function _get () {
      var path = "/neuralnetwork/" + id;
      this.wrapper.get(path, function (net) {
        var json = JSON.parse(chunks);
        var net = new cnn.net();
        net.fromJSON(json);
        net.name = json.name;
        net.outputClasses = json.outputClasses;
        callback(net);

        if (!fs.existsSync(__dirname + "/models/")){
            fs.mkdirSync(__dirname + "/models/");
        }

        fs.writeFile(netPath, JSON.stringify(json), function (err) {
          if (err) {
            console.log("Error saving file: " + err.message);
            return;
          }
        });
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

  compute: function (id, input, callback) {
    var path = "/compute/" + id;
    this.wrapper.post(path, input, function (json) {
      callback(json);
    });
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
