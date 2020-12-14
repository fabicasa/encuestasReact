import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import {Card,Table} from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/es' 
//import { useSelector } from 'react-redux';
export const ListaEncuestas =(props)=>{

   // let history = useHistory();
    //const token = useSelector(state => state.user.access_token);
  moment.locale('es');
  const[listaEncuestas,setListaEncuestas]=useState([]);

    useEffect (() => {
        loadEncuestas();      
        }, [])

        const loadEncuestas=()=>{
            //const headers = {
            //    "Authorization" :"Bearer " + token
            //};
            Axios.get("http://localhost:8000/api/encuestas/" )
            .then((response)=>{
            console.log(response.data); 
            setListaEncuestas(response.data.data);   
            //}).catch(error => {
            //    if(error.response.status === 401){
              //      history.push('/login');
               // }
            }); 
        }
        const eliminarEncuesta = (id) =>{
           // const headers = {
             //   "Authorization" :"Bearer " + token
           // };
            let confirmation =window.confirm('¿Está seguro que desea eliminar el encuesta?');
            if(!confirmation){
            return;
            }

        Axios.delete('http://localhost:8000/api/encuestas'+id )
        .then(response=>{
            if(response.data.res==="success"){
                loadEncuestas();

            }else{
            console.log(response.data);
            alert('Hubo un error al borrar una encuesta');
            }
       // }).catch(error => {
           // if(error.response.status === 401){
            //    history.push('/login');
            //}
        });
        }
        const requiereCorreosForDisplay = (requiereCorreos) => {
            switch (requiereCorreos) {
                case 0:
                    return 'Sí';
                    
                case 1:
                    return 'No';
                default:
                    break;
            }
        }
        const requiereInicioSesionForDisplay = (requiereInicioSesion) => {
            switch (requiereInicioSesion) {
                case 0:
                    return 'Sí';
                case 1:
                    return 'No';
                default:
                    break;
            }
        }
        const estadoForDisplay = (estado) => {
            switch (estado) {
                case 0:
                    return 'Cerrada';
                case 1:
                    return 'Abierta';
                default:
                    break;
            }
        }
        return (<div className="mt-3">
    <Card >
            <Card.Body>
            <Card.Title>Lista de todas las encuestas disponbles</Card.Title>
            <Card.Text>
            <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TITULOS</th>
                    <th>DESCRIPCION</th>
                  {/*   <th>FECHA INICIO LLENADO</th>
                    <th>FECHA FINALIZACION LLENADO</th>
                    <th>REQUIERE CORREO</th> */}
                    <th>REQUIERE INICIO SESION</th>
                    {/* //<th>CONTAR RESPUESTAS</th> */}
                    <th>ESTADO</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
                        <tbody>
                            {listaEncuestas.map((item)=>
                                <tr key={"encuesta-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.titulos}</td> 
                                        <td>{item.descripcion}</td>
                                      {/*   <td>{moment(item.fechaIniciollenado).format('DD/MM/YYYY')}</td>
                                        <td>{moment(item.fechaFinalizacionllenado).format('DD/MM/YYYY')}</td>
                                        <td>{requiereCorreosForDisplay(item.requiereCorreos)}</td> */}
                                        <td>{requiereInicioSesionForDisplay(item.requiereInicioSesion)}</td>
                                       {/*  <td>{item.contarRespuestas}</td> */}
                                        <td>{estadoForDisplay(item.estado)}</td>
                                        <td>
                                        <Link to={"preguntas/encuentaId/"+ item.id  } className="btn btn-success">Responder</Link>
                                        </td>
                                        <td>
                                        <Link to ={"/encuestas/edit/" + item.id} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                        <a href="javascrip:void(0)" onClick={()=>{eliminarEncuesta(item.id)}} className="btn btn-danger">Eliminar</a>
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