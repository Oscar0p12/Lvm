const Usuario=require('../models/Usuario')
const bcryptjs= require ('bcryptjs')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')

exports.crearUsuario= async(req,res)=>{

    //Valida si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

    //Extrae datos de usuarios
    const {nombre,password,ingreso}=req.body
    
    try{

        let usuario;

        //Crea nuevo usuario
        usuario=new Usuario(req.body);


        //Encripta el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash(password,salt)
        
        //Guarda usuario
        await usuario.save(); 

        //Crea y firma el JWT
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
        console.log(error)
        res.status(400).send('hubo un error')
    }
}

exports.actualizarIngreso=async (req,res)=>{
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    const {ingreso}=req.body
    console.log(req.body)
    
    const nuevoIngreso={}

    if(ingreso){
         nuevoIngreso.ingreso=ingreso
    }

    try {
        let usuario= await Usuario.findById(req.params.id)

        if(!usuario){
            return res.status(404).json({msg:'Usuario no encontrado'})
        }

        usuario= await Usuario.findByIdAndUpdate({_id:req.params.id},{$set:nuevoIngreso},{new:true})


    

        res.json({usuario})
       
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }

}

exports.inicioUsuario=async(req,res)=>{
    try{
        let usuario= await Usuario.findById('61d73b2728ce3137d1a09e3d')
        res.json({usuario})
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'hubo un error'})
    }
}


