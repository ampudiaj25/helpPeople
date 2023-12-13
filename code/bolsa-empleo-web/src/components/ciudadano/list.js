import { eliminarCiudadano } from "../services/apiServices";

function ListaCiudadanos(props) {


    const eliminarCiudadanos = async (id) => {
        await eliminarCiudadano(id);
        const updateCiudadano = props.ciudadanos.filter((ciudadano) => ciudadano.id !== id);
        props.setCiudadano(updateCiudadano);
    }

    const editarCiudadano = async (ciudadano) => {
        props.reset(ciudadano);
        props.setidCiudadanoSeleccionado(ciudadano.id)
    }

    const obtenerNombreTipoDocumento = (id) => {
        const nombreDocumento = props.tiposDocumentos.find(tipo => tipo.id === id);
        return nombreDocumento ? nombreDocumento.nombre : 'no exite';
    }

    return (
        <div className="container mt-5 overflow-auto">
            <h2>Ciudadanos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tipo de Documento</th>
                        <th>Cédula</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Profesión</th>
                        <th>Aspiración Salarial</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ciudadanos.map((ciudadano) => (
                        <tr key={ciudadano.id}>
                            <td>{obtenerNombreTipoDocumento(ciudadano.tiposDocumento)}</td>
                            <td>{ciudadano.cedula}</td>
                            <td>{ciudadano.nombres}</td>
                            <td>{ciudadano.apellidos}</td>
                            <td>{ciudadano.fechaNacimiento}</td>
                            <td>{ciudadano.profesion}</td>
                            <td>{ciudadano.aspiracionSalarial}</td>
                            <td>{ciudadano.correoElectronico}</td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-success mt-2 me-2 mr-2 flex-fill"
                                        onClick={() => editarCiudadano(ciudadano)}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger mt-2 mr-2 flex-fill"
                                        onClick={() => eliminarCiudadanos(ciudadano.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaCiudadanos;