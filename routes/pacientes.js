var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

/* Seleccionar pacientes*/
router.get('/', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('pacientes', {pacientes: results, opcion: 'disabled', estado: true});
    }
  });
});


// Agregar pacientes

router.get('/agregar-pacientes', (req, res) => {
  res.sendFile('registro-pacientes.html', { root: 'public' });
})

router.post('/agregar', (req, res) => {
  const id = req.body.cedula;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  const especialidad = req.body.especialidad;
  connection.query(`INSERT INTO pacientes (id, nombre, edad, telefono, especialidad) VALUES (${id},'${nombre}',  ${edad}, ${telefono}, '${especialidad}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})

// Actualizar pacientes

router.get('/activar', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('pacientes', { pacientes: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const nombre = req.body.nombre;
  //const nombre_duenio = req.body.duenio;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`UPDATE pacientes SET nombre='${nombre}', edad=${edad}, telefono=${telefono} WHERE id=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})

// Eliminar pacientes

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  connection.query(`DELETE FROM pacientes WHERE id=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución" + error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})


module.exports = router;
