const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host:'189.197.187.187',
    user:'alumnos',
    password:'Alumnos1010$',
    database:'controlescolar',
});

//Insertar

app.post('/profesor/registrar', (req, res)=>{
    const { id, nombre, correo, direccion } = req.body;
    
    const sql = "INSERT INTO profesores VALUES(?,?,?,?)";
    db.query(sql, [id, nombre, correo, direccion], (err, result)=>{
        if(err) {
            res.status(300).send(err);
        }else {
            res.status(200).send(result)
        }
    });
});

//Modificar

app.put('/profesor/modificar/:id', (req, res)=>{
    const { id, nombre, correo, direccion } = req.body;
    
    const sql = "UPDATE profesores SET nombre=?, correo=?, direccion=? WHERE id=?";
    db.query(sql, [nombre, correo, direccion, id], (err, result)=>{
        if(err) {
            res.status(300).send(err);
        }else {
            res.status(200).send(result)
        }
    });
});

//Eliminar

app.delete("/profesor/eliminar/:id", (req, res)=>{
    const identificador = req.params.id;
    const sql = 'DELETE FROM profesores WHERE id = ?';
    db.query(sql, [identificador], (err, result)=>{
        if(err) {
            res.status(300).send(err);
        }else {
            res.status(200).send(result)
        }
    });
});

//Reportes

app.get("/profesores", (req, res)=>{
    const sql = 'SELECT * FROM profesores';
    db.query(sql, (err, result)=>{
        if(err) {
            res.status(300).send(err);
        }else {
            res.status(200).send(result)
        }
    });
});

//Consultas

app.get("/profesor/:nombre", (req, res)=>{
    const identificador = req.params.nombre;
    const sql = 'SELECT * FROM profesores WHERE nombre LIKE ?';
    db.query(sql, [identificador], (err, result)=>{
        if(err) {
            res.status(300).send(err);
        }else {
            res.status(200).send(result)
        }
    });
});

/*
app.get("/profesores", (req, res)=>{
    const respuesta = {
        "id":1,
        "nombre":"Dagoberto Fiscal",
        "correo":"dago@gmail.com",
        "direccion":"5 de Febrero"
    }
    res.status(200).send(respuesta);
});
*/

app.all("*", (req, res)=>{
    const respuesta ={
        "codigo":300,
        "mensaje":"La ruta no existe"
    }
    res.send(respuesta)
});

app.listen(port, ()=>{
    console.log("Escuchando en el puerto 4000");
});