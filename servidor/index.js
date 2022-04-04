const http=require('http')
const express=require('express')
const cors= require('cors')

//Crear el servidor
const app=express()
const {Server, Socket}=require('socket.io')

const fs=require('fs')
const archivo='../archivo.txt'
const datos='datos.txt'

const conectarDB=require('./config/db')

//Conectar a la base de datos
conectarDB();

//Habilitar express.json
app.use(express.json({extended:true}))

//Habiliar cors
app.use(cors());

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/auth',require('./routes/auth'))

//Configuracion del puerto serial
const Serialport = require('serialport');
const { disconnect } = require('process')
const nodemon = require('nodemon')
const Realine = Serialport.parsers.Readline


const server=http.createServer(app)

//Puerto de la app
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'],
    }, 
})

//Crear puerto serial
const port = new Serialport('COM3',{
    baudRate:9600,
    autoOpen:false
    })
    

const parser= port.pipe(new Realine({ delimeter:'\r\n'}))

io.on('connection',(socket)=>{ 
    
    //Ejetucar matlab
    // var exec = require('child_process').exec;
    // exec("matlab -nodesktop -r run('pruebap1.m')", function (error, stdOut, stdErr) {
    // });

    //Abrir puerto
    port.open(null) 

    console.log(socket.id)   
    
 
    socket.on('mensaje',(dato1)=>{
        console.log(dato1[0])
     
        fs.writeFileSync(datos,dato1[0]+','+dato1[1]+','+dato1[2])
    })
 

    setTimeout(function(){  
         port.write('si')     
        },10000);
    
    
    //Enviar datos al cliente 
    parser.on('data',function(data){
    //  console.log(parseInt(data,10));
        socket.emit('datos',{value:data}) 
        fs.writeFileSync(archivo,'si')   

    })

    //Desonectar del cliente
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)
        port.close(socket.disconnect?null: error => {})
    })

})


server.listen(3001,()=>{
    console.log('servidor')
})

parser.on('open',function(){
    console.log('conectado')
})

parser.on('data', function(data){
    console.log(parseInt(data))
    
})

port.on('error',function(err){
    console.log(err)
})


// parser.on('mensaje',(dato1,dato2,dato3)=>{
//     console.log(dato1)
//     console.log(dato2)
//     console.log(dato3)
//     fs.writeFileSync(archivo,'hola')   
// })



// exec('start pbrush',(err,stdout)=>{
//         if(err){
//             throw err;
//         }
//         console.log('todo correcto')
//     })