const express = require('express');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');
const {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('./controllers/photoControllers');
const {
  getAboutPage,
  getAddPage,
  getEditPage,
} = require('./controllers/pageControllers');



// connect DB
mongoose
  .connect('mongodb://localhost/pcat-test-db')
  .then(() => {
    console.log('CONNECTED DB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

//ROUTES
app.get('/', getAllPhotos);
app.get('/photos/:id', getPhoto);
app.post('/photos', createPhoto);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);

app.get('/photos/edit/:id', getEditPage);
app.get('/about', getAboutPage);
app.get('/add', getAddPage);

// 404 - Bilinmeyen sayfa için middleware
app.use((req, res) => {
  res.status(404).send('HATA'); // Bilinmeyen bir sayfa istenirse bu çalışır
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
