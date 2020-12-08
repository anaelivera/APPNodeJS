const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Funcion que define como van a lucir los datos en la BD

const contactosSchema = new Schema ({
    nombre: String,
    email: String,
    telefono: Number
}); 

//exportar metodo model para utilizarlo en otros archivos
module.exports = mongoose.model('contacto', contactosSchema); //Metodo model para tomar el schema y utilizarlo para guardar datos dentro de la coleccion 'contacto'
