import React, { Component } from "react";


class aForm extends Component{
    render( ){
        return <div className="login">
            <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="active"> Datos personales </h2>
                <div class="fadeIn first">
                </div>
                <form>
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="CUI" />
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Nombres" />
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Apellidos" />
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Correo electronico" />
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Direccion" />
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Telefono" />
                <input type="submit" class="fadeIn fourth" value="Aplicar"/>
                </form>
            </div>
            </div>
        </div>
    }
}

export default aForm;