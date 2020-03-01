const express = require('express');
const sever = express();
const path = require('path');
const port = process.env.PORT || 8080;

const pathToBuildDir = path.resolve(__dirname, '../build');

sever.use(express.static(pathToBuildDir));

sever.get('*', (req, res) => {
  const indexPath = path.join(pathToBuildDir, 'index.html');

  res.sendFile(indexPath);
});

sever.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}`)
);
