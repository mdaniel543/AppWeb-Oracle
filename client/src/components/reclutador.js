import React, { Component, useState } from "react";
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

class Reclutador extends Component{
    constructor() {
        super();
        if(cookies.get('id') === undefined) window.location.href = "./login"
        this.state = {
            id: cookies.get('id'),
            tasks: [],
            copy: [],
            load2: false,
            modalBuscar: false,
            modalVer: false,
            search:{
                nombre: null,
                puesto: null,
                fecha: null
            },
            load: true,
            depa:{
                id: '',
                nombre: ''
            },
            data: {},
            puestos:[],
            bus: false,
        };
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
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
                this.fetchPuestos(data.id)
                this.fetchSelect(data.id)
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

    fetchSelect(id){
        console.log(this.state.depa)
        fetch('/selectAp', {
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
                this.setState({tasks: data, copy:data, load:false});
                console.log(data);
            })
            .catch(err => console.error(err));
    }


    cerrarSesion(){
        cookies.remove('id', {path: "/"});
        window.location.href='./';
    }

    mostrarModalBuscar(){
        this.setState({modalBuscar: true})
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

    buscar(Ffinal){
        this.setState({load2: true})
        console.log(this.state.search)
        let final = null;
        if(Ffinal != null) final = `${Ffinal.getFullYear()}-${Ffinal.getMonth()+1}-${Ffinal.getDate()}`
        console.log(final)
        fetch('/searchAp', {
            method: 'POST',
            body: JSON.stringify({
                depa: this.state.depa.id,
                nombre: this.state.search.nombre,
                fecha: final,
                puesto: this.state.search.puesto,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
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

    cerrarBusqueda(){
        this.setState({tasks: this.state.copy, bus: false})
    }   

    mostrarModalVer(dato){
        this.setState({modalVer: true, data:dato})
    }
    cerrarModalVer(){
        this.setState({modalVer: false})
    }

    decargarCV(cv){
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
        this.setState({load2: true})
        fetch('/apto', {
            method: 'PUT',
            body: JSON.stringify({
                apto: '1',
                cui: data.cui, 
                correo: data.correo, 
                puesto: data.puesto,
                nombre: data.nombre
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchSelect(this.state.depa.id); 
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
        this.fetchSelect(this.state.depa.id);    
    }

    rechazar(data){
        this.setState({load2: true})
        fetch('/apto', {
            method: 'PUT',
            body: JSON.stringify({
                apto: '0',
                cui: data.cui,
                correo: data.correo,
                puesto: data.puesto,
                nombre: data.nombre
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchSelect(this.state.depa.id); 
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
        this.fetchSelect(this.state.depa.id);   
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
                        <Search this = {this}/>
                        <Fethc this = {this}/>
                        <Ver this = {this}/>
                   </div> 
                ); 
            }
        })()}
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
        <button onClick={()=>props.this.mostrarModalBuscar()}><li>Buscar Aplicante</li></button>
        <div className='boxer'/>
        <button onClick={()=>props.this.cerrarSesion()}><li>Cerrar Sesion</li></button>
        </ul>
        </div>
        </nav>
        <div className='xml'>
        <h2>Aplicantes en el departamento: {props.this.state.depa.nombre}</h2>
        </div>
        </div>
    );
}

function Search(props) {
    var [startDateF, setStartDateF] = useState(null);
    return(
        <Modal isOpen={props.this.state.modalBuscar} fade={false}>
            <ModalHeader>
            <div><h3>Buscar Aplicante</h3></div>
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
                    Fecha Postulacion: 
                </label>
                <DatePicker
                    name = "fin"
                    dateFormat="dd/MM/yyyy"
                    selected={startDateF}
                    isClearable
                    placeholderText="Selecciona Fecha"
                    onChange={(date) => setStartDateF(date)}
                    fixedHeight
                    //withPortal
                />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => props.this.buscar(startDateF)}
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
                    name="Apellido"
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
                    name="user"
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
                    name="user"
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
                <th>Fecha Postulacion</th>
                <th>Datos Personales</th>
                <th>CV</th>
                <th>Reclutar</th>
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

export default Reclutador;