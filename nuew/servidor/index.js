const http=require('http')
const express=require('express')
const cors= require('cors')
const app=express()
const {Server, Socket}=require('socket.io')

const fs=require('fs')
const archivo='../archivo.txt'

const conectarDB=require('./config/db')
conectarDB();
app.use(express.json({extended:true}))
app.use(cors());

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/auth',require('./routes/auth'))


const Serialport = require('serialport');
const { disconnect } = require('process')
const nodemon = require('nodemon')
const Realine = Serialport.parsers.Readline


const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'],
    }, 
})

const port = new Serialport('COM4',{
    baudRate:9600,
    autoOpen:false
    })
    

const parser= port.pipe(new Realine({ delimeter:'\r\n'}))

io.on('connection',(socket)=>{ 

    // var exec = require('child_process').exec;
    // exec("matlab -nodesktop -r run('p2.m')", function (error, stdOut, stdErr) {
    // });

    // port.open(null) 

    // console.log(socket.id)

    
    
    

    // setTimeout(function(){  
    //      console.log(0)
    //      //port.write('si')    
    //      port.write('si')     
    //     },10000);
    
    console.log('123')
    socket.on('mensaje',(dato1)=>{
        console.log(dato1)
    })
    console.log('1234')

    // parser.on('data',function(data){
    // //  console.log(parseInt(data,10));
    //     socket.emit('datos',{value:data}) 
    //     fs.writeFileSync(archivo,'si')   

    // })
    
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



// exec('start pbrush',(err,stdout)=>{
//         if(err){
//             throw err;
//         }
//         console.log('todo correcto')
//     })