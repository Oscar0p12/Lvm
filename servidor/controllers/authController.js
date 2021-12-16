const Usuario=require('../models/Usuario')
const bcryptjs= require ('bcryptjs')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')

exports.autenticarUsuario=async(req,res)=>{
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        //return res.status(400).json({errores:errores.array()})
    }

    const {nombre,password}=req.body;

    try{
        let usuario= await Usuario.findOne({nombre})
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }

        const passCorrecto=await bcryptjs.compare(password,usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'password incorrecto'})
        }

        const payload = {
            usuario:{
                id:usuario.id
            }
        
        }

        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(error,token)=>{
            if(error)throw error;
            res.json({token})
        })




    }catch(error){
        console.log(error);
    }

}

exports.usuarioAutenticado=async(req,res)=>{
    try{
        const usuario=await Usuario.findById(req.usuario.id);
        res.json({usuario})
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'hubo un error'})
    }
}