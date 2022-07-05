import React from 'react';
import { Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import VerEstacionamiento from "./VerEstacionamiento";
import '../css/login.css';
import ListarEstacionamientos from './ListarEstacionamientos';
import { NavBar } from './NavBar';


class ListaEstacionamiento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        
    }
    
    render() {
        return (
            <Router>  
                <NavBar />
                <div className="container">
                    <Route exact path="/" render={(props) => <ListarEstacionamientos usuario={this.props.usuario} />}></Route>
                    <Route path="/VerEstacionamiento/:id" render={(props) => <VerEstacionamiento usuario={this.props.usuario} {...props}/>}></Route>
                    <Route path="/*" render={() => <Redirect to="/" />}></Route>
                </div>
            </Router>            
        );
    }
}

export default ListaEstacionamiento;