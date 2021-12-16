//rutas para crear usuarios
const express=require('express')
const router= express.Router();
const usuarioController= require('../controllers/usuarioController')
const {check}=require('express-validator') 
const autController=require('../controllers/authController')
const auth= require('../middleware/auth')

router.post('/',
    // [
    //     check('nombre','Agregar usuario valido').not().isEmpty(),
    //     check('password','Debe tener minimo 6 caracteres').isLength({min:6})
    // ],
    autController.autenticarUsuario
);

router.get('/',
        auth,
        autController.usuarioAutenticado    
    );

module.exports=router;