import React from 'react'

export default function SeleccionarDiaSemana (props) {


    const estadoDia=(event)=>{ 
        props.handler(event.target.value)   
    }     
    
    return( 
        <div> 
                <select required className="form-control" defaultValue={props.nombreDia} onChange={estadoDia} > 
                <option name="default-option" value="" hidden>Selecciona un día</option>
                    <option value="LUNES">Lunes</option>
                    <option value="MARTES">Martes</option>
                    <option value="MIERCOLES">Miercoles</option>
                    <option value="JUEVES">Jueves</option>
                    <option value="VIERNES">Viernes</option>
                    <option value="SABADO">Sabado</option>
                    <option value="DOMINGO">Domingo</option>
                </select>
            </div>
        )
    }

