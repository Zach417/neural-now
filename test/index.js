var NeuralNow = require('../index');
var NeuralNowUtils = require('neural-now-utils');
NeuralNow.get('spam-classifier', function(neuralNet) {
    var text = "Check out this crazy offer at notarealwebsite.com/malware"; // set input values here
    var input = NeuralNowUtils.Text.toBigramVector(text);
    var output = neuralNet.forward(input).w;
    console.log(output);
});
