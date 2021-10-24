import React, { Component } from 'react';
import '../styles/guest.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {getCurrentDate} from '../utils/date'
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
class guest extends Component{

    constructor() {
        super();
        this.state = {
            tasks: [],
            copy: [],
            modalBuscar: false,
            modalSelect: false,
            depas: [],
            catego: [],
            form:{
                cui:'',
                nombre: '',
                apellido: '',
                correo: '',
                direccion: '',
                telefono: '',
                cv: ''
            },
            search: {
                puesto: null,
                salario: null,
                categoria: null,
                depa: null
            },
            load: true,
            load2: false,
            bus: false,
            file: '',
            depa: '',
            puesto: '',
            date : getCurrentDate()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeF = this.handleChangeF.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleChangeD = this.handleChangeD.bind(this);
        this.handleChangeC = this.handleChangeC.bind(this);
        this.fetchTasks()
        this.fetchdepa()
        this.fetchCategorias()
    }
    fetchTasks() {
        fetch('/guest')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data, copy: data});
            this.setState({load: false})
            console.log(this.state.tasks)
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
    fetchCategorias() {
        fetch('/catego')
          .then(res => res.json())
          .then(data => {
            /*const aux = [];
            for(const i of data){
                aux.push(i.nombre)    
            }*/
            this.setState({catego: data});
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          form:{
              ...this.state.form,
              [name]: value
          },
        });
    }

    handleChangeF(e) {
        this.setState({
          form:{
              ...this.state.form,
              cv: e.target.files[0]
          },
        });
    }

    handleChangeD(e) {
        this.setState({
          search:{
              ...this.state.search,
              depa: e.value
          },
        });
    }
    handleChangeC(e) {
        this.setState({
          search:{
              ...this.state.search,
              categoria: e.value
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

    buscar(){
        console.log(this.state.search)
        this.setState({load: true})
        fetch('/searchGuest', {
            method: 'POST',
            body: JSON.stringify({
                puesto: this.state.search.puesto,
                salario: this.state.search.salario,
                categoria: this.state.search.categoria,
                depa: this.state.search.depa
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
                puesto: null,
                salario: null,
                depa: null,
                categoria: null
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

    aplicar(){
        this.cerrarModalSelect();
        this.setState({load2: true})
        const formData = new FormData();
        formData.append(
            "file",
            this.state.form.cv
        );
        console.log(this.state.form.cv);
        axios.post("/upload",formData, {})
        .then(res => {
            console.log(res.data.msg);
            fetch('/insertAp', {
                method: 'POST',
                body: JSON.stringify({
                    cui: this.state.form.cui,
                    nombre: this.state.form.nombre,
                    apellido: this.state.form.apellido,
                    correo: this.state.form.correo,
                    direccion: this.state.form.direccion,
                    telefono:this.state.form.telefono,
                    cv: res.data.msg,
                    postu:this.state.date,
                    depa:this.state.depa,
                    puesto:this.state.puesto,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then(res => res.json())
                .then(data => {
                    window.alert(data.msg);
                    this.setState({load2: false})
                })
                .catch(err => console.error(err));
            })
        
    
    }


    mostrarModalSelect(dato){
        this.setState({
            depa: dato.idD,
            puesto: dato.idP,
            modalSelect: true
        })
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
        {(() => {
            if(this.state.load == true){
                return<Container>
                <div class="load">
                <hr/><hr/><hr/><hr/>
                </div>
                </Container>
                
            }else{
                return <Carrousel this = {this} />
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
        <a onClick={()=>props.this.mostrarModalSelect(props.e)}>Seleccionar</a>

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
                {(() => {
                    if(props.this.state.bus === true){
                        return<Container>
                        <Button
                        className="btn btn-danger"
                        onClick={() => props.this.cerrarBusqueda()}
                        >
                        X
                        </Button>
                        <div class = "box"></div>
                        </Container>
                        
                    }
                })()}
                <div class="container-fluid">
                <div class="container">
                <div class="row">
                {               
                    props.this.state.tasks.map((e, index) => 
                        <div>
                        {
                            <div class="col-sm-4">
                            {(() => {
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
                    name="puesto"
                    type="text"
                    onChange={props.this.handleChangeS}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Salario: 
                </label>
                <input
                    className="form-control"
                    name="salario"
                    type="text"
                    onChange={props.this.handleChangeS}
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Categoria
                </label>
                <Dropdown 
                name = "rol" 
                options = {props.this.state.catego}
                onChange={props.this.handleChangeC}
                placeholder="--" 
                />
                </FormGroup>
                <FormGroup>
                <label>
                    Departamento
                </label>
                <Dropdown 
                name = "depa" 
                options={props.this.state.depas}
                onChange={props.this.handleChangeD}
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
                name="cui"
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
                name="nombre"
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
                name="apellido"
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
                name="correo"
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
                name="direccion"
                type="text"
                onChange={props.this.handleChange}
            />
             </FormGroup>
            <FormGroup>
            <label>
                Telefono: 
            </label>
            <input
                className="form-control"
                name="telefono"
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
