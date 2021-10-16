import React, { Component } from "react";
import '../styles/login.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class login extends Component{

    constructor() {
        super();
        this.state = {
          user: '',
          pass: '',
          tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        cookies.set('Rol', '', {path: "/"});
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
            if(data.Rol === undefined){
                console.log("NADA")
                window.alert("Usuario y/o Contraseña incorrecta");
                this.setState({bol: false});
            }else{
                switch(data.Rol[0]){
                    case "Admin Sistema":
                        cookies.set('Rol', data.Rol[0], {path: "/"});
                        window.location.href="./Asystem";
                        break;
                    case "Admin Usuario":
                        window.location.href="./userA";
                        break;
                    default:
                        break;
                }    
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
                <input type="password" id="password" class="fadeIn third" name="pass" onChange={this.handleChange} value={this.state.pass} placeholder="Contraseña"/>
                <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>
            </div>
            </div>
        </div>
    }
}

export default login;