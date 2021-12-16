import React from 'react'
import Formulario from './BarraLateral/Formulario';
import Input1 from './BarraLateral/Inputs/Input1'
import ErrorDatos from './BarraLateral/Inputs/ErrorDatos';
import Input2 from './BarraLateral/Inputs/Input2'
import Input3 from './BarraLateral/Inputs/Input3'


const BarraLateral = ()=>{
    

    return(

        <aside>
            <h1>Lab-Control <span>Practica 1#</span> </h1>

            <Formulario/>

            <div className='proyectos'>      

                <h2>Datos Practica</h2>
                <Input1/>
                <Input2/>
                <Input3/>
                <ErrorDatos/>
                

            </div>

        </aside>
    )
}

export default BarraLateral;