const express = require('express');
const bodyParser = require('body-parser');
// Set up the express app
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.get('*', (req, res) => {
  const data = returnReq(req.body);
  res.status(200).send({
    response: data
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(400).send({error: 'Could not decode request: JSON parsing failed'})
})

function returnReq(reqStr) {
  var result = [];
  for(var i = 0; i < reqStr.payload.length; i++) {
    if (reqStr.payload[i]['drm'] && reqStr.payload[i]['episodeCount']) {
      if (reqStr.payload[i].drm == true && reqStr.payload[i].episodeCount > 0) {
       result.push({image: reqStr.payload[i].image.showImage, slug: reqStr.payload[i].slug, title: reqStr.payload[i].title});
      }
    }
  }
  return result;
}