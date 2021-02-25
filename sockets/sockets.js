const { io } = require('../index');
//Mensajes del socket
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    

    client.on('mensaje', ( payload )=>{
        console.log('Mensaje recibido!!', payload);
        io.emit('mensaje',{hello:'Desde mi backed hacia todos'});
    })

  });