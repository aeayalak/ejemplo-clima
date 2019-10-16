
const servicio = require('./Servicios/servicio.js');
const argv = require('yargs').options({
    direccion:{
        alias:'d',
        descripcion:'descripcion de la ciudad para obtener el clima',
        demand:true
    }
}).argv;

//servicio.getLugarLatitudLongitud(argv.direccion).then(console.log);

servicio.getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);

