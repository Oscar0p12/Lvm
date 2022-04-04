import React,{useContext} from 'react'
import AutContext from '../../Context/Autenticacion/autContext'


const Barra=()=>{

    //Extraer funcion cierre de sesion
    const AutContexts=useContext(AutContext)
    const {cerrarSesion}=AutContexts
    
    return(

        <header className='app-header'>

            <p className='nombre-usuario'> Laboratorio de control </p>

            <nav className='nav-principal'>

                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={()=>cerrarSesion()}
                >Cerrar Sesion</button>

            </nav>
        
        </header>

    )
}

export default Barra;