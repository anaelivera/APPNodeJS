//Alumna: Anaelí Vera Ferández
//Clase: Ingeniería y Desarrollo en la Web

const { Router } = require('express');
const routerUser = Router();

const jwt = require('jsonwebtoken'); //modulo para crear el token
const config = require('../configAuth');//Archivo donde esta configurado el secret

const User = require('../models/usuarios');

//SIGNUP
routerUser.post('/api/signup', async (req, res, next) => {
    const { username, correo, password } = req.body;
    const user = new User ({
        username: username,
        correo: correo, 
        password: password
    });
    //user.password = await user.encriptarPassword(user.password);//utilizar metodo encriptarPassword desde la instancia (user) modelo User para cifrar el password y guardarlo en el mismo lugar (user.password)
    await user.save();
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24 //token expira en un dia
    })
    res.json({auth: true, token: token})
});

// PROFILE
routerUser.get('/api/profile', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
       return res.status(401).json({
           auth: false,
           message: 'Sin Token'
        });
    }

    const decoded = jwt.verify(token, config.secret); //verificar y decodificar el token
    const user = await User.findById(decoded.id, {password: 0}); //para que muestre la informacion del usuario, sin el password
    if (!user) {
        return res.status(404).send('El usuario no fue encontrado');
    }

    res.json(user)
});

// LOGIN
routerUser.post('/api/login', async (req, res, next) => {
    const { correo, password } = req.body;
    const user = await User.findOne({correo: correo});
    if (!user) {
        return res.status(404).send('Ingresa un correo valido');
    }
    const pass = await User.findOne({password: password});
    if (!pass) {
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, { //si las credenciales son correctas, genera un token
        expiresIn: 60 * 60 * 24
    });
    res.json({auth: true, token});
});



module.exports = routerUser;



