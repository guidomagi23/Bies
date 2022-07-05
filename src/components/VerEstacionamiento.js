import { Link } from "react-router-dom";
import React from 'react';
import Api from "../servicios/Api";
import '../css/login.css';
import ApiEstacionar from '../servicios/ApiEstacionar';
import swal from "sweetalert";


class VerEstacionamiento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            estacionamiento: [],
            playadeestacionamiento: [],
            estacionado: ""
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
        const { idPlayaDeEstacionamiento, nombrePlayaDeEstacionamiento, ubicacion, observaciones, mapa, lugaresLibres } = this.state.estacionamiento;


        var datosEnviar = { idPlayaDeEstacionamiento: idPlayaDeEstacionamiento, nombrePlayaDeEstacionamiento: nombrePlayaDeEstacionamiento, ubicacion: ubicacion, observaciones: observaciones, mapa: mapa, lugaresLibres: lugaresLibres }

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

    estacionar = (idPlayaDeEstacionamiento, idUsuario) => {
        //console.log("IdUSUARIO:", idUsuario);
        fetch(ApiEstacionar + "?estacionar=" + idPlayaDeEstacionamiento + "&idUsuario=" + idUsuario)
            .catch(console.log)
            .then(response => response.json()
                .then(data => {
                    //console.log(data.data);
                    this.cargarDatos();
                    data.data === "estacionado" ? (
                        swal({                            
                            text: "Te estacionaste correctamente",
                            icon: "success",
                            buttons: "Aceptar"
                        }) 
                        )
                        : data.data === "ya_estacionado" ? (
                            swal({   
                                title:"Ya estás estacionado",                         
                                text: "Desestacione y vuelva a intentar.",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                            )
                            : (swal({   
                                title:"Cerrado",                         
                                text: "El estacionamiento se encuentra cerrado.",
                                icon: "warning",
                                buttons: "Aceptar"
                            }));
                    //console.log(data.data);
                    this.props.history.push("/")
                    //.catch(console.log)
                }))
            .catch(console.log)
        //alert('Usted se ha estacionado.');
    }




    cargarDatos() {
        fetch(Api)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta);
                this.setState({ datosCargados: true, playadeestacionamiento: datosRespuesta, estacionado: true });
                
            })
            .catch(console.log)


    }

    render() {
        const { datosCargados, estacionamiento } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (

                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ubicacion</th>
                                <th>Lugares Libres</th>
                                <th>Observaciones</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="tbl-content">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td>{estacionamiento.nombrePlayaDeEstacionamiento}</td>
                                    <td>{estacionamiento.ubicacion}</td>
                                    <td>Lugares libres: {estacionamiento.lugaresLibres}</td>
                                    <td>{estacionamiento.observaciones}</td>
                                    <td>
                                        <div>
                                        <a className="btn btn-primary" role="button" href={estacionamiento.mapa} target="_blank" rel="noreferrer">📍 Ubicación</a>{' '}
                                        &nbsp;
                                            <button type="button" className="btn btn-success btn"
                                                onClick={() => this.estacionar(estacionamiento.idPlayaDeEstacionamiento, this.props.usuario.idUsuario)}>✔️Estacionar</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="verEstacionamientoVolver">
                        <Link to={"/"} className="btn btn-warning btn" style={{width: '110px', marginleft: '50%', color: 'white'}}>Volver</Link>
                        </div>
                    </div>                    
                </div>


            );
        }
    }


}

export default VerEstacionamiento;