import React, { Component, useState } from "react";
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';


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
            modalCorregir: false,
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
            nuevoCV: null,
            arreglo: ''
        }
        this.handleChange = this.handleChange.bind(this);
        //this.handleChangeF = this.handleChangeF.bind(this);
        this.handleChangeC = this.handleChangeC.bind(this);
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

    fetchProfile2(){
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
                this.setState({profile: data, load2:false});
            })
            .catch(err => console.error(err));
    }

    Comprobar(){
        console.log('KHE')
        if(this.state.profile.primera == 1){
            this.setState({modalCargar: true, load2: false});
        }else{
            this.setState({load2:false});
            this.Archivos();
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

    cerrarModalCargar(){
        this.setState({modalCargar: false})
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          profile:{
              ...this.state.profile,
              [name]: value
          },
        });
    }
    Editar(){
        this.setState({load2: true})
        //if(this.state.nuevoCV ==  null) this.setState({nuevoCV: this.state.profile.cv});
        fetch('/updateAp', {
            method: 'PUT',
            body: JSON.stringify({
                cui: this.state.id,
                nombre: this.state.profile.nombre,
                apellido: this.state.profile.apellido,
                correo: this.state.profile.correo,
                direccion: this.state.profile.direccion,
                telefono: this.state.profile.telefono,
                cv: this.state.nuevoCV
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchProfile2();
            })
            .catch(err => console.error(err));
        this.cerrarModalVer();
        this.fetchProfile2();
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

    handleChangeC(e){
        const formData = new FormData();
        formData.append(
            "file",
            e.target.files[0]
        );
        this.setState({load2: true})
        axios.post("/upload",formData, {})
        .then(res => {
            this.setState({nuevoCV: res.data.msg, load2: false})
        })
    }
    primera(){
        fetch('/primera', {
            method: 'PUT',
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
                this.Archivos()
            })
            .catch(err => console.error(err));
        this.Archivos()
    }

    Cargar(){
        this.setState({load2: true})
        console.log(this.state.Requisitos);
        for (const requi of this.state.Requisitos){
            if(requi.obligatorio == 1 && requi.util == null){
                window.alert("Requisitos obligatorios SIN CARGAR");
                this.setState({load2: false})
                return;
            }
        }
        for (const requi of this.state.Requisitos){
            if(requi.util == null) continue;
            fetch('/archivo', {
                method: 'POST',
                body: JSON.stringify({
                    ruta: requi.util,
                    cui: this.state.id,
                    prid: requi.id
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.error(err));
        }
        window.alert("Expediente enviado para revisar correctamente")
        this.primera();
        this.setState({modalCargar: false, load2:false})
    }

    handleChangeF(e, requi) {
        console.log(e, requi)
        this.setState({load2: true})
        console.log(e.size)
        if(e.size > requi.tamanio * 1048576){
            window.alert(`El archivo supera el limite del tamaño permitido (${requi.tamanio})MB`);
            this.setState({load2: false})
            return;
        }
        const formData = new FormData();
        formData.append(
            "file",
            e
        );
        axios.post("/uploadExp",formData, {})
        .then(res => {
            requi.util = res.data.msg
            this.setState({load2: false})
        })
    }

    Archivos(){
        fetch('/selectExp', {
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
                this.setState({tasks: data, load: false});
            })
            .catch(err => console.error(err));
    }

    descargarExp(cv){
        this.setState({load2: true})
        fetch('/controller2', {
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

    mostrarModalCorregir(){

    }

    render(){
        return <div>
            <Menu this = {this}/>
            <Ver this = {this}/>
            <Expediente this = {this} /> 
            <Load this= {this}/>
            <div className="box"></div>
            <Container>
               <Tabs>
                   <TabList>
                       <Tab>Expediente</Tab>
                       <Tab>CHAT</Tab>
                   </TabList>
                   <TabPanel>
                   {(() => {
                        if(this.state.load == true){
                            return<Container>
                            <div class="load">
                            <hr/><hr/><hr/><hr/>
                            </div>
                            </Container>
                        }else{
                            return (
                                <Fethc this = {this}/>
                            ); 
                        }
                    })()}
                   </TabPanel>
                   <TabPanel>
                       <h2>CHAT xD</h2>
                   </TabPanel>
               </Tabs>
            </Container>
            
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
                                        return<text style={{ color: 'red' }}>* </text>
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
                                onChange={e => props.this.handleChangeF(e.target.files[0], requi)}
                                required
                            />
                            </FormGroup>
                        }
                        </div>
                    )
                }
                <i>* Requisito Obligatorio</i>
            </ModalBody>
            <ModalFooter>  
            <Button
                color="success"
                onClick={() => props.this.Cargar()}
                >
                 Cargar Expediente
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
    return (<div> 
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
         <h2>Bienvenido {props.this.state.profile.nombre} {props.this.state.profile.apellido}</h2>
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
                    {props.this.state.profile.cv}
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
                onChange={props.this.handleChangeC}
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


function Fethc(props) {
    return(
        <Container>
        <div className='xml'>
         <h3>Requisitos para {props.this.state.profile.puesto}</h3>
         </div>
         <div className="box"></div>
        <Table>
            <thead>
            <tr>
                <th>Requisito</th>
                <th>Estado</th>
                <th>Ver</th>
            </tr>
            </thead>
            {props.this.state.tasks.map((dato) => (
                (() => {
                    if(dato.aceptado == 1){
                        return <Ifyes dato = {dato} this= {props.this}/>
                    }else if(dato.aceptado == 0){
                        return <Elsen dato = {dato} this = {props.this}/>
                    }else if(dato.aceptado == 2){
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
        <td>{dato.requisito}</td>
        <td>Aceptado</td>
        <td>
            <Button
            onClick={() => props.this.decargarExp(dato.archivo)}>
            Descargar
            </Button>
        </td>
        </tr>
        </tbody>
    );    
}

function Elsen(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#F44336"}}>
        <tr key={dato.id} >
        <td>{dato.requisito}</td>
        <td>Rechazado</td>
        <td>
            <Button
            onClick={() => props.this.decargarExp(dato.archivo)}>
            Descargar
            </Button>
        </td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalCorregir(dato)}>
            Corregir
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
        <td>{dato.requisito}</td>
        <td>Sin revisar</td>
        <td>
            <Button
            onClick={() => props.this.descargarExp(dato.archivo)}>
            Descargar
            </Button>
        </td>
        </tr>
        </tbody>
    );   
}


export default Applicant;