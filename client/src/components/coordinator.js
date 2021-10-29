import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
import Swal from 'sweetalert2'


class Coordinador extends Component{
    constructor(props) {
        super(props);
       
        this.state = {
            id: this.props.id,
            tasks: [],
            tasks2: [],
            load2: false,
            modalVer: false,
            load: true,
            depa:{
                id: '',
                nombre: ''
            },
            profile:{},
            data: {}
        };
        this.fetchDepas();
    }


    fetchDepas(){
        fetch('/depasr', {
            method: 'POST',
            body: JSON.stringify({
                per: this.state.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({depa:{
                    id: data.id,
                    nombre : data.nombre
                }});
                console.log(data.id)
                this.fetchSelect(data.id)
                this.fetchSelect2(data.id)
            })
            .catch(err => console.error(err));
    }

    fetchSelect(id){
        fetch('/selectPl', {
            method: 'POST',
            body: JSON.stringify({
                depa: id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(data);
            })
            .catch(err => console.error(err));
    }

    fetchSelect2(id){
        console.log(this.state.depa)
        fetch('/selectPl2', {
            method: 'POST',
            body: JSON.stringify({
                depa: id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({tasks2: data, load: false});
                console.log(data);
            })
            .catch(err => console.error(err));
    }


    cerrarSesion(){
        window.location.href='../';
    }

    mostrarModalVer(dato){
        this.setState({modalVer: true, data:dato})
    }
    cerrarModalVer(){
        this.setState({modalVer: false})
    }

    DescargarCV(cv){
        this.setState({load2: true})
        fetch('/controller', {
            method: 'POST',
            body: JSON.stringify({
                d:cv
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                  new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                  'download',
                  `${cv}`,
                );
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link.click();
                this.setState({load2: false})
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }

    Aceptar(data){
        this.setState({load: true})
        fetch('/insertPl', {
            method: 'POST',
            body: JSON.stringify({
                cui: data.cui,
                correo: data.correo,
                name: data.nombre,
                depa: this.state.depa.id,
                dp: data.dpid
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Hecho!',
                    data.msg,
                    'success'
                )
                this.fetchSelect(this.state.depa.id); 
                this.fetchSelect2(this.state.depa.id); 
            })
            .catch(err => console.error(err));   
    }

    rechazar(data){
        this.setState({load2: true})
        fetch('/updatePl', {
            method: 'PUT',
            body: JSON.stringify({
                cui: data.cui,
                estado: '0'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Hecho!',
                    data.msg,
                    'success'
                )
                this.fetchSelect(this.state.depa.id); 
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
    }

    despedir(data){
        this.setState({load2: true})
        fetch('/updatePl', {
            method: 'PUT',
            body: JSON.stringify({
                cui: data.cui,
                estado: '3'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Hecho!',
                    data.msg,
                    'info'
                )
                this.fetchSelect2(this.state.depa.id); 
                this.setState({load2: false})
            })
            .catch(err => console.error(err));   
    }

    render(){
        return <div>
            <Menu this = {this}/>
            <Ver this = {this}/>
            <div className="box"></div>
            <Container>
            <Tabs>
                   <TabList>
                       <Tab>Contratar</Tab>
                       <Tab>Planilla</Tab>
                   </TabList>
                   <TabPanel>
                   {(() => {
                        if(this.state.load === true){
                            return<Container>
                            <div class="load">
                            <hr/><hr/><hr/><hr/>
                            </div>
                            </Container>
                        }else{
                            return (
                                <div>
                                     <div className="xml">
                                         <h3>Aplicantes para contratar</h3>
                                     </div>
                                     <div className="box"></div>
                                     <Fethc this = {this}/>
                                </div>
                            ); 
                        }
                    })()}
                   </TabPanel>
                   <TabPanel>
                   {(() => {
                        if(this.state.load === true){
                            return<Container>
                            <div class="load">
                            <hr/><hr/><hr/><hr/>
                            </div>
                            </Container>
                        }else{
                            return (
                                <div>
                                     <div className="xml">
                                         <h3>Personal Contratado</h3>
                                     </div>
                                     <div className="box"></div>
                                     <Fethc2 this = {this}/>
                                </div>
                            ); 
                        }
                    })()}
                   </TabPanel>
               </Tabs>
            </Container>
           <Load this= {this}/>
        </div>
    }

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
        <h2>Coordinador del departamento: {props.this.state.depa.nombre}</h2>
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
                    name="id"
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
                    readOnly
                    value = {props.this.state.data.nombre}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Apellido: 
                </label>
                <input
                    className="form-control"
                    name="apellido"
                    type="text"
                    readOnly
                    value = {props.this.state.data.apellido}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Correo: 
                </label>
                <input
                    className="form-control"
                    name="correo"
                    type="text"
                    readOnly
                    value = {props.this.state.data.correo}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Direccion: 
                </label>
                <input
                    className="form-control"
                    name="direccion"
                    type="text"
                    readOnly
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
                    readOnly
                    value = {props.this.state.data.telefono}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    CV: 
                </label>
                <Button style={{float: 'right'}}
                color="primary"
                onClick={() => props.this.DescargarCV(props.this.state.data.cv)}
                >
                    {props.this.state.data.cv}
                </Button> 
                </FormGroup>
            </ModalBody>
            <ModalFooter>      
            <Button
            color="danger"
            onClick={() => props.this.cerrarModalVer()}
            >
            Cerrar
            </Button>
            </ModalFooter>
        </Modal>   
    );
}

function Fethc(props) {
    return(
        <Container>
        <br />
        <Table>
            <thead>
            <tr>
                <th>Nombre Completo</th>
                <th>Puesto</th>
                <th>Datos Personales</th>
                <th>Contratar</th>
            </tr>
            </thead>

            {props.this.state.tasks.map((dato) => (
                (() => {
                    if(dato.planilla === '0'){
                        return <Elsen dato = {dato} this = {props.this}/>
                    }else if(dato.planilla === '2'){
                        return <Nothing dato = {dato} this = {props.this}/>
                    }
                })()
            ))}

        </Table>
        </Container>
    );
}


function Elsen(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#F44336"}}>
        <tr key={dato.id}>
        <td>{dato.nombre} {dato.apellido}</td>
        <td>{dato.puesto}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}
            >
            Ver
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
        <td>{dato.nombre} {dato.apellido}</td>
        <td>{dato.puesto}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}>
            Ver
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

function Fethc2(props) {
    return(
        <Container>
        <br />
        <Table>
            <thead>
            <tr>
                <th>Nombre Completo</th>
                <th>Puesto</th>
                <th>Datos Personales</th>
                <th></th>
            </tr>
            </thead>

            {props.this.state.tasks2.map((dato) => (
                (() => {
                    if(dato.planilla === '3'){
                        return <Elsen2 dato = {dato} this = {props.this}/>
                    }else if(dato.planilla === '1'){
                        return <Nothing2 dato = {dato} this = {props.this}/>
                    }
                })()
            ))}
        </Table>
        </Container>
    );
}


function Elsen2(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#F44336"}}>
        <tr key={dato.id}>
        <td>{dato.nombre} {dato.apellido}</td>
        <td>{dato.puesto}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}
            >
            Ver
            </Button>
        </td>    
        </tr>
        </tbody>
    );
}

function Nothing2(props) {
    var dato = props.dato;
    return(
        <tbody >
        <tr key={dato.id} >
        <td>{dato.nombre} {dato.apellido}</td>
        <td>{dato.puesto}</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}>
            Ver
            </Button>
        </td>    
        <td>
            <Button color="danger" 
            onClick={()=> props.this.despedir(dato)}>
            Despedir</Button>
        </td>
        </tr>
        </tbody>
    );   
}

export default Coordinador;