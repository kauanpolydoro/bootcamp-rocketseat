const express = require('express');

const app = express();

app.listen(3333, () => {
  console.log('✔ Listen on port 3333');
});