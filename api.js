const API = "https://apiparqueadero.grupof23.com/";
import AsyncStorage from '@react-native-async-storage/async-storage';
const obtenerValorAsyncStorage = async () => {
  const jsonValue = await AsyncStorage.getItem('valores')
  const respuesta = JSON.parse(jsonValue);
  const headersyordis = {
    Accept: 'application/json',
   'Content-Type': 'application/json',
   'Authorization':`Berear ${respuesta.token}`,
   'usuario':respuesta.usuario,
   'sede':respuesta.sede
 }
  return headersyordis;
};

export const listardisponibles= async () => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'listardisponibilidad', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const listarsalidacarros = async () => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'listarsalida', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const RealizarCalculo = async (codigo) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(`${API}realizarcalculo/${codigo}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}
export const RegistroSalida = async (datosclientes,accion) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const datosenviar = {
    id:datosclientes.Id_unico,
    accion:accion,
    placa:datosclientes.Placa,
    pagar:datosclientes.Pagar
  }
  const result =  await fetch(API+'realizarsalida', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const buscarpornombre = async (codigo) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(`${API}buscarclientes/${codigo.nombrecliente}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}

export const listartodaslastarifas = async () => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'listartarifa', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const RegistroEntrada = async (datos,valor) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const datosenviar = {
    cliente:datos.cedula,
    v_precio_pagar:valor,
    placa:datos.placa,
    tipo_vehiculo:datos.tipo_vehiculo
  }
  const result =  await fetch(API+'realizarentrada', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const buscarporplaca = async (codigo) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(`${API}buscarplaca/${codigo.placabuscar}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}
export const buscarpagosrealizados = async (codigo) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(`${API}buscarpagook/${codigo.placabuscar}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}

export const Realizarpagototal = async (datosclientes,valorpagar,dias) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const datosenviar = {
    cantidaddias:parseInt(dias),
    cliente:datosclientes.cedula,
    placa:datosclientes.placa_vehiculo,
    montopagar:parseInt(valorpagar)
  }
  const result =  await fetch(API+'realizarpagototal', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const RealizarPagoPorDias= async (datos,valor) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const datosenviar = {
    cliente:datos.cedula,
    v_precio_pagar:valor,
    placa:datos.placa
  }
  const result =  await fetch(API+'realizarentrada', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const ListadoClientes = async (codigo) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(`${API}listarclientes/${codigo.nombrecliente}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}
export const GuardarCliente= async (datos) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'registrarclientes', { method: "POST",headers: headersyordis,body: JSON.stringify(datos)})
  const resultado = await result.json()
  return resultado;
}
export const ActualizarCliente= async (datos) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'actualizarclientes', { method: "POST",headers: headersyordis,body: JSON.stringify(datos)})
  const resultado = await result.json()
  return resultado;
}

export const ListadoTarifas = async () => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'listartarifas', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const ActualizarTarifa= async (datos) => {
  const headersyordis = await obtenerValorAsyncStorage();
  const result =  await fetch(API+'actualizartarifa', { method: "POST",headers: headersyordis,body: JSON.stringify(datos)})
  const resultado = await result.json()
  return resultado;
}
  export const accederalsistema = async (usuario,clave) => {
    loginacceso ={
      usuario:usuario,
      password:clave
    }
    const result =  await fetch(API+'login', { method: "POST",body: JSON.stringify(loginacceso)})
    const resultado = await result.json()
      return resultado;
  }