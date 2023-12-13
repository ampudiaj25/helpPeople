import axios from "axios";


export const obtenerTiposDocumentos = async() =>{
 let data =[];
 await axios.get('https://localhost:7039/api/TiposDocumento')
 .then((respose)=>{
    data = respose && respose.data ? respose.data : [];
 })
 .catch((error)=>{
    console.log(error);
 })
 return data;
};

export const crearCiudadano = async(data) =>{
 let result = true;
 await axios.post('https://localhost:7039/api/Ciudadano',data)
 .then((response)=>{
    console.log(response);
 })
 .catch((error)=>{
    result = false;
    console.log(error);
 })
 return result;
};


export const obtenerCiudadanos = async() =>{
   let data =[];
   await axios.get('https://localhost:7039/api/Ciudadano')
   .then((response)=>{
      console.log(response)
      data = response.data;
   })
   .catch((error)=>{
      console.log(error);
   })

   return data;
  };

export const editarCiudadano = async(data) =>{
    let result = true;
    await axios.put('https://localhost:7039/api/Ciudadano',data)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        result = false;
        console.log(error);
    })
    return result;
}

export const eliminarCiudadano = async(id) =>{
   let result = true;
   await axios.delete(`https://localhost:7039/api/Ciudadano/${id}`)
   .then((response)=>{
       console.log(response);
   })
   .catch((error)=>{
       result = false;
       console.log(error);
   })
   return result;
}