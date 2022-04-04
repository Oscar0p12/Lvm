import React, { useContext, useEffect } from 'react'
import LabContext from '../../Context/LabContext';
import { Line } from 'react-chartjs-2'
import styled from '@emotion/styled'

//Estilo de grafica
const Graf=styled.div`
    margin-top:8rem;
    margin-left:3rem;
    margin-right:3rem;
`
var a=0;
//Parametros de grafica
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

let ejeY=[0]
const Grafica=()=>{   

  //Extraer datos de la grafica
  const labsContext=useContext(LabContext);
  const {datos,datos1}=labsContext;
  

  
  
 
  //Propiedades grafica
  const data={
    labels: datos1,
    datasets: [
      {
        label: '# Respuesta ',
        data:datos,
        fill:true,
        backgroundColor: 'rgb(85, 195, 255,0.1)',
        borderColor: 'rgba(255, 99, 132)',
        pointRadius:5,    
        pointBackgroundColor:'rgb(255,255,255)',
        pointBorderWidth:3
      },
    ],
  }

  a=a+0.05;
  var b=a.toFixed(2);
  ejeY.push(b);

    return( 
      <Graf>
        <Line
          options={options}
          data={data}
        />
      </Graf>


    )
}

export default Grafica;


// setTimeout(function(){
          
//     socket.disconnect()  
//    socket.emit('desconectate',()=>{})
    
// },10000); 