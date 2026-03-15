const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors()); // Esto permite que tu frontend lea los datos del backend

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde el Backend! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Render asigna puertos dinámicos

app.use(cors());


// 1. DEFINIR EL SCHEMA (Esto faltaba)
const SaludoSchema = new mongoose.Schema({
  texto: String
});
const Saludo = mongoose.model('Saludo', SaludoSchema);

// 2. CONECTAR A MONGO
const mongoURL = process.env.MONGO_URL || 'mongodb://db:27017/holamundo';
mongoose.connect(mongoURL)
  .then(() => console.log('✅ Conectado a MongoDB...'))
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// 3. RUTAS
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde el Backend! 🚀');
});

// Ruta que busca el saludo en la DB (Asegúrate que coincida con el fetch del HTML)
app.get('/saludo', async (req, res) => {
  try {
    const saludoDB = await Saludo.findOne();
    res.send(saludoDB ? saludoDB.texto : "No hay saludos en la DB aún");
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


