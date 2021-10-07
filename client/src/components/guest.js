import React, { Component } from 'react';
import '../styles/guest.css';

import tasks from '../task.json';

class guest extends Component{

    state = {
        tasks: tasks
    }

    render(){
        return <div> 
        <Main/>
        <div class = "box"></div>
        <Search/>    
        <Carrousel tasks = {this.state.tasks} />
        </div>
    }
}

function Main(){
    return(
        <header>
        <div class="padre-sup">
            <div class="hijo-sup">
                <div class="logo-titulo">		
                    <h1 id="titulo-h"><a class="hipervinculo-h" href="/">TOTONET S.A</a></h1>
                </div>
                <nav id="menu-header">
                    <ul id="lista">
                        <a class="item hipervinculo-h" href="/login"><li> INICIAR SESION</li></a>
                    </ul>
                </nav>
            </div>
        </div>
        <div id="franja-amarilla-h"></div>  
    </header> 
    );
}

function Carrousel(props){
    return(
        <body>
            <section>
                <div class="container-fluid">
                <div class="container">
                <div class="row">
                {               
                    props.tasks.map(e => 
                        <div>
                        {
                            e.departamento.puestos.puesto.map(er =>
                                <div class="col-sm-4">
                                <div class="card text-center">
                                    <div class="title">
                                    <h2>{er.nombre}</h2>
                                    </div>
                                    <div class="option">
                                        <ul>
                                        <li> <i class="fa fa-check" aria-hidden="true"></i>Salario: {er.salario} </li>
                                        <li> <i class="fa fa-check" aria-hidden="true"></i>Nombre Departamento: {e.departamento.nombre} </li>                    
                                        <ul>
                                        {
                                            er.categorias.categoria.map(dsa =>
                                                <li> <i class="fa fa-check" aria-hidden="true"></i>Categoria: {dsa.nombre} </li>

                                            )
                                        }
                                        </ul>
                                        </ul>
                                    </div>
                                    <a href= "/form">Seleccionar </a>
                                </div>
                                </div>                
                            )
                        } 
                        </div>
                    )
                }
                </div>
                </div>
                </div>   
            </section> 
        </body> 
    );

}

function Search(){
    return(
    <form class="category-page-faceted-search">
        <div class="category-page-faceted-search-element-container category-page-faceted-search-text-container">
        <label class="category-page-faceted-search-label" for="plant_name">Buscar por plaza</label>
        <input type="text" name="plant_name" id="plant_name" placeholder="Plaza..." class="category-page-faceted-search-text" />
         </div>
        <div class="category-page-faceted-search-element-container category-page-faceted-search-select-container dropdown-container">
            <label class="category-page-faceted-search-label" for="plant_type">Salario</label>
            <div class="category-page-faceted-search-select-wrapper dropdown-wrap">
            <select class="category-page-faceted-search-select-input dropdown" id="plant_type">
                <option >--</option>
                <option>Lota</option>
                <option>Coronel</option>
                <option>Concepción</option>
            </select> 
            </div>
        </div>
        <div class="category-page-faceted-search-element-container category-page-faceted-search-select-container dropdown-container">
            <label class="category-page-faceted-search-label" for="plant_type">Departamento</label>
            <div class="category-page-faceted-search-select-wrapper dropdown-wrap">
            <select class="category-page-faceted-search-select-input dropdown" id="plant_type">
                <option >--</option>
                <option>Lota</option>
                <option>Coronel</option>
                <option>Concepción</option>
            </select> 
            </div>
        </div>
        <div class="category-page-faceted-search-element-container category-page-faceted-search-select-container dropdown-container">
            <label class="category-page-faceted-search-label" for="plant_type">Categoria</label>
            <div class="category-page-faceted-search-select-wrapper dropdown-wrap">
            <select class="category-page-faceted-search-select-input dropdown" id="plant_type">
                <option >--</option>
                <option>Lota</option>
                <option>Coronel</option>
                <option>Concepción</option>
            </select> 
            </div>
        </div>
        <div class="category-page-faceted-search-element-container category-page-faceted-search-select-container dropdown-container">
            <label class="category-page-faceted-search-label" for="plant_type">Puntuacion</label>
            <div class="category-page-faceted-search-select-wrapper dropdown-wrap">
            <select class="category-page-faceted-search-select-input dropdown" id="plant_type">
                <option >--</option>
                <option>Lota</option>
                <option>Coronel</option>
                <option>Concepción</option>
            </select> 
            </div>
        </div>
        <div class="category-page-faceted-search-element-container category-page-faceted-search-submit-container">
            <input type="submit" value="Search" class="category-page-faceted-search-submit" />
        </div>
    </form>
    );
}


export default guest;
