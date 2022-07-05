import React from 'react';
import { ListaDesplegableEstacionamiento } from './ListaDesplegableEstacionamiento';

export default class SeleccionarEstacionamiento extends React.Component {
    constructor() {
        super()
        this.state = {
            collection: [],
            value: ''
        }
    }
    componentDidMount() {
        fetch('http://localhost/bies-react/abm.php?listar')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))
    }

    // onChange = (event) => {
    //     this.setState({ value: event.target.value });
    // }
    

    render() {
        return (
            <div>
                <ListaDesplegableEstacionamiento
                    name={this.state.nombrePlayaDeEstacionamiento}
                    options={this.state.collection}
                    onChange={this.props.onChange}
                    value = {this.state.value}
                />
            </div>
        )
    }
}