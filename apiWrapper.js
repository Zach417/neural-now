var http = require('http');
var request = require('request');

function apiWrapper () {
  this.host = "api.neuralnow.com";
  this.port = 80;

  this.get = function (path, callback) {
    var options = {};
    options.path = path;
    options.host = this.host;
    options.port = this.port;

    if (body) {
      options.headers["Content-Length"]
    }

    http.get(options, function (resp) {
      var chunks = "";
      resp.on('data', function (chunk) {
        chunks += chunk;
      });
      resp.on('end', function () {
        callback(JSON.parse(chunks));
      });
    }).on("error", function (err) {
      console.log("Error connecting to Neural Now: " + err.message);
      callback(err);
    });
  }

  this.post = function (path, body, callback) {
    request({
      url: "http://" + this.host + path,
      method: "POST",
      json: body,
    }, function (err, message, response) {
      if (err) {
        console.log("Error connecting to Neural Now: " + message);
        return callback();
      }

      callback(response);
    });
  }
}

module.exports = apiWrapper;
