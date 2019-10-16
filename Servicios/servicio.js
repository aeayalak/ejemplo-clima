const axios = require('axios');


const getLugarLatitudLongitud = async(direccion) =>{
    const encodeURL = encodeURI(direccion);
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        headers: {'x-rapidapi-key': 'a427b962famsha26e55edd72b6ecp115e82jsn99feab7446f4'}
      });
    
      const resp = await instance.get();
      if(resp.data.Results.lenght === 0){
          throw new Error('No hay resultados para mostrar para '+ direccion)
      }
      const data = resp.data.Results[0];
      const localizacion = data.name;
      const lat = data.lat;
      const lng = data.lon;

      return{
          localizacion,
          lat,
          lng
      }
}



const getClima = async (lat, lon) =>{
    const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9efd180ffa643042d86f7d13f4c7f12f&units=metric`);
    return respuesta.data.main.temp;
}

const getInfo = async(direccion) =>{

    try {
        const infoRespuesta = await getLugarLatitudLongitud(direccion);
        const infoClima = await getClima(infoRespuesta.lat, infoRespuesta.lng);
        return 'La Temperatura de '+ infoRespuesta.localizacion + "es de " + infoClima + "°";
    }
    catch(e)
    {
       return 'No se pudo determinar el clima de [' + direccion + ']';
    }
}


module.exports = {
    getLugarLatitudLongitud,
    getClima,
    getInfo
}