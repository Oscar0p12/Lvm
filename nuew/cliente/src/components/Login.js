import React,{useContext, useState,useEffect} from 'react'
import AutContext from '../Context/Autenticacion/autContext';
import AlertaContext from '../Context/Alertas/alertaContext';



const Login=(props)=>{

    const AutContexts=useContext(AutContext)
    const {iniciarSesion,autenticado,mensaje,inicioUsuairo,loginn}=AutContexts

    const AlertaContexts=useContext(AlertaContext)
    const {alerta,mostrarAlerta}=AlertaContexts

    if (loginn===null){
        inicioUsuairo()}
    
    
        
    
    
    useEffect(() => {
        if(autenticado){
            props.history.push('/laboratorio')
        }
       if(mensaje){
           mostrarAlerta(mensaje.msg,mensaje.categoria)
       }
       if (loginn==='no'){
        mostrarAlerta('Usuario conectado1','alerta-error')
        console.log(123)
        }

    }, [mensaje,autenticado,props.history,loginn])


    const[usuario,guardarUsuario]=useState({
        nombre:'',
        password:''
    })

    const {nombre,password}=usuario;

    const onChange=e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{
        e.preventDefault();
        
        
        inicioUsuairo()
        if (loginn==='no'){
        mostrarAlerta('Usuario conectado2','alerta-error')
        return 
        }
 

        if (nombre.trim()===''|| password.trim()===''){
          mostrarAlerta('Todos los campos son obligatorios','alerta-error')
          return   
        }        
        iniciarSesion({nombre,password})
    }

    

    return(
    
        <div className='form-usuario'>

            {alerta?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>) :null}

            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>

        

                <form onSubmit={onSubmit}>
                    
                    <div className='campo-form'>
                        <label html='nombre'>Usuario: </label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Usuario'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label html='password'>Contraseña: </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Contraseña'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block'
                                value='Iniciar Sesión'/>

                    </div>
     
                </form>
     
            </div>

        </div>
    
    
    )
}

export default Login;