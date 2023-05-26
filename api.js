// const API = "http://192.168.243.167/apivisor/public/";
const API = "https://apivisor.grupof23.com/public/";
export const listarpersonas = async () => {
  const result =  await fetch(API+'publico/listarpersonas', { method: "GET"})
  const resultado = await result.json()
       return resultado;
}
export const listarcategorias = async () => {
  const result =  await fetch(API+'publico/categorias', { method: "GET"})
  const resultado = await result.json()
       return resultado;
}
  export const listarimagenes = async (codigo) => {
      const result =  await fetch(`${API}publico/listarimagenes/${codigo}`)
      const resultado = await result.json()
      return resultado;
    }
    export const listarvideos = async (codigo) => {
      const result =  await fetch(`${API}publico/listarvideos/${codigo}`)
      const resultado = await result.json()
      return resultado;
    }
    export const buscarpornombre = async (codigo) => {
      const result =  await fetch(`${API}publico/buscarpornombre/${codigo.nombrepersona}`)
      const resultado = await result.json()
      return resultado;
    }

export const guardarusuario = async (datousuario) => {
    const result =  await fetch(API+'crear', { method: "POST",headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },body: JSON.stringify(datousuario)})
    return await result.json()
  }
export const eliminarusuario = async (ideliminar) => {
    const result =  await fetch(`${API}eliminar/${ideliminar}`,{ method: "DELETE"})
    return await result.json()
  }
export const actualizarusuario = async (datosusuarios) => {
    const result =  await fetch(`${API}actualizarusu`,{ method: "PUT",headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },body: JSON.stringify(datosusuarios)})
    return await result.json()
  }

  export const accederalsistema = async (loginacceso) => {
    const result =  await fetch(API+'login', { method: "POST",headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },body: JSON.stringify(loginacceso)})
    const resultado = await result.json()
      return resultado;
  }