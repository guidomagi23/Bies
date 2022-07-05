import React from 'react';

import AgregarEstacionamiento from "./AgregarEstacionamiento";
import AgregarHorario from "./AgregarHorario";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import CrearEstacionamiento from "./CrearEstacionamiento";
import EditarEstacionamiento from "./EditarEstacionamiento";
import EditarHorario from "./EditarHorario";
import CrearHorario from "./CrearHorario";
import '../css/login.css';

class AbmEstacionamiento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <div className="nav navbar-nav">
                        <Link className="nav-item nav-link active " to={"/"}>⚙️PANEL DE ADMINISTRACIÓN</Link>
                    </div>
                </nav>

                <div className="container-sm">
                    <Route exact path="/" component={AgregarEstacionamiento}></Route>
                    <Route path="/CrearEstacionamiento" component={CrearEstacionamiento}></Route>
                    <Route path="/EditarEstacionamiento/:id" component={EditarEstacionamiento}></Route>                   
                </div>
                        
                <div className="container-sm">
                    <Route exact path="/" component={AgregarHorario}></Route>
                    <Route path="/CrearHorario" component={CrearHorario}></Route>
                    <Route path="/EditarHorario/:id" component={EditarHorario}></Route>                   
                </div>
            </Router>

        );
    }
}

export default AbmEstacionamiento;