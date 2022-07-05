import React from "react";

export const NavBar = () => {
    const img = require('../imagenes/logo_negro.png');
    const nombre = 'Logo Empresarial';
    return (
        <header className="header" style={{backgroundColor: "black",height: "50px"}}>
            <img src={img} alt={nombre} style={{height: "50px",width: "393px"}}/>               
        </header>
    )
}