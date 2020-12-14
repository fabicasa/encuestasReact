import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export const FormularioEncuesta =(props)=>{
    let history = useHistory();

    const {id}= props.match ? props.match.params : { id : 0};
    const [titulos, setTitulos] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaIniciollenado, setFechaIniciollenado] = useState('')
    const [fechaFinalizacionllenado, setFechaFinalizacionllenado] = useState('')
    const [requiereCorreos, setRequiereCorreos] = useState(1)
    const [requiereInicioSesion, setRequiereInicioSesion] = useState(1)
    const [contarRespuestas, setContarRespuestas] = useState('')
    const [estado, setEstado] = useState(0)

            useEffect(() => {
            if(id===0){
                return
            }  
            getDatosEncuesta(id)     
    }, [id])
    const getDatosEncuesta=(id)=>{
        Axios.get('http://localhost:8000/api/encuestas/' + id)
        .then(response=>{
           // console.log(response.data.data);
            const encuesta= response.data.data;
            setTitulos(encuesta.titulos);
            setDescripcion(encuesta.descripcion);
            setFechaIniciollenado(encuesta.fechaIniciollenado);
            setFechaFinalizacionllenado(encuesta.fechaFinalizacionllenado);
            setRequiereCorreos(encuesta.requiereCorreos);
            setRequiereInicioSesion(encuesta.requiereInicioSesion);
            setContarRespuestas(encuesta.contarRespuestas);
            setEstado(encuesta.estado);
        });
    }
   /*  const agregarPregunta=()=>{
        setEncuesta
    } */
    /* const Input=(props)=>{
        return{
            
        }
    } */
    const clickGuardarDatos=()=>{
        const encuesta ={
            titulos,
            descripcion,
            fechaIniciollenado,
            fechaFinalizacionllenado,
            requiereCorreos,
            requiereInicioSesion,
            contarRespuestas,
            estado

        };
        if(id===0){
            insertarEncuesta(encuesta);
        }else{
            actualizarEncuesta(encuesta);
        }
    }
    const actualizarEncuesta =(encuesta)=>{
        Axios.put("http://localhost:8000/api/encuestas/" + id , encuesta)
        .then(response=>{
            if(response.data.res==="success"){
                history.push('/encuestas');
            }else{
                console.log(response.data);
                alert('Hubo un error al actualizar encuesta');
            }
        });
    }
    const insertarEncuesta = (encuesta) => {
        Axios.post("http://localhost:8000/api/encuestas/" , encuesta)
        .then(response=>{
            if(response.data.res==="success"){
                history.push('/encuestas');
            }else{
                console.log(response.data);
                alert('Hubo un error al registrar encuesta');
            }
        });
    }
    return(
    <div className="mt-3">
            <Card >
            <Card.Body>
                <Card.Title>Formulario Encuesta</Card.Title>
                <Card.Text></Card.Text>
                    <Form.Group >
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control onChange={(e)=>{setTitulos(e.target.value)}}type="text" value={titulos} placeholder="Ingrese el Titulo" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control onChange={(e)=>{setDescripcion(e.target.value)}} type="text" value={descripcion} placeholder="Ingrese el Descripción" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Fecha inicio</Form.Label>
                        <Form.Control onChange={(e)=>{setFechaIniciollenado(e.target.value)}} type="date" value={fechaIniciollenado} placeholder="Ingrese el Fecha Inicial" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>fecha Final</Form.Label>
                        <Form.Control onChange={(e)=>{setFechaFinalizacionllenado(e.target.value)}} type="date" value={fechaFinalizacionllenado} placeholder="Ingrese el Fecha Final" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Requiere Correo</Form.Label>
                        <Form.Control onChange={(e) => { setRequiereCorreos(e.target.value) }} value={requiereCorreos} as="select">
                            <option value="0">Sí</option>
                            <option value="1">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Requiere Inicio Sesion</Form.Label>
                        <Form.Control onChange={(e) => { setRequiereInicioSesion(e.target.value) }} value={requiereInicioSesion} as="select">
                            <option value="0">Sí</option>
                            <option value="1">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Contar Respuesta</Form.Label>
                        <Form.Control onChange={(e)=>{setContarRespuestas(e.target.value)}} type="text" value={contarRespuestas} placeholder="  " />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control onChange={(e) => { setEstado(e.target.value) }} value={estado} as="select">
                            <option value="0">Cerrada</option>
                            <option value="1">Abierta</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="dark" className="mb-6">
                        Añadir pregunta
                    </Button>

                    <br></br>
                    <br></br>
                    <Button onClick={()=>{clickGuardarDatos()}}  variant="primary" type="submit">
                        Guardar datos
                        </Button>
                </Card.Body>
            </Card>
    </div>
    )
    }
