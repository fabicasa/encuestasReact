import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const FormularioPregunta =(props)=>{
    let history = useHistory();

    const {id}= props.match ? props.match.params : { id : 0};
    const [titulos, setTitulos] = useState('')
    const [tipoPregunta, setTipoPregunta] = useState('')
    const [cantidadArchivos, setCantidadArchivos] = useState('')
    const [ordenEspecifico, setOrdenEspecifico] = useState('')
    const [encuesta_id, setEncuesta_id] = useState(1)
    const [listaEncuestas, setListaEncuestas] = useState([])
    
            useEffect(() => {
            loadEncuestas();    
            if(id===0){
                return
            }  
            getDatosPregunta(id)     
    }, [id])
    const loadEncuestas=()=>{
        Axios.get("http://localhost:8000/api/encuestas")
        .then((response)=>{
        console.log(response.data); 
        setListaEncuestas(response.data.data);
        if (response.data.data.length > 0) {
            setEncuesta_id(response.data.data[0].id)
        }   
        });
    }
    const getDatosPregunta=(id)=>{
        Axios.get('http://localhost:8000/api/preguntas/' + id)
        .then(response=>{
           // console.log(response.data.data);
            const pregunta= response.data.data;
            setTitulos(pregunta.titulos);
            setTipoPregunta(pregunta.tipoPregunta);
            setCantidadArchivos(pregunta.cantidadArchivos);
            setOrdenEspecifico(pregunta.ordenEspecifico);
            setEncuesta_id(pregunta.encuesta_id);
            });
    }
    const clickGuardarDatos=()=>{
        const pregunta ={
            titulos,
            tipoPregunta,
            cantidadArchivos,
            ordenEspecifico,
            encuesta_id,
            };
        if(id===0){
            insertarPregunta(pregunta);
        }else{
            actualizarPregunta(pregunta);
        }
    }
    const actualizarPregunta =(pregunta)=>{
        Axios.put("http://localhost:8000/api/preguntas/" + id , pregunta)
        .then(response=>{
            if(response.data.res==="success"){
                history.push('/preguntas');
            }else{
                console.log(response.data);
                alert('Hubo un error al actualizar Pregunta');
            }
        });
    }
    const insertarPregunta = (pregunta) => {
        Axios.post("http://localhost:8000/api/preguntas/" , pregunta)
        .then(response=>{
            if(response.data.res==="success"){
                history.push('/preguntas');
            }else{
                console.log(response.data);
                alert('Hubo un error al registrar Pregunta');
            }
        });
    }
    return(
    <div className="mt-3">
            <Card >
            <Card.Body>
                <Card.Title>Formulario Pregunta</Card.Title>
                <Card.Text></Card.Text>
                    <Form.Group >
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control onChange={(e)=>{setTitulos(e.target.value)}}type="text" value={titulos} placeholder="Ingrese el Titulo" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo de Pregunta</Form.Label>
                        <Form.Control onChange={(e) => { setTipoPregunta(e.target.value) }} value={tipoPregunta} as="select">
                            <option value="0">RadioButton</option>
                            <option value="1">Checkbox</option>
                            <option value="2">Input</option>
                            <option value="3">Archivo</option>
                            <option value="4">TextArea</option>
                        </Form.Control>
                        </Form.Group>
                    <Form.Group >
                        <Form.Label>Cantidad de archivos a guardar</Form.Label>
                        <Form.Control onChange={(e)=>{setCantidadArchivos(e.target.value)}} type="number" value={cantidadArchivos} placeholder="Ingrese cantidad Archivos" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>OrdenEspecifico</Form.Label>
                        <Form.Control onChange={(e)=>{setOrdenEspecifico(e.target.value)}} type="number" value={ordenEspecifico} placeholder="Ingrese Orden Especifico" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Encuesta</Form.Label>
                        <Form.Control onChange={(e) => {
                            console.log(e.target.value);
                            setEncuesta_id(e.target.value)
                        }} value={encuesta_id} as="select">
                            {listaEncuestas.map(item =>
                                <option value={item.id}>{item.titulos}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={()=>{clickGuardarDatos()}}  variant="primary" type="submit">
                        Guardar datos
                        </Button>
                </Card.Body>
            </Card>
    </div>
    )
    }
