import React from 'react';

import { Link } from "react-router-dom";
import Api from "../servicios/Api";
import '../css/listarestacionamiento.css';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            playadeestacionamiento: []
        };
    }

    borrarRegistros = (idPlayaDeEstacionamiento) => {
        //console.log(idPlayaDeEstacionamiento);
        fetch(Api+"?borrar="+idPlayaDeEstacionamiento)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.cargarDatos();
            })
            .catch(console.log)
    };

    cargarDatos() {
        fetch(Api)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.setState({ datosCargados: true, playadeestacionamiento: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {

        const { datosCargados, playadeestacionamiento } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (
                <div className="tbl-header">
                    <div className="tbl-header">
                        <Link className="btn btn-success" to={"/CrearEstacionamiento"}>➕ Agregar Estacionamiento</Link> 
                    </div>
                    <div className="tbl-header">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>Nombre</th>                                   
                                    <th>Ubicacion</th>
                                    <th></th>                                    
                                </tr>
                            </thead>
                        </table>
                        <div className="tbl-content">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <tbody>

                                {
                                    playadeestacionamiento.map(
                                        (estacionamiento) => (
                                            <tr key={estacionamiento.idPlayaDeEstacionamiento}>
                                                <td>{estacionamiento.nombrePlayaDeEstacionamiento}</td>                                               
                                                <td>{estacionamiento.ubicacion}</td>                                                                                                                                           
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="">
                                                        <Link className="btn btn-warning" 
                                                        to={"/EditarEstacionamiento/"+estacionamiento.idPlayaDeEstacionamiento}                                                        
                                                        >Editar</Link>
                                                        &nbsp;
                                                        &nbsp;
                                                        <button type="button" className="btn btn-danger" 
                                                            onClick={()=> this.borrarRegistros(estacionamiento.idPlayaDeEstacionamiento)}>Borrar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                
                    </div>
                </div>

            );
        }
    }
}

export default Listar;