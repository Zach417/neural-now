var NeuralNow = require('../index.js');
NeuralNow.get("sine", function (neuralNet) {
  var input = [[0],[3.14],[1]]
  var output = neuralNet.forward(input);
  console.log(output);
});
