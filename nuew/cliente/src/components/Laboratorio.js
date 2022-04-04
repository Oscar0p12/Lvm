import React, { useContext } from 'react'
import BarraLateral from './Laboratorio/BarraLateral';
import Barra from './Laboratorio/BarraSuperior';
import Grafica from './Laboratorio/Grafica';
import LabContext from '../Context/LabContext';
import IdleTimerContainer from './Timer';
import AutContext from '../Context/Autenticacion/autContext';

const Laboratorio=()=>{

    const LabsContext=useContext(LabContext)
    const {grafica}=LabsContext

    const AutContexts=useContext(AutContext)
    const {cerrarSesion,restringirUsuario}=AutContexts

    window.addEventListener("beforeunload",(ev) => 
    { restringirUsuario()
    ev.preventDefault();
    return ev.returnValue = '¿Estas seguro de que quieres salir?';
    });



    return(
        
            <div>
                <Barra/>
                <IdleTimerContainer></IdleTimerContainer>
                <div className='contenedor-app'>
                    <BarraLateral/>

                    <div className='seccion-principal'>

                        {grafica?
                            <Grafica/>
                            :null}

                        <main>
                
                            <div className='contenedor-tareas'>
                            </div>
                
                        </main>
                    </div>
                </div>
            </div>
        

    )
}

export default Laboratorio;