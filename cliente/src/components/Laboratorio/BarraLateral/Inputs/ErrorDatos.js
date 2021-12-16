import React,{useContext} from 'react'
import LabContext from '../../../../Context/LabContext';


const ErrorDatos=()=>{

    const LabsContext=useContext(LabContext);
    const {mensaje,errordatos}=LabsContext;

    if (mensaje.trim()===''){return null}
    
    return(

        <div>

            {errordatos?<p className='mensaje error'>{mensaje}</p>:null} 

        </div>
    )
}

export default ErrorDatos;