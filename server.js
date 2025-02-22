// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const lodash = require('lodash');
const app = express();
// port = 9010


//load the quotes JSON
const quotes = require("./quotes.json");



// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Olha's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes", (request, response) => {
  // console.log(request.query.quote)
  response.send(quotes)

})

app.get("/quotes/random", (request, response) => {
  // console.log(request.query.quote)
  response.send(lodash.sample(quotes))
})

app.get("/quotes/search", (request, response) => {
  let word = request.query.terms
  response.send(searchTheQuote(quotes, word))
})


app.get("/echo", (req, res) => {
  let word = req.query.word
  res.send("you just said " + word)
})
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
// function pickFromArray(arr) {
//   // return arr[Math.floor(Math.random() * arr.length)];

// }

function searchTheQuote(arr, term) {
  return arr.filter(item =>
    item.quote.toLowerCase().includes(term.toLowerCase())
  )
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// app.listen(port, () => {
//   console.log("Your app is listening on port " + port);
// })
