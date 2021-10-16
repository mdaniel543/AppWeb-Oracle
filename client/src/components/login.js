import React, { Component } from "react";
import { Redirect } from 'react-router';
import '../styles/login.css'
import AdminSystem from "./system";
import AdminUser from "./Auser";

class login extends Component{

    constructor() {
        super();
        this.state = {
          user: '',
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
        e.preventDefault();
        fetch('/loginn', {
        method: 'POST',
        body: JSON.stringify({
            user: this.state.user,
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
            switch(data.Rol[0]){
                case "Admin Sistema":
                    console.log("adaAdmin Sistemas")
                case "Admin Usuario":
                    console.log("Admin Usuario")
                    return <AdminUser path ="/Auser"/>
                case undefined:
                    console.log("NADA")
                    window.alert("Usuario y/o Contraseña incorrecta");
                break;
            }
            this.setState({user: '', pass: ''});
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
                <input type="text" id="password" class="fadeIn third" name="pass" onChange={this.handleChange} value={this.state.pass} placeholder="Contraseña"/>
                <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>
            </div>
            </div>
        </div>
    }
}

export default login;