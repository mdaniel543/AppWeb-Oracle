import React, { Component } from "react";
import Cookies from 'universal-cookie';
import '../styles/asys.css'


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
                window.alert(data.msg);
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
                <h1>Informacion a Cargar</h1>
                <section>
                    <input type="file" 
                        multiple={false}
                        accept=".xml"
                        onChange={this.cargarXml}
                    />
                    <p>
                    <textarea name="value" value={this.state.value} onChange={this.handleChange} id="textExample" rows="5" cols="60"></textarea>
                    </p>
                    <p>
                        <button onClick={this.sendXml} id='type'>Confirmar</button>
                    </p>
                </section>
            </div>
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


export default AdminSystem;