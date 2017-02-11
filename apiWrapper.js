var http = require('http');
var request = require('request');
var $ = require('jquery');

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");

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
    var url = "http://" + this.host + path;
    var method = "POST";

    if (isBrowser()) {
      $.ajax({
          url: url,
          type: method,
          contentType: "application/json",
          data: JSON.stringify(body),
          dataType: 'json',
          success: function(data) {
            callback(data);
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log("XHR Status:", xhr.status);
            console.log("Thrown Error:", thrownError);
          }
      });
    } else {
      request({
        url: url,
        method: method,
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
}

module.exports = apiWrapper;
