import React, { Component} from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/asys.css'
import {
    Container,
    Modal,
} from "reactstrap";


const cookies = new Cookies();
class AdminSystem extends Component{
    constructor() {
        super();
        this.state = {
            load2: false,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.cargarXml = this.cargarXml.bind(this);
        this.sendXml = this.sendXml.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }
    sendXml(){
        this.setState({load2: true})
        fetch('/carga', {
            method: 'POST',
            body: JSON.stringify({"xml": this.state.value}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => { 
                Swal.fire({
                    title: data.msg,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
            this.setState({value: ''});

    }

    cerrarSesion=()=>{
        cookies.remove('rol', {path: "/"});
        window.location.href='./';
    }

    cargarXml(e){
        const file = e.target.files[0];
        if ( !file ) return;

        const fileReader = new FileReader();

        fileReader.readAsText( file );

        fileReader.onload = () => {
        console.log( fileReader.result );
        this.setState({value: fileReader.result});
        }

        fileReader.onerror = () => {
        console.log( fileReader.error );
        }
    }
    
    render (){
        return <div>
            <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                <button onClick={()=>this.cerrarSesion()}><li>Cerrar Sesion</li></button>
                </ul>
            </div>
            </nav>
            <div className="xml">
                <h1>Admin Sistema</h1>
            </div>
            <div className="box"></div>
            <Container>
                <Tabs >
                    <TabList>
                        <Tab>Carga</Tab>
                        <Tab>Reporte 1</Tab>
                        <Tab>Reporte 2</Tab>
                    </TabList>
                    <TabPanel eventKey="home">
                        <Tab1 this = {this} />
                    </TabPanel>
                    <TabPanel eventKey="profile">
                        <Tab2 this = {this} />
                    </TabPanel>
                    <TabPanel eventKey="contact">
                        <Tab3 this = {this} />
                    </TabPanel>
                </Tabs>
            </Container>
            

            <Load this= {this}/>
        </div>
    }
}


function Tab1(props){
    return(
        <div className="xml">
                <h3>Carga Masiva</h3>
                <div>
                    <input type="file" 
                        multiple={false}
                        accept=".xml"
                        onChange={props.this.cargarXml}
                    />
                    <p>
                    <textarea name="value" value={props.this.state.value} onChange={props.this.handleChange} id="textExample" rows="10"  cols="60"></textarea>
                    </p>
                    <p>
                        <button onClick={props.this.sendXml} id='type'>Confirmar</button>
                    </p>
                </div>
        </div>
    );
}

function Tab2(props) {
    return(
        <h4>TAB 2 </h4>
    );
}

function Tab3(props) {
    return(
        <h4>TAB 3</h4>
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


export default AdminSystem;