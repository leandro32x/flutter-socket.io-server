const { io } = require('../index');
const Bands = require('../models/Bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Linkin Park'));
bands.addBand(new Band('Molotov'));
bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('System of a Down'));

console.log(bands);

//Mensajes del socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    

    client.on('mensaje', ( payload )=>{
        console.log('Mensaje recibido!!', payload);
        io.emit('mensaje',{hello:'Desde mi backed hacia todos'});
    });

    client.on('emitir-mensaje', (payload)=>{
        console.log('mensaje nuevo!', payload);
        io.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        console.log(payload);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload)=>{
        bands.addBand(new Band(payload.name));
        console.log(payload.name)
        io.emit('active-bands', bands.getBands());
        
    });

    client.on('delete-band',(payload)=>{
        console.log(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

  });