const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde el Backend! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


const mongoose = require('mongoose');

// "db" será el nombre que le daremos al contenedor de la base de datos en Docker
mongoose.connect('mongodb://db:27017/holamundo')
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definimos qué datos queremos guardar
const SaludoSchema = new mongoose.Schema({
  texto: String
});

const Saludo = mongoose.model('Saludo', SaludoSchema);