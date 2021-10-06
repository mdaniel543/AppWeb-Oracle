import React, { Component } from 'react';
import '../../styles/guest/busqueda.css';

class busqueda extends Component{
    render(){
        return <div>
            <div class = "box"></div>
            <form action="" class="search-bar">
                <h3>Busqueda</h3>
                <label>Salario</label>
                <select class="search" id="search" pattern=".*\S.*" required>
                    <option >--</option>
                    <option>Lota</option>
                    <option>Coronel</option>
                    <option>Concepción</option>
                  </select> 
                  <label>Salario</label> 
                  <select class="search" id="search" pattern=".*\S.*" required>
                    <option >--</option>
                    <option>Lota</option>
                    <option>Coronel</option>
                    <option>Concepción</option>
                  </select>
                  <label>Salario</label>
                  <select class="search" id="search" pattern=".*\S.*" required>
                    <option >--</option>
                    <option>Lota</option>
                    <option>Coronel</option>
                    <option>Concepción</option>
                  </select>
                  <label>Salario</label>
                  <select class="search" id="search" pattern=".*\S.*" required>
                    <option >--</option>
                    <option>Lota</option>
                    <option>Coronel</option>
                    <option>Concepción</option>
                  </select>
                  <label>Plaza</label>
                <input type="search" name="search" pattern=".*\S.*" required/>
                <button class="search-btn" type="submit">
                    <span>Search</span>
                </button>
            </form>
          </div>
    }
}

export default busqueda;