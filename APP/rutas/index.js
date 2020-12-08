const express = require('express');
const router = express.Router(); //Se utiliza el modulo router

const Task = require('../models/contactos');

//Ruta de lo que se muestra en el navegador
router.get('/',  async (req, res) => {
    const nuevo = await Task.find(); //para que los datos ingresados se muestren en el navegador
    console.log(nuevo);
    res.render('index', {
        nuevo
    }); 
});

//Ruta del botón agregar
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/'); //redireccionar al inicio
});

//Rutas del botón editar
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params; //Recibo el id
    const task = await Task.findById(id); //Busca por id
    res.render('editar', { //renderizar la vista "editar" y pasar el task
        task
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params; //Recibo el id
    await Task.update({_id: id}, req.body); //Encontrar el id y remplazarlo por la nueva informacion del body
    res.redirect('/');
})

//Ruta del botón eliminar
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

module.exports = router; //Exportar modulo router