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
            load2: true,
            modalVer: false,
            modalCargar: false,
            load: true,
            data: {},
            profile:{
                nombre: '',
                fecha: '',
                apellido: '',
                correo: '', 
                direccion: '',
                telefono: '',
                cv: '',
                primera: '',
                depa: '',
                puestoID: '',
                puesto: ''
            },
            arreglo: ''
        }
        this.fetchProfile();
        
    }

    cerrarSesion(){
        cookies.remove('id', {path: "/"});
        window.location.href='./';
    }

    fetchProfile(){
        fetch('/selectPr', {
            method: 'POST',
            body: JSON.stringify({
                cui: this.state.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({profile: data});
                this.fetchRequisitos(data.puestoID);
            })
            .catch(err => console.error(err));
    }

    Comprobar(){
        if(this.state.profile.primera == 1 ){
            this.setState({modalCargar: true, load2: false});
        }
    }

    fetchRequisitos(id){
        fetch('/requisitos', {
            method: 'POST',
            body: JSON.stringify({
                puesto: id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({Requisitos: data});
                this.Comprobar()
            })
            .catch(err => console.error(err));
    }
    mostrarModalVer(){
        this.setState({modalVer: true})
    }
    Cargar(){

    }

    cerrarModalCargar(){
        this.setState({modalCargar: false})
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          profile:{
              ...this.state.data,
              [name]: value
          },
        });
    }
    Editar(){

    }
    cerrarModalVer(){
        this.setState({modalVer: false});
    }
    hacerArreglo(formatos){
        var aux = ""
        formatos.map((requi, index) =>
            {
                
                if(index != 0){
                    aux += ","
                }
                aux += "."
                aux += requi.formato
            })
        console.log(aux)
        return aux;
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
                            
                    </div> 
                    ); 
                }
            })()}
            <Menu this = {this}/>
            <Ver this = {this}/>
            <Expediente this = {this} /> 
           <Load this= {this}/>
        </div>
    }

}

function Expediente(props){
    return(
        <Modal isOpen={props.this.state.modalCargar} fade={false}>
            <ModalHeader>
            <div><h3>Cargar Expediente para el puesto {props.this.state.profile.puesto}</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    DATOS 
                </label>
                <Button style={{float: 'right'}}
                color="primary"
                onClick={() => props.this.mostrarModalVer()}
                >
                Ver
                </Button>  
                </FormGroup>
                {
                    props.this.state.Requisitos.map(requi =>
                        <div>
                        {
                            <FormGroup>
                            <label>
                                {(() => {
                                    if(requi.obligatorio == 1){
                                        return<text>*</text>
                                    }
                                })()}
                                {requi.requisito}({props.this.hacerArreglo(requi.formatos)}): 
                            </label>
                            <input
                                className="form-control"
                                name={requi.requisito}
                                type="file"
                                max-size={requi.tamanio * 1024}
                                multiple={false}
                                accept={props.this.hacerArreglo(requi.formatos)}
                                onChange={props.this.handleChangeF}
                                required
                            />
                            </FormGroup>
                        }
                        </div>
                    )
                }
                <i>* Obligatorio cargar archivo</i>
            </ModalBody>
            <ModalFooter>  
            <Button
                color="succes"
                onClick={() => props.this.Cargar()}
                >
                 Cargar Expediente
            </Button>      
            <Button
            color="danger"
            onClick={() => props.this.cerrarModalCargar()}
            >
            Cerrar
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
        <h2>Expediente de: {props.this.state.profile.nombre}</h2>
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
                    value = {props.this.state.id}
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
                    onChange={props.this.handleChange}
                    value = {props.this.state.profile.nombre}
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
                    onChange={props.this.handleChange}
                    value = {props.this.state.profile.apellido}
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
                    onChange={props.this.handleChange}
                    value = {props.this.state.profile.correo}
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
                    onChange={props.this.handleChange}
                    value = {props.this.state.profile.direccion}
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
                    onChange={props.this.handleChange}
                    value = {props.this.state.profile.telefono}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    CV: 
                </label>
                <Button style={{float: 'right'}}
                color="primary"
                onClick={() => props.this.DescargarCV(props.this.state.profile.cv)}
                >
                Ver
                </Button> 
                </FormGroup>
                <FormGroup>
                <label>
                    Cargar nuevamente CV
                </label>
                <input
                className="form-control"
                name="cv"
                type="file"
                multiple={false}
                accept=".pdf"
                onChange={props.this.handleChangeF}
                />
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
/*

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

*/
export default Applicant;