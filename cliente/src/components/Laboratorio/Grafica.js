import React, { useContext, useEffect } from 'react'
import LabContext from '../../Context/LabContext';
import { Line } from 'react-chartjs-2'
import styled from '@emotion/styled'

const Graf=styled.div`
    margin-top:8rem;
    margin-left:3rem;
    margin-right:3rem;
 
`


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


const Grafica=()=>{   


  const labsContext=useContext(LabContext);
  const {datos}=labsContext;


  const data={
    labels: datos,
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
  console.log(datos)
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