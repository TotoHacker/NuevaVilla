const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '192.168.0.8',
  user: 'root',
  password: '',
  database: 'FlowerShield'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
  const { nombre, UsuoCorr, contraseña } = req.body;
  const form = 0; // Por defecto, el formulario no se ha completado

  const sql = 'INSERT INTO usuario (nombre, UsuoCorr, contraseña, form) VALUES (?, ?, ?, ?)';
  connection.query(sql, [nombre, UsuoCorr, contraseña, form], (err, result) => {
    if (err) {
      console.error('Error al registrar usuario: ' + err.message);
      res.status(500).send('Error interno del servidor');
      return;
    }
    console.log('Usuario registrado con éxito');
    res.status(200).send('Usuario registrado con éxito');
  });
});
// Ruta para manejar el inicio de sesión de usuarios
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'SELECT * FROM usuario WHERE UsuoCorr = ? AND contraseña = ?';
    connection.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error('Error al iniciar sesión: ' + err.message);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      if (result.length > 0) {
        // Las credenciales son válidas, iniciar sesión correctamente
        res.status(200).send('Inicio de sesión exitoso');
      } else {
        // Las credenciales son inválidas, responder con un error
        res.status(401).send('Credenciales incorrectas');
      }
    });
  });
  // Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    // Consulta SQL para seleccionar todos los usuarios
    const sql = 'SELECT * FROM usuario';
    
    // Ejecutar la consulta SQL
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener usuarios: ' + err.message);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      // Enviar los usuarios como respuesta
      res.status(200).json(result);
    });
  });
  // Ruta para manejar el registro de formularios
app.post('/formulario', (req, res) => {
  const { enfermedad, sintoma, fecha, grado, observacion, tratamiento } = req.body;

  const sql = 'INSERT INTO formulario (enfermedad, sintoma, fecha, grado, observacion, tratamiento) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [enfermedad, sintoma, fecha, grado, observacion, tratamiento], (err, result) => {
    if (err) {
      console.error('Error al registrar formulario: ' + err.message);
      res.status(500).send('Error interno del servidor');
      return;
    }
    console.log('Formulario registrado con éxito');
    res.status(200).send('Formulario registrado con éxito');
  });
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en la dirección http://192.168.0.8:${port}`);
});
