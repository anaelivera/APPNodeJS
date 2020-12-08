const path = require('path');
const express = require('express');
const morgan = require('morgan'); //Utilizar modulo morgan
const mongoose = require('mongoose');

const app = express(); //Inicializar express

//Conectar base de datos
mongoose.connect('mongodb://localhost/directorio') //Nombre de la base de datos: directorio
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

// Importar rutas
const indexRutas = require('./rutas/index'); //Importar archivo index.js en la carpeta rutas

// Configuracion del servidor
app.set('port', process.env.PORT || 3000); //Definir puerto, si no hay puerto definido, utilizar el 3000
app.set('views', path.join(__dirname, 'vistas')); //Indica en donde esta la carpeta vistas utilizando path
app.set('view engine', 'ejs'); //Indica que se va a utilizar el motor de plantilla ejs

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Para que el servidor entienda los datos ingresados en el formulario

// Rutas
app.use('/', indexRutas); //Utilizar las rutas indicadas en indexRutas

// Inicializar servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

