import React, { Component } from 'react';
import '../styles/guest.css';
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
class guest extends Component{

    constructor() {
        super();
        this.state = {
            tasks: [],
            modalBuscar: false,
            modalSelect: false,
            date : getCurrentDate()
        };

        this.fetchTasks()
    }
    fetchTasks() {
        fetch('/guest')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks)
        });
        
    }

    buscar(){

    }
    mostrarModalBuscar(){
        this.setState({modalBuscar: true})
    }
    cerrarModalBuscar(){
        this.setState({modalBuscar: false})
        //this.fetchTasks();
    }
    aplicar(){

    }
    mostrarModalSelect(dato){
        this.setState({modalSelect: true})
    }
    cerrarModalSelect(){
        this.setState({modalSelect: false})
    }
    Sesion=()=>{
        window.location.href='./login';
    }

    render(){
        return <div> 
        <Main this={this}/>
        <div className='xml'>
            <h1>Puestos</h1>
        </div>
        <Search this = {this}/>    
        <Select this = {this}/>    
        <Carrousel tasks = {this.state.tasks} this = {this} />
        </div>
    }
}

function Main(props){
    return(
        <nav role="navigation">
            <div id="menuToggle">
            <input type="checkbox"/>
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
            <button onClick={()=>props.this.mostrarModalBuscar()}><li>Buscar Puesto</li></button>
            <div className='boxer'/>
            <button onClick={()=>props.this.Sesion()}><li>Iniciar Sesion</li></button>
            </ul>
            </div>
        </nav>
       
    );
}

function Ifblock(props){
    return (
        <div class="card text-center" style={{backgroundImage: `url(${props.e.Imagen})`, backgroundSize: 'cover'}}>
        <div class="title">
        <h2>{props.e.Puesto}</h2>
        </div>
        <div class="option">
            <ul>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Salario: {props.e.Salario} </li>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Departamento: {props.e.Departamento} </li>                    
            <li> <i class="fa fa-check" aria-hidden="true"></i>Categorias: </li>                    
            <ul>
                {
                    props.e.Categorias.map(dsa =>
                        <li> <i class="fa fa-times" aria-hidden="true"></i>{dsa.nombre} </li>

                    )
                }
            </ul>
            </ul>
        </div>
        <a onClick={()=>props.this.mostrarModalSelect()}>Seleccionar</a>

        </div>
    );
}

function Elseblock(props){
    return (
        <div class="card text-center">
        <div class="title">
        <h2>{props.e.Puesto}</h2>
        </div>
        <div class="option">
            <ul>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Salario: {props.e.Salario} </li>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Departamento: {props.e.Departamento} </li>                    
            <li> <i class="fa fa-check" aria-hidden="true"></i>Categorias: </li>                    
            <ul>
                {
                    props.e.Categorias.map(dsa =>
                        <li> <i class="fa fa-times" aria-hidden="true"></i>{dsa.nombre} </li>

                    )
                }
            </ul>
            </ul>
        </div>
        <a onClick={()=>props.this.mostrarModalSelect(props.e)}>Seleccionar</a>

        </div>
    );
}

function Carrousel(props){
    return(
        <body>
            <section>
                <div class="container-fluid">
                <div class="container">
                <div class="row">
                {               
                    props.tasks.map((e, index) => 
                        <div>
                        {
                            <div class="col-sm-4">
                            {(() => {
                                console.log(index);
                                if(e.Imagen != null){
                                    return <Ifblock e = {e} this = {props.this}/>
                                }else{
                                    return <Elseblock e = {e} this = {props.this}/>
                                }
                            })()}
                             <div class = "box"></div>
                            </div>                
                        } 
                        </div>
                    )   
                }
                </div>
                </div>
                </div>   
            </section> 
        </body> 
    );

}


function Search(props){
    return(
        <Modal isOpen={props.this.state.modalBuscar} fade={false}>
            <ModalHeader>
            <div><h3>Buscar</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>
                    Nombre: 
                </label>
                <input
                    className="form-control"
                    name="user"
                    type="text"
                    onChange={props.this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Salario: 
                </label>
                <input
                    className="form-control"
                    name="pass"
                    type="text"
                    onChange={props.this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Categoria
                </label>
                <Dropdown name = "rol" placeholder="Selecciona Categoria" />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown name = "depa"  placeholder="Selecciona Departamento" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                color="primary"
                onClick={() => props.this.Buscar()}
                >
                Buscar
                </Button>
                <Button
                className="btn btn-danger"
                onClick={() => props.this.cerrarModalBuscar()}
                >
                Cancelar
                </Button>
            </ModalFooter>
            </Modal>
    );
}


function Select(props){
    return(
        <Modal isOpen={props.this.state.modalSelect} fade={false}>
        <ModalHeader>
        <div><h3>Aplicar para puesto</h3></div>
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
                onChange={props.this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label>
                Nombres: 
            </label>
            <input
                className="form-control"
                name="pass"
                type="text"
                onChange={props.this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label>
                Apellidos: 
            </label>
            <input
                className="form-control"
                name="pass"
                type="text"
                onChange={props.this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label>
                Correo: 
            </label>
            <input
                className="form-control"
                name="pass"
                type="text"
                onChange={props.this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label>
                Direccion 
            </label>
            <input
                className="form-control"
                name="pass"
                type="text"
                onChange={props.this.handleChange}
            />
            <FormGroup>
            <label>
                Telefono: 
            </label>
            <input
                className="form-control"
                name="pass"
                type="text"
                onChange={props.this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label>
                CV: 
            </label>
            <input
                className="form-control"
                name="pass"
                type="file"
                onChange={props.this.handleChange}
            />
            </FormGroup>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button
            color="primary"
            onClick={() => props.this.aplicar()}
            >
            Aplicar
            </Button>
            <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalSelect()}
            >
            Cancelar
            </Button>
        </ModalFooter>
        </Modal>
    );
}


export default guest;
