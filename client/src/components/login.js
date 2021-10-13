import React, { Component } from "react";
import '../styles/login.css'


class login extends Component{
    render(){
        return <div className="login">
            <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="active"> Iniciar sesion </h2>
                <div class="fadeIn first">
                </div>
                <form>
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Usuario" />
                <input type="text" id="password" class="fadeIn third" name="login" placeholder="Contraseña"/>
                <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>
            </div>
            </div>
        </div>
    }
}

export default login;