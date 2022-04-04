import React,{useState,Fragment,useContext} from 'react'
import styled from '@emotion/styled'
import LabContext from '../../../../Context/LabContext'
import { io } from 'socket.io-client'
import Pdf from'../../../archivo.pdf'


//Estilos
const Campo=styled.div`
    margin-bottom:2rem;
    align-items: center;
`

let a=0;


const Input1=()=>{

    //Extraer funciones, datos de practica y grafica
    const LabsContext=useContext(LabContext);
    const {practicas,validarDatos,mostrarGrafica,datosGrafica,ActivacionFormularios,activarFormulario,datos1}=LabsContext;


    const [chartData, data] = useState({});
    
    //State de datos del formulario
    const [datos,guardarDatos]=useState({
        dato1:'',
        dato2:'',
        dato3:''
    })


    const {dato1,dato2,dato3}=datos

    const onChangeDato=e=>{
        guardarDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{
        e.preventDefault();

        let datoG=[];

        //Valifaicon de datos
        if(dato1.trim()==='' || dato2.trim()==='' || dato3.trim()===''){
            validarDatos('todos los campos son obligatorios');
            return
        }

        if(!Number(dato1)||!Number(dato2)||!Number(dato3)){
            validarDatos('Todos los datos deben ser numericos')
            return
        }    
    
        if(dato1>=10 || !Number(dato1)){
            validarDatos('dato1 debe ser mayor a 10')
            return
        }    
        a=0
        let datos1=[]
        validarDatos('')
        mostrarGrafica(true)   
        ActivacionFormularios(true)

        //Conectar al servidor
        const socket=io.connect('http://localhost:3001')

        socket.emit('mensaje',[dato1,dato2,dato3])

        //Escuchar el servidor y graficar datos
        socket.on('datos',function(data){
            datoG.push(data.value);
            

            var b=a.toFixed(2)
            a=a+0.05;
            datos1.push(b)
            console.log(datos1)

            datosGrafica(datoG,datos1)
            })
        
       
        //Desconexion del servidor     
        setTimeout(function(){  
            socket.disconnect()
            ActivacionFormularios(false)
            },90000);
        }

        //Abrir pdf
        const onResumeClick=()=>{
            window.open(Pdf);
            return
          }


    
    return(
        
        <Fragment>
            {practicas==='Practica1'?(

            <form 
            className='formulario-nuevo-proyecto'
            onSubmit={onSubmit}
            disabled={activarFormulario}
            >

            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 1'
                    name='dato1'    
                    value={dato1}   
                    onChange={onChangeDato} 
                    disabled={activarFormulario}
                />
            </Campo>

            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 2'
                    name='dato2'  
                    value={dato2}   
                    onChange={onChangeDato}    
                    disabled={activarFormulario}
                />
           
            </Campo>
                    
            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 3'
                    name='dato3'   
                    value={dato3}   
                    onChange={onChangeDato}     
                    disabled={activarFormulario}             
                />
            </Campo>

            <Campo>
                <input
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Ejecutar simulacion'
                    disabled={activarFormulario}
                />
            </Campo>               


            </form>       

            ):null}

            {practicas==='Practica1'?(<button  disabled={activarFormulario}  className='btn btn-primario'  align-items='center' onClick={onResumeClick}>pdf</button>):null}
        </Fragment>
    )
}



export default Input1;
