import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ListaEncuestas } from './encuestas/ListaEncuestas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormularioEncuesta } from './encuestas/FormularioEncuesta.js';
import { FormularioPregunta } from './preguntas/FormularioPregunta.js';
import { ListaPreguntas } from './preguntas/ListaPreguntas';
import {Login} from './auth/Login';
function App() {
  return (
    <BrowserRouter>
          <Header></Header>
      <Container>
        <Switch>
            <Route exact path="/encuestas">
              <ListaEncuestas></ListaEncuestas>
            </Route> 
            <Route path="/encuestas/create">
              <FormularioEncuesta></FormularioEncuesta>
            </Route>
            <Route path="/encuestas/edit/:id" component={FormularioEncuesta}>
            </Route>
             {/*  <Route exact path="/preguntas">
              <ListaPreguntas></ListaPreguntas>
            </Route>  */}
            <Route path="/preguntas/encuestaId/:id" component={FormularioPregunta}>
              <ListaPreguntas></ListaPreguntas>
            </Route> 
           {/*  <Route path="/preguntas/create">
              <FormularioPregunta></FormularioPregunta>
            </Route> */}
             <Route path="/respuestas/">
              <FormularioPregunta></FormularioPregunta>
            </Route>
            <Route path="/preguntas/edit/:id" component={FormularioPregunta}>
            </Route>
            <Route path="/login" >
            <Login></Login>
            </Route>
            <Route path="/" >
            <ListaEncuestas></ListaEncuestas>
            </Route>
        </Switch>
      </Container>
      </BrowserRouter>
  );
}


export default App;
