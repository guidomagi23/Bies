import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/Api";


class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            estacionamiento: []
        }
    }

    cambioValor = (e) => {
        const state = this.state.estacionamiento;

        state[e.target.name] = e.target.value;
        this.setState({ estacionamiento: state });
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
        const { idPlayaDeEstacionamiento, nombrePlayaDeEstacionamiento, ubicacion, capacidad, observaciones, mapa} = this.state.estacionamiento;
        /*console.log(idPlayaDeEstacionamiento);
        console.log(nombrePlayaDeEstacionamiento);
        console.log(ubicacion);
        console.log(capacidad);
        console.log(observaciones);
        console.log(mapa);
        console.log(lugaresLibres);*/

        var datosEnviar = { idPlayaDeEstacionamiento: idPlayaDeEstacionamiento, nombrePlayaDeEstacionamiento: nombrePlayaDeEstacionamiento, ubicacion: ubicacion, capacidad: capacidad, observaciones: observaciones, mapa: mapa, lugaresLibres: capacidad };

        fetch(Api + "?actualizar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)

        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.props.history.push("/");
            })
            .catch(console.log)
    }

    componentDidMount() {
        //console.log(this.props.match.params.id);

        fetch(Api + "?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.setState({
                    datosCargados: true,
                    estacionamiento: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }

    render() {

        const { datosCargados, estacionamiento } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (
                <div className="card">
                    <div className="card-header">
                        Editar Estacionamientos
                    </div>
                    <div className="card-body">


                        <div className="form-group">
                            <label htmlFor="">ID</label>
                            <input type="text" readOnly className="form-control" value={estacionamiento.idPlayaDeEstacionamiento} id="idPlayaDeEstacionamiento" aria-describedby="helpId" placeholder="" />
                            <small id="helpId" className="form-text text-muted">Clave Id</small>
                        </div>

                        <form onSubmit={this.enviarDatos} >
                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" name="nombrePlayaDeEstacionamiento" id="nombrePlayaDeEstacionamiento" onChange={this.cambioValor} value={estacionamiento.nombrePlayaDeEstacionamiento} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Ingrese Nombre</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Ubicacion:</label>
                                <input type="text" name="ubicacion" id="ubicacion" onChange={this.cambioValor} value={estacionamiento.ubicacion} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Ingrese Ubicacion</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Capacidad:</label>
                                <input type="text" name="capacidad" id="capacidad" onChange={this.cambioValor} value={estacionamiento.capacidad} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Ingrese Capacidad</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Observaciones:</label>
                                <input type="text" name="observaciones" id="observaciones" onChange={this.cambioValor} value={estacionamiento.observaciones} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Ingrese Observaciones</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Mapa:</label>
                                <input type="text" name="mapa" id="mapa" onChange={this.cambioValor} value={estacionamiento.mapa} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Ingrese Mapa</small>
                            </div>

                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar</button>
                                <Link to={"/"} className="btn btn-cancel">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>);
        }
    }
}

export default Editar;