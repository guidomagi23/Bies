import React from 'react';
import { Link } from "react-router-dom";
import apiHorarios from "../servicios/ApiHorarios";
import SeleccionarDiaSemana from './SeleccionarDiaSemana';
import SeleccionarEstacionamiento from './SeleccionarEstacionamiento';
import swal from "sweetalert";


class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idPlayaDeEstacionamiento: "",
            nombreDia: "",
            horaInicio: "",
            horaFin: "",
            errores: []
        }
    }

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }


    verificarError(elemento) {

        return this.state.errores.indexOf(elemento) !== -1;
    }

    enviarDatos = (e) => {
        e.preventDefault();
        
        console.log("Formulario enviado");
        //console.log (this.state.idPlayaDeEstacionamiento);
        const { idPlayaDeEstacionamiento, nombreDia, horaInicio, horaFin } = this.state;

        var errores = [];
        if (!idPlayaDeEstacionamiento) errores.push("error_idPlayaDeEstacionamiento");
        if (!nombreDia) errores.push("error_nombreDia");
        if (!horaInicio) errores.push("error_horaInicio");
        if (!horaFin) errores.push("error_horaFin");

        this.setState({ errores: errores });
        if (errores.length > 0) {
            return false;
        }

        var datosEnviar = { idPlayaDeEstacionamiento: idPlayaDeEstacionamiento, nombreDia: nombreDia, horaInicio: horaInicio, horaFin: horaFin }
        //console.log (datosEnviar);
        

        fetch(apiHorarios + "?insertar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((data) => {
                //console.log(data.data);              
            
                if(data.data === "ok"){
                    swal({   
                        title:"Horario agregado",                         
                        text: "Se agregó el horario.",
                        icon: "success",
                        buttons: "Aceptar"
                    });
                    this.props.history.push("/");
                } else{ 
                    swal({   
                        title:"Error",                         
                        text: data.data,
                        icon: "error",
                        buttons: "Aceptar"
                    });
                    
                }
            })
            .catch(console.log)
    }

    onChange = (event) => {
        this.setState({ idPlayaDeEstacionamiento: event.target.value });
    }

    handler = (param) => {
        this.setState({nombreDia: param})
    }


    render() {

        const { horaInicio, horaFin, nombreDia } = this.state;

        return (<div className="card">
            <div className="card-header">
                Crear Horario
            </div>
            <div className="card-body">
                <form onSubmit={this.enviarDatos} >
                    <div className="form-group">
                        <label htmlFor="">Nombre Playa de Estacionamiento:</label>
                        <SeleccionarEstacionamiento onChange = {this.onChange}/>
                    </div>

                    <div className="form-group">
                        <br></br>
                        <label htmlFor="">Dia de la Semana:</label>
                        <SeleccionarDiaSemana nombreDia={nombreDia} handler={this.handler}/>
                    </div>

                    <div className="form-group">
                        <br></br>
                        <label htmlFor="">Hora Inicio:</label>
                        <input type="time" name="horaInicio" id="horaInicio" onChange={this.cambioValor} value={horaInicio} className={((this.verificarError("error_horaInicio")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted"></small>
                        <br></br>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Hora Fin:</label>
                        <input type="time" name="horaFin" id="horaFin" onChange={this.cambioValor} value={horaFin} className={((this.verificarError("error_horaFin")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted"></small>
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