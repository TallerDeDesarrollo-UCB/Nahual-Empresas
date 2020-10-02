import axios from "axios";

const SERVICIO_DE_DATOS_API_NAHUAL = process.env.REACT_APP_API_URL;

const servicioDeEgresades = {
  obtenerEgresades(){
    return axios.get(`${SERVICIO_DE_DATOS_API_NAHUAL}/graduates/unemployes`)
  }
}

export default servicioDeEgresades;