const API = "https://apiparqueadero.grupof23.com/";
const headersyordis = {
   Accept: 'application/json',
  'Content-Type': 'application/json',
  'Authorization':'Berear 123456789',
  'usuario':'yordis',
  'sede':'1'
}
export const listarsalidacarros = async () => {
  const result =  await fetch(API+'listarsalida', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const RealizarCalculo = async (codigo) => {
  const result =  await fetch(`${API}realizarcalculo/${codigo}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}
export const RegistroSalida = async (datosclientes,accion) => {
  const datosenviar = {
    id:datosclientes.id_en_sa,
    accion:accion,
    placa:datosclientes.placa_vehiculo,
    pagar:datosclientes.id_en_sa
  }
  const result =  await fetch(API+'realizarsalida', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const buscarpornombre = async (codigo) => {
  const result =  await fetch(`${API}buscarclientes/${codigo.nombrecliente}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}

export const listartodaslastarifas = async () => {
  const result =  await fetch(API+'listartarifa', { method: "GET",headers: headersyordis})
  const resultado = await result.json()
       return resultado;
}
export const RegistroEntrada = async (datos,valor) => {
  const datosenviar = {
    cliente:datos.cedula,
    v_precio_pagar:valor,
    placa:datos.placa
  }
  const result =  await fetch(API+'realizarentrada', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

export const buscarporplaca = async (codigo) => {
  const result =  await fetch(`${API}buscarplaca/${codigo.placabuscar}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}
export const buscarpagosrealizados = async (codigo) => {
  const result =  await fetch(`${API}buscarpagook/${codigo.placabuscar}`,{ method: "GET",headers: headersyordis})
  const resultado = await result.json()
  return resultado;
}

export const RealizarPagoPorDias= async (datos,valor) => {
  const datosenviar = {
    cliente:datos.cedula,
    v_precio_pagar:valor,
    placa:datos.placa
  }
  const result =  await fetch(API+'realizarentrada', { method: "POST",headers: headersyordis,body: JSON.stringify(datosenviar)})
  const resultado = await result.json()
  return resultado;
}

  export const accederalsistema = async (loginacceso) => {
    const result =  await fetch(API+'login', { method: "POST",headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },body: JSON.stringify(loginacceso)})
    const resultado = await result.json()
      return resultado;
  }