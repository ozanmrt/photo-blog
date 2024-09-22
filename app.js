const express = require('express');

const app = express();

app.use(express.static('public'));

const photo = {
  id: 1,
  name: 'Photo Name',
  description: 'Photo Description',
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/temp/index.html');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
