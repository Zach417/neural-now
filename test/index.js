var NeuralNow = require('../index.js');
NeuralNow.get("test", function (neuralNet) {
  var input = [[0,1,0]]
  var output = neuralNet.forward(input);
  console.log(output);
});
