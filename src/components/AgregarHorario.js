import React from 'react';

import { Link } from "react-router-dom";
import apiHorarios from "../servicios/ApiHorarios";
import '../css/listarestacionamiento.css';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            playadeestacionamientohorario: []
        };
    }

    borrarRegistros = (idHorario) => {
        //console.log(idHorario);
        fetch(apiHorarios + "?borrar=" + idHorario)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.cargarDatos();
            })
            .catch(console.log)
    };

    cargarDatos() {
        fetch(apiHorarios)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.setState({ datosCargados: true, playadeestacionamientohorario: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {

        const { datosCargados, playadeestacionamientohorario } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (
                <div className="tbl-header">
                    <div className="tbl-header">
                        <Link className="btn btn-success" to={"/CrearHorario"}>➕ Agregar Horario</Link>
                    </div>
                    <div className="tbl-header">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>ID del Horario</th>
                                    <th>Nombre</th>
                                    <th>Dia de la Semana</th>
                                    <th>Hora Inicio</th>
                                    <th>Hora Fin</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                        <div className="tbl-content">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <tbody>

                                    {
                                        playadeestacionamientohorario.map(
                                            (estacionamientohorario) => (
                                                <tr key={estacionamientohorario.idHorario}>

                                                    <td>{estacionamientohorario.idHorario}</td>
                                                    <td>{estacionamientohorario.nombrePlayaDeEstacionamiento}</td>
                                                    <td>{estacionamientohorario.nombreDia}</td>
                                                    <td>{estacionamientohorario.horaInicio}</td>
                                                    <td>{estacionamientohorario.horaFin}</td>
                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="">
                                                            <Link className="btn btn-warning"
                                                                to={"/EditarHorario/" + estacionamientohorario.idHorario}
                                                            >Editar</Link>
                                                            &nbsp;
                                                            &nbsp;
                                                            <button type="button" className="btn btn-danger"
                                                                onClick={() => this.borrarRegistros(estacionamientohorario.idHorario)}>Borrar</button>
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