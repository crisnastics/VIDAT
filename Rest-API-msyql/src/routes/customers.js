const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//leer todos los demandantes
router.get('/demandante',(req,res)=>{
  mysqlConnection.query('SELECT * FROM demandante', (err, rows, fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
});

//leer todos los oferentes
router.get('/oferente',(req,res)=>{
  mysqlConnection.query('SELECT * FROM oferente', (err, rows, fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
});

//leer demandante por id
router.get('/demandante/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM demandante WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//leer fecha por id oferente
router.get('/fechas/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM fecha WHERE oferente_id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//leer los horarios de los oferentes
router.get('/fechas/:id/:fecha_pass', (req, res) => {
  const { id, fecha_pass } = req.params;
  mysqlConnection.query('SELECT * FROM fecha WHERE (oferente_id, ano_mes_dia) = (?,?)', [id,fecha_pass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//leer las horas por su id
router.get('/horas_has_fecha/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM horas_has_fecha WHERE fecha_id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//leer oferente por id
router.get('/oferente/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM oferente WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//leer horario por id
router.get('/horas/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM horas WHERE idhoras = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//agregar demandante
router.post('/demandante', (req, res) => {
    const { id, name, email, password, photoURL } = req.body;
    mysqlConnection.query('INSERT INTO demandante SET ? ',
      {
        id,
        name,
        email,
        password,
        photoURL
      }, (err, rows, fields) => {
      if(!err) {
        res.json({status: 'demandante Saved'});
      } else {
        console.log(err);
      }
    });
  });

//leer solicitud
router.get('/solicitud/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM solicitud WHERE demandante_id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//agregrar solicitud
router.post('/solicitud', (req, res) => {
    const { idSolicitud, fecha, estado, demandante_id, oferente_id, visible, direccion, horario } = req.body;
    mysqlConnection.query('INSERT INTO solicitud SET ? ',
      {
        idSolicitud,
        fecha,
        estado,
        demandante_id,
        oferente_id,
        visible,
        direccion,
        horario
      }, (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Solicitud Saved'});
      } else {
        console.log(err);
      }
    });
  });

//actualizar por demandante
router.put('/demandante/:id', (req, res) => {
  var post = [];
  var type = [];
  const {id} = req.params;
  const {name, email, password, photoURL } = req.body;

  if(email != undefined){
    type.push('email')
    post.push(email)
  };
  if(name != undefined){
    type.push('name')
    post.push(name)
  };
  if(password != undefined){
    type.push('password')
    post.push(password)
  };
  if(photoURL != undefined){
    type.push('photoURL')
    post.push(photoURL)
  };
  post.push(id);
  mysqlConnection.query('UPDATE demandante SET '+ type[0] +' = ? WHERE id = ?', post, (err, rows, fields) => {
      if(!err) {
        res.json({status: 'demandante Updated'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
