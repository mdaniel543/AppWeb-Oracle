import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Dropdown from 'react-dropdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

class Reviewer extends Component{
    constructor(){
        super();
        if(cookies.get('id') === undefined) window.location.href = "./login"
        this.state = {
            id: cookies.get('id'),
            load: true,
            laod2: false, 
            profile:{},
            modalBuscar:false,
            copy:[],
            modalVer: false,
            search:{
                nombre: null, 
                puesto: null, 
                estado: null
            },
            data: {
            },
            archivos: [],
            bus:false,
            expedientes:[],
            puestos:[],
            estados:["Sin revisar", "Aceptado", "Correccion"],


        };
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleChangeE = this.handleChangeE.bind(this);
        this.fetchDepa();
        this.fetchTasks();
    }
    fetchDepa(){
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
                this.fetchPuestos(data.id)
            })
            .catch(err => console.error(err));
    }

    fetchPuestos(id){
        console.log(this.state.depa);
        fetch('/puestos', {
            method: 'POST',
            body: JSON.stringify({
                depa : id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({puestos: data});
            })
            .catch(err => console.error(err));
    }

    fetchTasks(){
        fetch('/selectre', {
            method: 'POST',
            body: JSON.stringify({
                personal: this.state.id,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({expedientes: data, copy:data});
                this.setState({load: false})
            })
            .catch(err => console.error(err));
    }

    cerrarSesion(){
        cookies.remove('id', {path: "/"});
        window.location.href='./';
    }

    mostrarModalBuscar(){
        this.setState({modalBuscar:true})
    }

    handleChangeS(e){
        const { name, value } = e.target;
        this.setState({
          search:{
              ...this.state.search,
              [name]: value
          },
        });
    }

    handleChangeP(e){
        this.setState({
          search:{
              ...this.state.search,
              puesto: e.value
          },
        });
    }

    handleChangeE(e){
        this.setState({
          search:{
              ...this.state.search,
              estado: e.value
          },
        });
    }
    buscar(){
        this.setState({load2: true})
        console.log(this.state.search)
        var estado = null
        if(this.state.search.estado === 'Sin Revisar') estado = '2';
        if(this.state.search.estado === 'Aceptado') estado = '1';
        if(this.state.search.estado === 'Correccion') estado = '0';

        fetch('/searche', {
            method: 'POST',
            body: JSON.stringify({
                personal: this.state.id,
                pueston: this.state.search.puesto,
                estado: estado,
                nombree: this.state.search.nombre
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({expedientes: data});
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
        this.setState({bus: true, modalBuscar: false})
        this.setState({
            search:{
                ...this.state.search,
                nombre: null,
                puesto: null,
                fecha: null
            },
        });
    }
    cerrarModalBuscar(){
        this.setState({modalBuscar: false})
    }
    enviar(){

    }   
    cerrarModalVer(){
        this.setState({modalVer: false})
    }

    decargarExp(cv){
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
    aceptar(){

    }
    rechazar(){

    }
    cerrarBusqueda(){
        this.setState({expedientes: this.state.copy, bus: false})
    }
    mostrarModalVer(dato){
        this.setState({data: dato, modalVer: true})
        this.setState({archivos: dato.archivos})
    }

    render (){
        return(
            <div>
                <Menu this = {this}/>
                <Search this = {this}/>
                <Ver this = {this}/>
                <Load this = {this}/>
                <Container>
               <Tabs>
                   <TabList>
                       <Tab>Expedientes</Tab>
                       <Tab>CHAT</Tab>
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
        );
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
        <button onClick={()=>props.this.mostrarModalBuscar()}><li>Buscar</li></button>
        <div className='boxer'/>
        <button onClick={()=>props.this.cerrarSesion()}><li>Cerrar Sesion</li></button>
        </ul>
        </div>
        </nav>
        <div className='xml'>
        <h2>Revisor {props.this.state.profile.nombre}</h2>
        </div>
        <div className="box"></div>
        </div>
    );
}

function Search(props) {
    return(
        <Modal isOpen={props.this.state.modalBuscar} fade={false}>
            <ModalHeader>
            <div><h3>Buscar Expediente</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    Nombre: 
                </label>
                <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={props.this.handleChangeS}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Puesto
                </label>
                <Dropdown name = "puesto" 
                options={props.this.state.puestos} 
                onChange={props.this.handleChangeP} 
                value={props.this.state.search.puesto}
                 placeholder="--" />
                </FormGroup>
                <FormGroup>
                <label>
                    Estado
                </label>
                <Dropdown name = "estado" 
                options={props.this.state.estados} 
                onChange={props.this.handleChangeE} 
                value={props.this.state.search.estado}
                 placeholder="--" />
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => props.this.buscar()}
                >
                Buscar
                </Button>
                <Button
                color="danger"
                onClick={() => props.this.cerrarModalBuscar()}
                >
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>   
    );
}

function Ver(props) {
    return(
        <Modal isOpen={props.this.state.modalVer} fade={false}>
            <ModalHeader>
            <div><h3>Archivos del expediente de {props.this.state.data.nombre}</h3></div>
            </ModalHeader>
            <ModalBody>
            <Table>
                <thead>
                <tr>
                    <th>Requisito</th>
                    <th>Estado</th>
                    <th>Ver</th>
                    <th></th>
                </tr>
                </thead>
                {props.this.state.archivos.map((dato) => (
                    (() => {
                        if(dato.aceptado === '1'){
                            return <Ift dato = {dato} this= {props.this}/>
                        }else if(dato.aceptado === '0'){
                            return <Elset dato = {dato} this = {props.this}/>
                        }else if(dato.aceptado === '2'){
                            return <Nothingt dato = {dato} this = {props.this}/>
                        }
                    })()
                ))}
            </Table>
            </ModalBody>
            <ModalFooter>     
            <Button
            color="primary"
            onClick={() => props.this.enviar()}
            >
            Enviar
            </Button>
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

function Ift(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#81C784"}}>
        <tr key={dato.id} >
        <td>{dato.requisito}</td>
        <td>Aceptado</td>
        <td>
            <Button
            onClick={() => props.this.decargarExp(dato.ruta)}>
            Descargar
            </Button>
        </td>
        </tr>
        </tbody>
    );    
}

function Elset(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#F44336"}}>
        <tr key={dato.id} >
        <td>{dato.requisito}</td>
        <td>Rechazado</td>
        <td>
            <Button
            onClick={() => props.this.decargarExp(dato.ruta)}>
            Descargar
            </Button>
        </td>
        </tr>
        </tbody>
    );
}

function Nothingt(props) {
    var dato = props.dato;
    return(
        <tbody >
        <tr key={dato.id} >
        <td>{dato.requisito}</td>
        <td>Sin revisar</td>
        <td>
            <Button
            onClick={() => props.this.decargarExp(dato.ruta)}>
            Descargar
            </Button>
        </td>
        <td>
            <Button
            color="success"
            onClick={() => props.this.aceptar()}
            >
            Aceptar
            </Button>
            <Button
            color="danger"
            onClick={() => props.this.rechazar()}
            >
            Rechazar
            </Button>
        </td>
        </tr>
        </tbody>
    );   
}


function Fethc(props) {
    return(
        <Container>
        <br />
        {(() => {
                if(props.this.state.bus === true){
                    return<Container>
                    <Button style={{float: 'right'}}
                    className="btn btn-danger"
                    onClick={() => props.this.cerrarBusqueda()}
                    >
                    X
                    </Button>
                    <div class = "box"></div>
                    </Container> 
                }
        })()}
        <Table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Puesto</th>
                <th>Estado</th>
                <th>Ver Expediente</th>
            </tr>
            </thead>

            {props.this.state.expedientes.map((dato) => (
                (() => {
                    if(dato.estado_e === '1'){
                        return <Ifyes dato = {dato} this= {props.this}/>
                    }else if(dato.estado_e === '0'){
                        return <Elsen dato = {dato} this = {props.this}/>
                    }else if(dato.estado_e === '2'){
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
        <td>Aceptado</td>
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

function Elsen(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#EAE718"}}>
        <tr key={dato.id}>
        <td>{dato.nombre}</td>
        <td>{dato.puesto}</td>
        <td>Enviado a Corregir</td>
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
        <td>{dato.nombre}</td>
        <td>{dato.puesto}</td>
        <td>Sin revisar</td>
        <td>
            <Button
            onClick={() => props.this.mostrarModalVer(dato)}>
            Ver
            </Button>
        </td>    
        </tr>
        </tbody>
    );   
}

export default Reviewer;