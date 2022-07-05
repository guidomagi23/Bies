import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/Api";
import swal from "sweetalert";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombrePlayaDeEstacionamiento: "",
            ubicacion: "",
            capacidad: "",
            observaciones: "",
            mapa: "",
            errores: []
        }
    }

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state, errores: [] });
    }

    
    verificarError(elemento) {

        return this.state.errores.indexOf(elemento) !== -1;
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        const { nombrePlayaDeEstacionamiento, ubicacion, capacidad, observaciones, mapa } = this.state;
        //console.log(nombrePlayaDeEstacionamiento);
        //console.log(ubicacion);
        //console.log(capacidad);
        //console.log(observaciones);
        //console.log(mapa);

        var errores = [];
        if (!nombrePlayaDeEstacionamiento) errores.push("error_nombrePlayaDeEstacionamiento");
        if (!ubicacion) errores.push("error_ubicacion");
        if (!capacidad) errores.push("error_capacidad");
        if (!observaciones) errores.push("error_observaciones");
        if (!mapa) errores.push("error_mapa");

        this.setState({ errores: errores });
        if (errores.length > 0) {
            return false;
        }
        var datosEnviar = { nombrePlayaDeEstacionamiento: nombrePlayaDeEstacionamiento, ubicacion: ubicacion, capacidad: capacidad, observaciones: observaciones, mapa: mapa }

        fetch(Api + "?insertar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)

        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                swal({   
                    title:"Estacionamiento agregado",                         
                    text: "Se agregó el estacionamiento.",
                    icon: "success",
                    buttons: "Aceptar"
                })
                this.props.history.push("/");
            })
            .catch(console.log)
    }



    render() {

        const { nombrePlayaDeEstacionamiento, ubicacion, capacidad, observaciones, mapa } = this.state;

        return (<div className="card">
            <div className="card-header">
                Crear Estacionamiento
            </div>
            <div className="card-body">
                <form onSubmit={this.enviarDatos} >
                    <div className="form-group">
                        <label htmlFor="">Nombre:</label>
                        <input type="text" name="nombrePlayaDeEstacionamiento" onChange={this.cambioValor} minLength={1} maxLength={50} value={nombrePlayaDeEstacionamiento} id="nombrePlayaDeEstacionamiento" className={((this.verificarError("error_nombrePlayaDeEstacionamiento")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="invalid-feedback">Nombre del Estacionamiento</small>
                        <br></br>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Ubicacion:</label>
                        <input type="text" name="ubicacion" id="ubicacion" onChange={this.cambioValor} minLength={1} maxLength={100} value={ubicacion} className={((this.verificarError("error_ubicacion")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="invalid-feedback">Ingrese Ubicacion</small>
                        <br></br>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Capacidad:</label>
                        <input type="number" name="capacidad" id="capacidad" onChange={this.cambioValor} maxLength={3} value={capacidad} className={((this.verificarError("error_capacidad")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="invalid-feedback">Ingrese Capacidad</small>
                        <br></br>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Observaciones:</label>
                        <input type="text" name="observaciones" id="observaciones" onChange={this.cambioValor} maxLength={2000} value={observaciones} className={((this.verificarError("error_observaciones")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="invalid-feedback">Ingrese Observaciones</small>
                        <br></br>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Mapa:</label>
                        <input type="text" name="mapa" id="mapa" onChange={this.cambioValor} value={mapa} maxLength={100000} className={((this.verificarError("error_mapa")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="invalid-feedback">Ingrese Mapa</small>
                        <br></br>
                    </div>

                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Agregar</button>
                        <Link to={"/"} className="btn btn-cancel">Cancelar</Link>

                    </div>
                </form>

            </div>
            <div className="card-footer text-muted">

            </div>
        </div>);
    }
}

export default Crear;