import React, { Component } from "react";
import '../styles/login.css'
import Cookies from 'universal-cookie';
import {
    Modal,
} from "reactstrap";

const cookies = new Cookies();


class login extends Component{

    constructor() {
        super();
        this.state = {
          user: '',
          load2: false,
          pass: '',
          tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.prob = this.prob.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }
    
    prob(e) {
        this.setState({load2: true})
        e.preventDefault();
        fetch('/loginn', {
        method: 'POST',
        body: JSON.stringify({
            usuario: this.state.user,
            pass: this.state.pass
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            switch(data.Rol){
                case "Admin Sistema":
                    cookies.set('Rol', data.Rol, {path: "/"});
                    window.location.href="./AdminSystem";
                    break;
                case "Admin Usuario":
                    cookies.set('Rol', data.Rol, {path: "/"});
                    window.location.href="./AdminUser";
                    break;
                case "Coordinador":
                    cookies.set('id', data.id, {path: "/"});
                    window.location.href="./AdminUser";
                    break;
                case "Reclutador":
                    console.log(data.id)
                    cookies.set('id', data.id, {path: "/"});
                    window.location.href="./reclutar";
                    break;
                case "Revisor":
                    cookies.set('id', data.id, {path: "/"});
                    window.location.href="./AdminUser";
                    break;
                case undefined:
                    console.log("NADA")
                    window.alert("Usuario y/o Contraseña incorrecta");
                    this.setState({user: '', pass: '', load2:false});
                    break;
                case "Aplicante":
                    console.log("Hola aplicante");
                    cookies.set('id', data.id, {path: "/"});
                    window.location.href="./Applicant";
                    break;
                default:
                    break;
            }    
        })
        .catch(err => console.error(err));
    }

    render(){
        return <div className="login">
            <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="active"> Iniciar sesion </h2>
                <div class="fadeIn first">
                </div>
                <form onSubmit={this.prob}>
                <input type="text" id="login" class="fadeIn second" name="user" onChange={this.handleChange} value={this.state.user} placeholder="Usuario" />
                <input type="password" id="password" class="fadeIn third" name="pass" onChange={this.handleChange} value={this.state.pass} placeholder="Contraseña"/>
                <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>
            </div>
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

export default login;