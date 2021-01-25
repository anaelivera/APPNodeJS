//Alumna: Anaelí Vera Ferández
//Clase: Ingeniería y Desarrollo en la Web

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'); //utiliza el modulo bcryptjs instalado. Este toma un string y lo devuelve cifrado.
const { JsonWebTokenError } = require('jsonwebtoken');

const userSchema = new Schema({
    username: String,
    correo: String,
    password: String,
});


// Para encriptar, pero no funciono
//userSchema.methods.encriptarPassword = async (password) => {
    //const salt = await bcrypt.genSalt(10); //genSalt es una funcion de bcrypt que aplica un hash (10) veces.
    //bcrypt.hash(password, salt);//convierte el password a hash
//}

//Validar el password, si estuviera encriptado
//userSchema.methods.validarPassword = function (password){ //la funcion recibe el password.
  //  return bcrypt.compare(password, this.password);
//};

module.exports = model('User', userSchema);

