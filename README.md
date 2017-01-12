# Neural Now
Online neural network sharing and hosting. Deploy someone else's trained neural network in seconds.

The next Mark Zuckerberg won't build Facebook. He or she will probably build a really cool personal robot that can take my dog out to go pee while I'm at work. Neural Now is a tool to make it as easy as possible for the dorm room hacker to build the next wave of AI-powered tooling and services.

# Installation
After you've installed node.js, install Neural Now with the following npm command.
```sh
$ npm i neural-now
```
To deploy your first neural net, use the `NeuralNow.get()` function.
```js
var NeuralNow = require('neural-now');
NeuralNow.get("test", function(neuralNet) {
    var input = [0,1,0];
    var output = neuralNet.forward(input);
    console.log(output);
});
```
Any public neural network on Neural Now can be deployed by replacing `"test"` in the above snippet with the appropriate `id` of the network. Of course, don't forget that the `input` array must match the neural network's specifications and the `output` array will vary from network to network!

# How does it work?
The function `NeuralNow.get()` makes a request to `https://neural-now.io/api/:id`, which responds with a json object describing the neural network `:id`.

This is the JSON object response used in the example above.
```json
{
  "name": "test",
  "input": {
    "size": 3,
    "activation": "linear",
  },
  "hidden": [{
    "size": 3,
    "activation": "sigmoid",
  }],
  "output": {
    "size": 1,
    "activation": "sigmoid",
  },
  "weights": [[[1,1,1],[1,1,1],[1,1,1]],[[1],[1],[1]]]
}
```

This information is used to generate the neural network on the client for purposes of propagating user-defined inputs.

The generated neural network is passed as a parameter of the callback function in `NeuralNow.get()`, which I've defined as `neuralNet` in the example below.
```js
NeuralNow.get("test", function(neuralNet) {

});
```

The `neuralNet` parameter of the callback function contains information about the neural network as well as a `forward()` function, which propagates data through the network. The `input` array below is defined by the user and must match the size of the input layer of the neural network.
```js
NeuralNow.get("test", function(neuralNet) {
    var input = [[0,1,0]];
    var output = neuralNet.forward(input);
    console.log(output);
});
```

The size of the layers of each network can be used by checking the related attributes of the `neuralNet` object. These attribute values will vary from network to network.

`neuralNet.input`
```js
console.log(neuralNet.input);
```
```sh
{
    size: 3,
    activation: function (x) {
        return x;
    }
}
```
