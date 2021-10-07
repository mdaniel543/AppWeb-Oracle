import React, { Component } from "react";


class login extends Component{
    render(){
        return <div >
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