const express = require('express');
var http = require("http");

const app = express();

app.use(express.static('./dist/space-bear-web'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/space-bear-web' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)

