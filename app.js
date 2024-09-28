const express = require('express');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/photos/:id', async (req, res) => {
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo',{photo});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

// 404 - Bilinmeyen sayfa için middleware
app.use((req, res) => {
  res.status(404).send('HATA'); // Bilinmeyen bir sayfa istenirse bu çalışır
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
