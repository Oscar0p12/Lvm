import React,{useReducer} from "react";
import { DATOS_GRAFICA, ELECCION_PRACTICA,GRAFICA,VALIDAR_DATOS,ACTIVAR_FORMULARIO} from "../type";
import LabContext from "./LabContext";
import LabReducer from "./LabReducer";

const LabState=props=>{

    const initialState={
        practicas:null,
        errordatos:false,
        mensaje:'',
        grafica:false,
        activarFormulario:false,
        datos:[]
    }

    const [state,dispatch]=useReducer(LabReducer, initialState);
    
    const mostrarPracticas=(practicas)=>{
        dispatch({
            type:ELECCION_PRACTICA,
            payload:practicas
        })
    }

    const validarDatos=(mensaje)=>{
        dispatch({
            type:VALIDAR_DATOS,
            payload:mensaje
        })
    }

    const mostrarGrafica=(grafica)=>{
        dispatch({
            type:GRAFICA,
            payload:grafica
        })
    }

    const datosGrafica=(datos)=>{
        dispatch({
            type:DATOS_GRAFICA,
            payload:datos
        })
    }

    const ActivacionFormularios=(activarFormulario)=>{
        dispatch({
            type:ACTIVAR_FORMULARIO,
            payload:activarFormulario
        })
    }

    return(
        <LabContext.Provider
            value={{
                practicas:state.practicas,
                errordatos:state.errordatos,
                mensaje:state.mensaje,
                datos:state.datos,
                grafica:state.grafica,
                activarFormulario:state.activarFormulario,
                mostrarPracticas,
                validarDatos,
                mostrarGrafica,
                datosGrafica,
                ActivacionFormularios
            }}>

            {props.children}
                
        </LabContext.Provider>
        )
}

export default LabState;