var NeuralNow = require('../index');
var NeuralNowUtils = require('neural-now-utils');
NeuralNow.get('spam-classifier', function(net) {
    var text = "wats up jim"; // set input values here
    var input = NeuralNowUtils.Text.toBigramVector(text);
    var output = net.forward(input);
    console.log(output);
});
