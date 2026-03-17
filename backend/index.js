const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Definición del Modelo (Schema)
const SaludoSchema = new mongoose.Schema({
  texto: String
});
const Saludo = mongoose.model('Saludo', SaludoSchema);

// 2. Conexión a la Base de Datos
const mongoURL = process.env.MONGO_URL || 'mongodb://db:27017/holamundo';
mongoose.connect(mongoURL)
  .then(async () => {
    console.log('✅ Conectado a MongoDB...');
    
    // Opcional: Crear un saludo inicial si la DB está vacía
    const existe = await Saludo.findOne();
    if (!existe) {
      await Saludo.create({ texto: "¡Hola Mundo desde la base de datos en Render! 🚀" });
      console.log('🌱 Saludo inicial creado');
    }
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// 3. Rutas
app.get('/', (req, res) => {
  res.send('Servidor activo. Usa /saludo para ver los datos.');
});


// Ruta para obtener TODOS los saludos
app.get('/saludos', async (req, res) => {
  try {
    const lista = await Saludo.find().sort({ _id: -1 }); // Los más nuevos primero
    res.json(lista); // Enviamos un array JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener saludos" });
  }
});


// Ruta para recibir y guardar un nuevo saludo
app.post('/nuevo', async (req, res) => {
  try {
    const nuevoTexto = req.body.texto;
    
    // Guardamos en MongoDB usando el modelo que ya definimos
    const saludo = new Saludo({ texto: nuevoTexto });
    await saludo.save();
    
    res.send('✅ Saludo guardado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Error al guardar');
  }
});


// 4. Encendido
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
