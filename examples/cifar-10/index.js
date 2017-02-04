var NeuralNow = require('../../index.js');
var NeuralNowUtils = require('neural-now-utils');

NeuralNow.get('cifar-10', function(neuralNet) {
  NeuralNowUtils.Image.resizeToVector({
    size: [32, 32, 3],
    path: __dirname + "/test.jpg", // set input values here
    callback: function (vector) {
      var output = neuralNet.forward(vector).w;
      console.log(output);
    },
  });
});
