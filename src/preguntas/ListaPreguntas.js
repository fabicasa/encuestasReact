import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import {Card,Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const ListaPreguntas =(props)=>{

    moment.locale('es');
    const[listaPreguntas,setListaPreguntas]=useState([]);
        useEffect (() => {
        loadPreguntas();      
        }, [])
        const loadPreguntas=()=>{
            Axios.get("http://localhost:8000/api/preguntas/")
            .then((response)=>{
            console.log(response.data); 
            setListaPreguntas(response.data.data);   
            });
        }
        const eliminarPregunta = (id) =>{
            let confirmation =window.confirm('¿Está seguro que desea eliminar el Pregunta?');
            if(!confirmation){
            return;
            }

        Axios.delete('http://localhost:8000/api/preguntas'+id)
        .then(response=>{
            if(response.data.res==="success"){
                loadPreguntas();
            }else{
            console.log(response.date);
            alert('Hubo un error al borrar una Pregunta');
            }
        });
        }
        const TipoPreguntaForDisplay = (tipoPregunta) => {
            switch (tipoPregunta) {
                case 0:
                    return 'RadioButton';
                case 1:
                    return 'Checkbox';
                case 2:
                    return 'Input';
                case 3:

                    return 'Archivo';
                case 4:
                    return 'Textarea';
                default:
                    break;
            }
        }
        return (<div className="mt-3">
    <Card >
            <Card.Body>
            <Card.Title>Lista de Preguntas</Card.Title>
            <Card.Text>
            <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TITULOS</th>
                    <th>TIPO PREGUNTA</th>
                    <th>CANTIDAD DE ARCHIVOS</th>
                    <th>ORDEN ESPECIFICO</th>
                    <th>ENCUESTA</th>
                    
                </tr>
            </thead>
                        <tbody>
                            {listaPreguntas.map((item)=>
                                <tr key={"Pregunta-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.titulos}</td> 
                                        <td>{TipoPreguntaForDisplay(item.tipoPregunta)}</td>
                                        <td>{item.cantidadArchivos}</td>
                                        <td>{item.ordenEspecifico}</td>
                                        <td>{item.dueno.titulos}</td>
                                        
                                        <td>
                                        <Link to ={"/preguntas/edit/" + item.id} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                        <a href="javascrip:void(0)" onClick={()=>{eliminarPregunta(item.id)}} className="btn btn-danger">Eliminar</a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </Table>
                        </Card.Text>
                    </Card.Body>
                </Card>
    </div>)
}