var NeuralNow = require('../index');
var NeuralNowUtils = require('neural-now-utils');

NeuralNow.get('spam-classifier', function(neuralNet) {
    var text = "Check out this crazy offer at notarealwebsite.com/malware"; // set input values here
    var input = NeuralNowUtils.Text.toBigramVector(text);
    var output = neuralNet.forward(input).w;
    console.log(output);
});

NeuralNowUtils.Image.resizeToVector({
  size: [256, 256, 3],
  path: __dirname + "/test.png",
  callback: function (vector) {
    NeuralNow.compute('open_nsfw', vector, function (output) {
      console.log(output);
    });
  },
});
