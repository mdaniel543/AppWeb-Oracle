import React, { Component } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class AdminSystem extends Component{
    render (){
        return <h1>Hola {cookies.get('Rol')}</h1>
    }
}


export default AdminSystem;