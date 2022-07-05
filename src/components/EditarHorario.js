import React from 'react';
import { Link } from "react-router-dom";
import apiHorarios from "../servicios/ApiHorarios";
import SeleccionarDiaSemana from './SeleccionarDiaSemana';
import swal from "sweetalert";

class Editar extends React.Component {
    constructor(props) {        
        super(props); 
        this.handler = this.handler.bind(this);       
        this.state = {
            datosCargados: false,
            nombreDia: "",
            estacionamientohorario: []            
        }
    }

    cambioValor = (e) => {
        const state = this.state.estacionamientohorario;

        state[e.target.name] = e.target.value;
        this.setState({ estacionamientohorario: state });
    }

    handler = (param) => {
        this.setState({nombreDia: param})
        //console.log("Parametro: ",param);
        this.nombreDia = param;
    }

    enviarDatos = (e) => {
        e.preventDefault();

        const { idHorario,nombrePlayaDeEstacionamiento, idPlayaDeEstacionamiento, horaInicio, horaFin } = this.state.estacionamientohorario;
       
        var datosEnviar = { nombrePlayaDeEstacionamiento:nombrePlayaDeEstacionamiento ,idHorario: idHorario, idPlayaDeEstacionamiento: idPlayaDeEstacionamiento, nombreDia: this.nombreDia, horaInicio: horaInicio, horaFin: horaFin }

        fetch(apiHorarios + "?actualizar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)

        })
            .then(respuesta => respuesta.json())
            .then((data) => {
                //console.log(data.data);
                
                if(data.data === "ok"){
                    swal({   
                        title:"Horario actualizado",                         
                        text: "Se actualizó el horario.",
                        icon: "success",
                        buttons: "Aceptar"
                    });
                    this.props.history.push("/");
                } else {
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

    componentDidMount() {
        //console.log("Respuesta ID:", this.props.match.params.id);

        fetch(apiHorarios + "?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.setState({
                    datosCargados: true,
                    estacionamientohorario: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }


 

    render() {     

        const { datosCargados, estacionamientohorario } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        
        else {

            return (
                <div className="card">
                    <div className="card-header">
                        Editar Horario
                    </div>
                    <div className="card-body">


                        <div className="form-group">
                            <label htmlFor="">ID:</label>
                            <input type="text" readOnly className="form-control" value={estacionamientohorario.idHorario} id="idHorario" aria-describedby="helpId" placeholder="" />
                            <small id="helpId" className="form-text text-muted"></small>
                            <br></br>
                        </div>

                        <form onSubmit={this.enviarDatos} >
                            <div className="form-group">   
                            <label htmlFor="">Estacionamiento:</label>                             
                            <input type="text" readOnly className="form-control" value={estacionamientohorario.nombrePlayaDeEstacionamiento} id="idHorario" aria-describedby="helpId" placeholder="" />
                            
                                <br></br>
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="">Nombre Playa de Estacionamiento:</label>
                                <SeleccionarEstacionamiento onChange = {this.onChange}/>
                            </div> */}

                            <div className="form-group">
                                <br></br>
                                <label htmlFor="">Dia de la Semana:</label>
                                <SeleccionarDiaSemana nombreDia={estacionamientohorario.nombreDia} handler={this.handler}/>
                            </div>

                            <div className="form-group">
                                <br></br>
                                <label htmlFor="">Hora Inicio:</label>
                                <input type="time" name="horaInicio" id="horaInicio" onChange={this.cambioValor} value={estacionamientohorario.horaInicio} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted"></small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Hora Fin:</label>
                                <input type="time" name="horaFin" id="horaFin" onChange={this.cambioValor} value={estacionamientohorario.horaFin} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted"></small>
                                <br></br>
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