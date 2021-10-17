import React, { Component } from "react";
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

const categories = ["hola", "hola"]
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
            rols: [], 
            depas: []
        };
        this.handleChange = this.handleChange.bind(this);
        
        //this.fetchTasks();
    }
    fetchTasks() {
        fetch('/selectU')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
          });
    }


    mostrarModalInsertar(){
        this.setState({modalInsertar: true})
        console.log(this.state.modalInsertar)
    }
    cerrarModalInsertar(){
        this.setState({modalInsertar: false})
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

    render (){
        return(
            <div className="crud">
            <Container>
            <br />
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear Usuario</Button>
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
                <tbody>
                {this.state.tasks.map((dato) => (
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
                ))}
                </tbody>
            </Table>
            </Container>
            
            <Modal isOpen={this.state.modalInsertar} fade={false} style={{opacity:1}}>
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
                    name="personaje"
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
                    name="anime"
                    type="text"
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Rol
                </label>
                <Dropdown options={categories} placeholder="Select an option" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown options={categories} placeholder="Select an option" />
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
                    name="personaje"
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
                    name="anime"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.data.pass}
                />
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




export default AdminUser;