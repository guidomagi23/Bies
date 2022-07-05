import Login from "./components/Login";
import React, { useState } from 'react';


import ListaEstacionamientos from "./components/ListaEstacionamientos";
import AbmEstacionamiento from "./components/AbmEstacionamiento";


function App() {
  const [usuario, setUsuario] = useState({});
  const acceder = (estado) => {
    setUsuario(estado)
  }

  //console.log("IDUSUARIOLOG: ", usuario);

  const project = () => {
    switch (usuario.idRol) {
      case 1: return <AbmEstacionamiento />;
      case 2: return <ListaEstacionamientos usuario={usuario} />;

      default: return <h1>Error...</h1>
    }

  }
  return (


    <>
      {
        (usuario?.idRol)
          ? project()
          : <Login acceder={acceder} />

      }



    </>

  );
}

export default App;

