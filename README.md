# Neural Now
Neural Now is a neural network sharing service that makes it possible to deploy someone else's trained neural network in seconds. It's by far the easiest way to leverage machine learning in your own tools and services.

This is how you can deploy an image classification model in under 10 lines of code.
```js
var NeuralNow = require('neural-now');
var NeuralNowUtil = require('neural-now-util');

NeuralNow.get("image-classification", function(neuralNet) {
    var image = NeuralNowUtil.image.fileToVector('dog.png');
    var prediction = neuralNet.forward(image);
    console.log(prediction);
});
```
```sh
>>> Dog
```
Neural Now currently supports deployment on Node.js and Python applications via npm and pip packages, with plans to develop C#, Java, and Swift libraries in the near future.
## Mission
My mission is to make it possible for the next Zuckerberg to build something profoundly useful.

The next Mark Zuckerberg won't build Facebook, according to Peter Theil. The world doesn't need another social network app. The next dorm room hacker will build a humanoid robot that cleans your house while you're at work or even a chat bot capable of filing your taxes. Whatever it is, it will require open access to state of the art AI, and I'm going to make sure they have it. Neural Now is a service that will power the next wave of Pages, Brins, and Zuckerburgs by giving them access to hundreds of neural networks, each trained to solve specific domain problems.

## Installation - Node.js
After you've installed Node.js, install Neural Now with the following npm command.
```sh
$ npm i neural-now
```
To deploy your first neural net, use the `NeuralNow.get()` function.
```js
var NeuralNow = require('neural-now');
NeuralNow.get("sine", function(neuralNet) {
    var input = Math.PI / 3;
    var output = neuralNet.forward(input);
    console.log(output);
});
```
```sh
>>> 0.86602540378
```
Any public neural network on Neural Now can be deployed by replacing `"sine"` in the above snippet with the appropriate `id` of the network. Of course, don't forget that the `input` must match the neural network's specifications and the `output` will also vary accordingly!

## Under the hood
The function `NeuralNow.get()` makes a request to `https://neuralnow.com/api/:id`, which responds with a json object describing the neural network `:id`.

This is the JSON object response used in the example above.
```json
{
  "name": "sine",
  "input": {
    "size": 1,
    "activation": "linear",
  },
  "hidden": [{
    "size": 6,
    "activation": "hyperbolic-tangent",
  }, {
    "size": 6,
    "activation": "hyperbolic-tangent",
  }, {
    "size": 6,
    "activation": "hyperbolic-tangent",
  }],
  "output": {
    "size": 1,
    "activation": "hyperbolic-tangent",
  },
  "weights": [[[1,1,1],[1,1,1],[1,1,1]],[[1],[1],[1]]]
}
```

This information is used to generate the neural network on the client for purposes of propagating user-defined inputs.

The generated neural network is passed as a parameter of the callback function in `NeuralNow.get()`, which I've defined as `neuralNet` in the example below.
```js
NeuralNow.get("sine", function(neuralNet) {

});
```

The `neuralNet` parameter of the callback function contains information about the neural network as well as a `forward()` function, which propagates data through the network. The `input` below is defined by the user and must match the size of the input layer of the neural network.
```js
NeuralNow.get("sine", function(neuralNet) {
    var input = Math.PI / 3;
    var output = neuralNet.forward(input);
    console.log(output);
});
```

The size of the layers of each network can be used by checking the related attributes of the `neuralNet` object. These attribute values will vary from network to network.
```js
console.log(neuralNet.input);
```
```sh
{
    size: 1,
    activation: function (x) {
        return x;
    }
}
```
# To Do List
1. Develop neural network submission page on web app with a playground-style engine to manipulate and display the network
2. Gather and submit trained neural networks that would be useful to most web developers -- image classification, text sentiment analysis, etc.
3. Add python support
4. Submit on Hacker News

# Neural Networks to Build
1. Predict whether a given user will become a paying customer, based on her activities during the first day/week/month.
2. Image to text parsing.
3. Support email classification: bug report, new feature request, etc.
4. Spam comment detection
