import React,{useRef, useContext} from "react";
import IdleTimer from 'react-idle-timer'
import AutContext from './../Context/Autenticacion/autContext'

const IdleTimerContainer=()=>{

    const AutContexts=useContext(AutContext)
    const {cerrarSesion}=AutContexts

    const idleTimerRef= useRef(null)

    const onIdle=()=>{
        console.log('User is idle')
        cerrarSesion()
    }


    return(
        <div>
            <IdleTimer ref={idleTimerRef} timeout={80000000} onIdle={onIdle}></IdleTimer>
        </div>
    )

}

export default IdleTimerContainer;