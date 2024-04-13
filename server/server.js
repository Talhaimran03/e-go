// server/server.js

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

https.createServer(options, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}/`);
});

