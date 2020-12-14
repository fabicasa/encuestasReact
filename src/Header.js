import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const Header =(props)=>{
    const cerrarSesion=()=>{
        
    }
    return ( <Navbar bg="dark" variant="dark">
    <Link  className="navbar-brand" to="/" >Encuestas Enlinea</Link>
<NavDropdown title="Mis Encuestas">
    <Link to ="/encuestas" className="dropdown-item">Lista de Encuestas</Link>
    <Link to ="/encuestas/create" className="dropdown-item">Crear Encuesta</Link>
    </NavDropdown>
<NavDropdown title="Mis Respuestas">
    <Link to ="/preguntas" className="dropdown-item">Lista de Respuestas</Link>
    <Link to ="/preguntas/create" className="dropdown-item">Crear pregunta</Link>
</NavDropdown>    

<Nav.Item className="ml-auto">
    <Nav.Link onclick={()=>{cerrarSesion()}}>Cerrar sesión</Nav.Link>
    </Nav.Item>
</Navbar>  )
}
