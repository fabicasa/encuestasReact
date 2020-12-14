import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
    export const Login=(props)=>{
    const[email, setEmail] =useState('')
    const[password, setPassword] =useState('');
    const clickIniciarSesion = () =>{
        const datos = {
            email,
            password
            };
        console.log(datos);
            
    }
    return (
        <div className="mt-3">
            <Card>
                <Card.Body>
                    <Card.Title>Iniciar sesión</Card.Title>
                    <Card.Text></Card.Text>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => { setEmail(e.target.value) }} type="text" value={email} placeholder="Ingrese el email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control onChange={(e) => { setPassword(e.target.value) }} type="password" value={password} placeholder="Ingrese la contraseña" />
                    </Form.Group>
                    <Button onClick={() => { clickIniciarSesion() }} variant="primary" type="submit">
                        Guardar datos
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}  