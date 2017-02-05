var NeuralNow = require('../../index.js');
var NeuralNowUtils = require('neural-now-utils');
NeuralNow.get('image-classification-20', function (net) {
  NeuralNowUtils.Image.resizeToVector({
    size: [224, 224, 3], // 224 (width) x 224 (height) x 3 (RGB)
    path: __dirname + "/test.jpg", // set input values here
    callback: function (vector) {
      var output = NeuralNow.parseOutput(net, net.forward(vector).w);
      console.log(output);
    },
  });
});
