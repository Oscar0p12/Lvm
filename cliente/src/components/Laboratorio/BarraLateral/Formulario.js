import React,{useContext} from 'react'
import styled from '@emotion/styled'
import LabContext from '../../../Context/LabContext'

//Estilos de etiquetas
const InputR=styled.input`
    margin: 0 1rem;
`

const Label=styled.label`
flex: 0 0 10px;
margin-bottom: 0rem;

`

const Formulario=()=>{

  //Extraer funcion de visualizacion de practicas
  const LabsContext=useContext(LabContext)
  const {mostrarPracticas}=LabsContext

  const obtenerDatos=e=>{     
    mostrarPracticas(e.target.value)     
  }

    return(        
        <form>     
        
                <Label>Practica:</Label>

                <InputR type='radio'
                name='practica'
                value='Practica1'
                onChange={obtenerDatos}
                />1        

                <InputR type='radio'
                name='practica'
                value='Practica2'
                onChange={obtenerDatos}
                />2

               
                <InputR type='radio'
                name='practica'
                value='Practica3'
                onChange={obtenerDatos}
                />3                

        </form>
        
        )
}

export default Formulario;