import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {getCurrentDate} from '../utils/date'
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



class AdminUser extends Component{
    
    constructor() {
        super();
        this.state = {
            modalActualizar: false,
            modalInsertar: false,
            tasks: [],
            copy:[],
            data :{
                id: '',
                user: '',
                pass: '',
                estado: '',
                inicio: '',
                fin: '',
                correo: '',
                rol: '',
                depa: ''
            },
            search:{
                user: null,
                estado: null,
                inicio: null,
                fin: null,
                rol: null
            },
            estado: ["Activo", "Inactivo"],
            load : true,
            bus: false,
            modalBuscar: false,
            rols: ["Coordinador", "Reclutador", "Revisor"], 
            depas: [],
            date : getCurrentDate()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeD = this.handleChangeD.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleChangeES = this.handleChangeES.bind(this);
        this.handleChangeRS = this.handleChangeRS.bind(this);

        this.fetchTasks();
        this.fetchdepa();
    }
    
    fetchTasks() {
        fetch('/selectU')
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.setState({tasks: data, load: false, copy: data});
          });
    }
    fetchdepa() {
        fetch('/depas')
          .then(res => res.json())
          .then(data => {
            const aux = [];
            for(const i of data){
                aux.push(i.nombre)    
            }
            this.setState({depas: aux});
        });
    }
    handleChangeES(e) {
        this.setState({
          search:{
              ...this.state.search,
              estado: e.value
          },
        });
    } 
    handleChangeRS(e) {
        this.setState({
          search:{
              ...this.state.search,
              rol: e.value
          },
        });
    }


    handleChangeS(e) {
        const { name, value } = e.target;
        this.setState({
          search:{
              ...this.state.search,
              [name]: value
          },
        });
    }

    buscar(Finicio, Ffinal){
        console.log(this.state.search)
        let inicio = null, final = null;
        if(Finicio != null) inicio =  `${Finicio.getFullYear()}-${Finicio.getMonth()+1}-${Finicio.getDate()}`
        if(Ffinal != null) final = `${Ffinal.getFullYear()}-${Ffinal.getMonth()+1}-${Ffinal.getDate()}`
        console.log(inicio)
        console.log(final)
        this.setState({load: true})

        let estado = null;
        if(this.state.search.estado == 'Activo'){
            estado = '1'
        }else if(this.state.search.estado == 'Inactivo'){
            estado = '0'
        }
        fetch('/searchU', {
            method: 'POST',
            body: JSON.stringify({
                usuario: this.state.search.user,
                estado: estado,
                inicio: inicio,
                final: final,
                rol: this.state.search.rol
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                this.setState({load: false});
            })
            .catch(err => console.error(err));

        this.setState({bus: true, modalBuscar: false})
        this.setState({
            search:{
                ...this.state.search,
                user: null,
                estado: null,
                inicio: null,
                fin: null,
                rol: null
            },
          });
    }

    mostrarModalBuscar(){
        this.setState({modalBuscar: true})
    }
    cerrarModalBuscar(){
        this.setState({modalBuscar: false})
        //this.fetchTasks();
    }
    cerrarBusqueda(){
        this.setState({tasks: this.state.copy, bus: false})
    }


    mostrarModalInsertar(){
        this.setState({modalInsertar: true})
    }
    cerrarModalInsertar(){
        this.setState({modalInsertar: false})
        this.fetchTasks();
    }
    mostrarModalActualizar(dato){
        this.setState({
            data : dato,
            modalActualizar: true
        })
    }
    cerrarModalActualizar(){
        this.setState({modalActualizar: false})
    }

    editar(dato){
        console.log(this.state.data)
        fetch('/updateU', {
            method: 'PUT',
            body: JSON.stringify({
                idP: dato.id,
                usuario: dato.user,
                pass: dato.pass,
                rol: dato.rol,
                correo: dato.correo,
                depa: dato.depa
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        this.cerrarModalActualizar();
        this.fetchTasks();
    }
    eliminar(dato){
        console.log(this.state.data)
        fetch('/deleteU', {
            method: 'PUT',
            body: JSON.stringify({
                idP: dato.id,
                fin: this.state.date
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        this.fetchTasks();
    }
    insertar(){
        console.log(this.state.data)
        fetch('/insertU', {
            method: 'POST',
            body: JSON.stringify({
                usuario: this.state.data.user,
                pass: this.state.data.pass,
                inicio: this.state.date,
                rol: this.state.data.rol,
                correo: this.state.data.correo,
                depa:this.state.data.depa
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                window.alert(data.msg);
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        this.cerrarModalInsertar()
        this.fetchTasks();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          data:{
              ...this.state.data,
              [name]: value
          },
        });
    }

    handleChangeR(e) {
        this.setState({
          data:{
              ...this.state.data,
              rol: e.value
          },
        });
    }
    handleChangeD(e) {
        this.setState({
          data:{
              ...this.state.data,
              depa: e.value
          },
        });
    }

    cerrarSesion=()=>{
        window.location.href='./';
    }

    render (){
        return(
            <div className="crud">
            <nav role="navigation">
            <div id="menuToggle">
            <input type="checkbox"/>
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
            <button onClick={()=>this.mostrarModalBuscar()}><li>Buscar Usuario</li></button>
            <div className='boxer'/>
            <button onClick={()=>this.cerrarSesion()}><li>Cerrar Sesion</li></button>
            </ul>
            </div>
            </nav>
            <div className='xml'>
            <h1>Usuarios</h1>
            </div>
            <Container>
            <br />
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Crear Usuario</Button>
            <br />
            <br />
            {(() => {
                    if(this.state.bus === true){
                        return<Container>
                        <Button style={{float: 'right'}}
                        className="btn btn-danger"
                        onClick={() => this.cerrarBusqueda()}
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
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Correo</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Rol</th>
                    <th>Departamento</th>
                </tr>
                </thead>

                {this.state.tasks.map((dato) => (
                    (() => {
                        if(dato.estado == 1){
                            return <Ifyes dato = {dato} this= {this}/>
                        }else{
                            return <Elsen dato = {dato} this = {this}/>
                        }
                    })()
                ))}

            </Table>
            </Container>
            
            <Modal isOpen={this.state.modalInsertar} fade={false}>
            <ModalHeader>
            <div><h3>Insertar Usuario</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    Usuario: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    password: 
                </label>
                <input
                    className="form-control"
                    name="pass"
                    type="text"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Rol
                </label>
                <Dropdown 
                name = "rol" options={this.state.rols} 
                onChange={this.handleChangeR} 
                placeholder="Selecciona Rol" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown name = "depa" options={this.state.depas} onChange={this.handleChangeD} placeholder="Selecciona Departamento" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => this.insertar()}
                >
                Insertar
                </Button>
                <Button
                className="btn btn-danger"
                onClick={() => this.cerrarModalInsertar()}
                >
                Cancelar
                </Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalActualizar} fade={false}>
            <ModalHeader>
            <div><h3>Editar Usuario</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    Usuario: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.data.user}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Contraseña: 
                </label>
                <input
                    className="form-control"
                    name="pass"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.data.pass}
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
                    onChange={this.handleChange}
                    value={this.state.data.correo}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Rol
                </label>
                <Dropdown name = "rol" options={this.state.rols} onChange={this.handleChangeR} value={this.state.data.rol} placeholder="Selecciona Rol" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown name = "depa" options={this.state.depas} onChange={this.handleChangeD} value={this.state.data.depa} placeholder="Selecciona Departamento" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => this.editar(this.state.data)}
                >
                Editar
                </Button>
                <Button
                color="danger"
                onClick={() => this.cerrarModalActualizar()}
                >
                Cancelar
                </Button>
            </ModalFooter>
            </Modal>  

            <SearchU this={this}/>
        </div>
        );
    }
}

function Ifyes(props) {
    var dato = props.dato;
    return(
        <tbody style={{backgroundColor : "#81C784"}}>
        <tr key={dato.id} >
        <td>{dato.user}</td>
        <td>{dato.pass}</td>
        <td>{dato.correo}</td>
        <td>{dato.inicio}</td>
        <td>{dato.fin}</td>
        <td>{dato.rol}</td>
        <td>{dato.depa}</td>
        <td>
            <Button
            color="primary"
            onClick={() => props.this.mostrarModalActualizar(dato)}
            >
            Editar
            </Button>{" "}
            <Button color="danger" onClick={()=> props.this.eliminar(dato)}>Eliminar</Button>
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
        <td>{dato.user}</td>
        <td>{dato.pass}</td>
        <td>{dato.correo}</td>
        <td>{dato.inicio}</td>
        <td>{dato.fin}</td>
        <td>{dato.rol}</td>
        <td>{dato.depa}</td>
        </tr>
        </tbody>
    );
}

function SearchU(props) {
    var [startDate, setStartDate] = useState(null);
    var [startDateF, setStartDateF] = useState(null);
    return(
        <Modal isOpen={props.this.state.modalBuscar} fade={false}>
            <ModalHeader>
            <div><h3>Buscar Usuario</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    Usuario: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    onChange={props.this.handleChangeS}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Estado
                </label>
                <Dropdown name = "estado" options={props.this.state.estado} onChange={props.this.handleChangeES} value={props.this.state.search.estado} placeholder="--" />
                </FormGroup>

                <FormGroup>
                <label>
                    Fecha Inicio: 
                </label>
                <DatePicker
                    name = "inicio"
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    fixedHeight
                    //withPortal
                />
                </FormGroup>

                <FormGroup>
                <label>
                    Fecha Final: 
                </label>
                <DatePicker
                    name = "fin"
                    dateFormat="yyyy-MM-dd"
                    selected={startDateF}
                    onChange={(date) => setStartDateF(date)}
                    fixedHeight
                    //withPortal
                />
                </FormGroup>

                <FormGroup>
                <label>
                    Rol
                </label>
                <Dropdown name = "rol" options={props.this.state.rols} onChange={props.this.handleChangeRS} value={props.this.state.search.rol} placeholder="--" />
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => props.this.buscar(startDate, startDateF)}
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




export default AdminUser;