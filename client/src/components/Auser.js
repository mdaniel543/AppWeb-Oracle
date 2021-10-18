import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {getCurrentDate} from '../utils/date'

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
            data :{
                id: '',
                user: '',
                pass: '',
                estado: '',
                inicio: '',
                fin: '',
                rol: '',
                depa: ''
            },
            rols: ["Coordinador", "Reclutador", "Revisor"], 
            depas: [],
            date : getCurrentDate()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeD = this.handleChangeD.bind(this);
        this.fetchTasks();
        this.fetchdepa();
    }
    fetchTasks() {
        fetch('/selectU')
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.setState({tasks: data});
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


    mostrarModalInsertar(){
        this.setState({modalInsertar: true})
    }
    cerrarModalInsertar(){
        this.setState({modalInsertar: false})
        this.fetchTasks();
    }
    mostrarModalActualizar(dato){

    }
    cerrarModalActualizar(){

    }

    editar(dato){

    }
    eliminar(dato){

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

    render (){
        return(
            <div className="crud">
            <Container>
            <br />
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Crear Usuario</Button>
            <br />
            <br />
            <Table>
                <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Rol</th>
                    <th>Departamento</th>
                </tr>
                </thead>
                
                {this.state.tasks.map((dato) => (
                    (() => {
                        if(dato.estado == 1){
                            return <Ifyes dato = {dato}/>
                        }else{
                            return <Elsen dato = {dato}/>
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
                    Rol
                </label>
                <Dropdown name = "rol" options={this.state.rols} onChange={this.handleChangeR} value={this.state.data.rol}  placeholder="Selecciona Rol" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown name = "depa" options={this.state.depas} onChange={this.handleChangeD} value={this.state.data.depa}  placeholder="Selecciona Departamento" />
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
                    Rol
                </label>
                <Dropdown name = "rol" options={this.state.rols} onChange={this.handleChange} value={this.state.data.rol} placeholder="Selecciona Rol" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown name = "depa" options={this.state.depas} onChange={this.handleChange} value={this.state.data.depa} placeholder="Selecciona Departamento" />
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
        <td>{dato.inicio}</td>
        <td>{dato.fin}</td>
        <td>{dato.rol}</td>
        <td>{dato.depa}</td>
        <td>
            <Button
            color="primary"
            onClick={() => this.mostrarModalActualizar(dato)}
            >
            Editar
            </Button>{" "}
            <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
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
        <td>{dato.inicio}</td>
        <td>{dato.fin}</td>
        <td>{dato.rol}</td>
        <td>{dato.depa}</td>
        <td>
            <Button
            color="primary"
            onClick={() => this.mostrarModalActualizar(dato)}
            >
            Editar
            </Button>{" "}
            <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
        </td>
        </tr>
        </tbody>
    );
}




export default AdminUser;