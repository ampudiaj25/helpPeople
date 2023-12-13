import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { crearCiudadano, editarCiudadano, obtenerCiudadanos, obtenerTiposDocumentos } from "../services/apiServices";
import ListaCiudadanos from "./list";

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [tiposDocumentos, settiposDocumentos] = useState([]);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [ciudadanos, setCiudadano] = useState([]);
  const [idCiudadanoSeleccionado, setidCiudadanoSeleccionado] =useState();
  

  const obtenerDatosCiudadanos = async () => {
    const data = await obtenerCiudadanos();
    setCiudadano(data);
  }

  const obtenerDatosTiposDocumentos = async () => {
    const datos = await obtenerTiposDocumentos();
    settiposDocumentos(datos.map(tipo => ({ id: tipo.id, nombre: tipo.nombre })));
  }


  useEffect(() => {
    const obtenerDatos = async () => {
      await obtenerDatosCiudadanos();
      await obtenerDatosTiposDocumentos()
    }

    obtenerDatos();
  }, []);

  const closeSuccessMessage = () => {
    setRegistroExitoso(false);
  };

  const onSubmit = async (data) => {
    try {
      let result = false;
      if(!idCiudadanoSeleccionado){
        result = await crearCiudadano(data);
      }else{
        const dataEditada ={
          ...data,
          id:idCiudadanoSeleccionado
        }
        result = await editarCiudadano(dataEditada);
        
      }

      setRegistroExitoso(result);
           
      console.log(result);
    } catch (error) {
      console.log(error);
    }finally{
      reset({
        nombres: "",
        apellidos:"",
        profesion:"",
        correoElectronico:"",
        aspiracionSalarial:"",
        tiposDocumento:"",
        cedula:"",
        fechaNacimiento:""
        
      });
      
      await obtenerDatosCiudadanos();
      setidCiudadanoSeleccionado();
    }

  }

  return (
    <div className="container mt-5">
      <h1>Registro de Ciudadanos</h1>
      {registroExitoso && (
        <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
          <span>¡Registro exitoso!</span>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeSuccessMessage}></button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="tiposDocumento" className="form-label">Tipo de Documento ID</label>
              <select className={`form-select ${errors.tiposDocumento ? 'is-invalid' : ''}`} id="tiposDocumento" {...register('tiposDocumento', { required: 'Este campo es requerido' })}>
                <option value="">Selecciona un tipo de documento</option>
                {tiposDocumentos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              {errors.tiposDocumento && <div className="invalid-feedback">{errors.tiposDocumento.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombres</label>
              <input type="text" className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} id="nombres" {...register('nombres', { required: 'Este campo es requerido', pattern: /^[A-Za-zÁáÉéÍíÓóÚúñÑ\s']+$/ })} />
              {errors.nombres && <div className="invalid-feedback">{errors.nombres.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
              <input type="date" className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`} id="fechaNacimiento" {...register('fechaNacimiento', { required: 'Este campo es requerido' })} />
              {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="aspiracionSalarial" className="form-label">Aspiración Salarial</label>
              <input type="number" className={`form-control ${errors.aspiracionSalarial ? 'is-invalid' : ''}`} id="aspiracionSalarial" {...register('aspiracionSalarial', { required: 'Este campo es requerido' })} />
              {errors.aspiracionSalarial && <div className="invalid-feedback">{errors.aspiracionSalarial.message}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cedula" className="form-label">Cédula</label>
              <input type="text" className={`form-control ${errors.cedula ? 'is-invalid' : ''}`} id="cedula" {...register('cedula', { required: 'Este campo es requerido' })} />
              {errors.cedula && <div className="invalid-feedback">{errors.cedula.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} id="apellidos" {...register('apellidos', { required: 'Este campo es requerido' })} />
              {errors.apellidos && <div className="invalid-feedback">{errors.apellidos.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="profesion" className="form-label">Profesión</label>
              <input type="text" className={`form-control ${errors.profesion ? 'is-invalid' : ''}`} id="profesion" {...register('profesion', { required: 'Este campo es requerido' })} />
              {errors.profesion && <div className="invalid-feedback">{errors.profesion.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input type="email" className={`form-control ${errors.correoElectronico ? 'is-invalid' : ''}`} id="correoElectronico" {...register('correoElectronico', { required: 'Este campo es requerido' })} />
              {errors.correo && <div className="invalid-feedback">{errors.correo.message}</div>}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      <ListaCiudadanos 
         ciudadanos={ciudadanos}
         setCiudadano={setCiudadano}
         reset={reset}
         setidCiudadanoSeleccionado={setidCiudadanoSeleccionado}
         tiposDocumentos={tiposDocumentos}
      />
    </div>
  );
};
export default App;
