import React, { Component, useState } from "react";
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";

const cookies = new Cookies();

class Applicant extends Component{

    constructor(){
        super();
        if(cookies.get('id') === undefined) window.location.href = "./login"
        this.state = {
            id: cookies.get('id'),
            tasks: [],
            nombre: '',
            Requisitos: [],
            load2: false,
            modalVer: false,
            modalCargar: false,
            load: true,
            data: {},
            puesto: '',
            profile:{
                nombre: '',
                fecha: '',
                apellido: '',
                correo: '', 
                direccion: '',
                telefono: '',
                cv: '',
                primera_vez: '',
                depa: '',
                puestoID: ''
            }

        }

    }

    render(){
        return <div>
            {(() => {
            if(this.state.load == true){
                return<Container>
                <div class="load">
                <hr/><hr/><hr/><hr/>
                </div>
                </Container>
                
            }else{
                return (
                   <div>
                       <Menu this = {this}/>
                        <Fethc this = {this}/>
                        <Ver this = {this}/>
                        <Expediente this = {this} />     
                   </div> 
                ); 
            }
        })()}
           <Load this= {this}/>
        </div>
    }

}

function Expediente(props){
    return(
        <Modal isOpen={props.this.state.modalExpediente} fade={false}>
            <ModalHeader>
            <div><h3>Cargar Expediente</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    DATOS 
                </label>
                <Button
                color="primary"
                onClick={() => props.this.mostrarModalVer()}
                >
                Ver
                </Button>  
                </FormGroup>
               
                


            </ModalBody>
            <ModalFooter>  
            <Button
                color="primary"
                onClick={() => props.this.Editar()}
                >
                Editar Datos
            </Button>      
            <Button
            color="danger"
            onClick={() => props.this.cerrarModalVer()}
            >
            Cancelar
            </Button>
            </ModalFooter>
        </Modal> 
    );

}

function Load(props){
    return (
        <Modal isOpen={props.this.state.load2} fade={false}>
        <div class="load">
        <hr/><hr/><hr/><hr/>
        </div>
        </Modal>
    );
}


function Menu(props){
    return ( <div>
        <nav role="navigation">
        <div id="menuToggle">
        <input type="checkbox"/>
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
        <button onClick={()=>props.this.cerrarSesion()}><li>Cerrar Sesion</li></button>
        </ul>
        </div>
        </nav>
        <div className='xml'>
        <h2>Expediente de: {props.this.state.nombre}</h2>
        </div>
        </div>
    );
}


function Ver(props) {
    return(
        <Modal isOpen={props.this.state.modalVer} fade={false}>
            <ModalHeader>
            <div><h3>Aplicante</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    CUI: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    readOnly
                    value = {props.this.state.data.cui}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Nombre: 
                </label>
                <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    value = {props.this.state.data.nombre}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Apellido: 
                </label>
                <input
                    className="form-control"
                    name="Apellido"
                    type="text"
                    value = {props.this.state.data.apellido}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Correo: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    value = {props.this.state.data.correo}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Direccion: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    value = {props.this.state.data.direccion}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Telefono: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    value = {props.this.state.data.telefono}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    CV: 
                </label>
                <Button
                color="primary"
                onClick={() => props.this.Editar()}
                >
                Ver
                </Button> 
                </FormGroup>
            </ModalBody>
            <ModalFooter>  
            <Button
                color="primary"
                onClick={() => props.this.Editar()}
                >
                Editar Datos
            </Button>      
            <Button
            color="danger"
            onClick={() => props.this.cerrarModalVer()}
            >
            Cancelar
            </Button>
            </ModalFooter>
        </Modal>   
    );
}


function Fethc(props) {
    return(
        <Container>
        <Table>
            <thead>
            <tr>
                <th>Requisito</th>
                <th>Ver</th>
                <th>Corregir</th>
            </tr>
            </thead>

            {props.this.state.tasks.map((dato) => (
                (() => {
                    if(dato.apto == 1){
                        return <Ifyes dato = {dato} this= {props.this}/>
                    }else if(dato.apto == 0){
                        return <Elsen dato = {dato} this = {props.this}/>
                    }else if(dato.apto == 2){
                        return <Nothing dato = {dato} this = {props.this}/>
                    }
                })()
            ))}

        </Table>
        </Container>
    );
}

function Ifyes(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#81C784"}}>
        <tr key={dato.id} >
        <td>{dato.nombre}</td>
        <td>{dato.puesto}</td>
        <td>{dato.fecha}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}
            >
            Ver
            </Button>
        </td>    
        <td>
            <Button
            onClick={() => props.this.decargarCV(dato.cv)}>
            Descargar
            </Button>
        </td>
        <td>
            <Button color="danger" 
            onClick={()=> props.this.rechazar(dato)}>
            Rechazar</Button>
        </td>
        </tr>
        </tbody>
    );    
}

function Elsen(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#F44336"}}>
        <tr key={dato.id}>
        <td>{dato.nombre}</td>
        <td>{dato.puesto}</td>
        <td>{dato.fecha}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}
            >
            Ver
            </Button>
        </td>    
        <td>
            <Button
            onClick={() => props.this.decargarCV(dato.cv)}>
            Descargar
            </Button>
        </td>
        <td>
            <Button
            color="success"
            onClick={() => props.this.Aceptar(dato)}
            >
            Aceptar
            </Button>
        </td>
        </tr>
        </tbody>
    );
}

function Nothing(props) {
    var dato = props.dato;
    return(
        <tbody >
        <tr key={dato.id} >
        <td>{dato.nombre}</td>
        <td>{dato.puesto}</td>
        <td>{dato.fecha}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}>
            Ver
            </Button>
        </td>    
        <td>
            <Button
            onClick={() => props.this.decargarCV(dato.cv)}>
            Descargar
            </Button>
        </td>
        <td>
            <Button
            color="success"
            onClick={() => props.this.Aceptar(dato)}
            >
            Aceptar
            </Button>
            <Button color="danger" 
            onClick={()=> props.this.rechazar(dato)}>
            Rechazar</Button>
        </td>
        </tr>
        </tbody>
    );   
}


export default Applicant;