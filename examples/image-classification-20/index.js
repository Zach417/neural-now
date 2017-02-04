var NeuralNow = require('../../index.js');
var NeuralNowUtils = require('neural-now-utils');
NeuralNow.get('image-classification-20', function(neuralNet) {
    var pathName = __dirname + "/test.jpg"; // set input values here
    var input = NeuralNowUtils.Image.resizeToVector(224, 224, pathName);
    var output = neuralNet.forward(input).w;
    console.log(output);
});
