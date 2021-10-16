import React, { Component } from 'react';
import '../styles/guest.css';

class guest extends Component{

    constructor() {
        super();
        this.state = {
            tasks: []
        };
        this.fetchTasks()
    }
    fetchTasks() {
        fetch('/guest')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
          });
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

function Ifblock(props){
    return (
        <div class="card text-center" style={{backgroundImage: `url(${props.e.Imagen})`, backgroundSize: 'cover'}}>
        <div class="title">
        <h2>{props.e.Puesto}</h2>
        </div>
        <div class="option">
            <ul>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Salario: {props.e.Salario} </li>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Nombre Departamento: {props.e.Departamento} </li>                    
            <li> <i class="fa fa-check" aria-hidden="true"></i>Categorias: </li>                    
            <ul>
                {
                    props.e.Categorias.map(dsa =>
                        <li> <i class="fa fa-times" aria-hidden="true"></i>{dsa.nombre} </li>

                    )
                }
            </ul>
            </ul>
        </div>
        <a href= "/form">Seleccionar </a>
        </div>
    );
}

function Elseblock(props){
    return (
        <div class="card text-center">
        <div class="title">
        <h2>{props.e.Puesto}</h2>
        </div>
        <div class="option">
            <ul>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Salario: {props.e.Salario} </li>
            <li> <i class="fa fa-check" aria-hidden="true"></i>Nombre Departamento: {props.e.Departamento} </li>                    
            <li> <i class="fa fa-check" aria-hidden="true"></i>Categorias: </li>                    
            <ul>
                {
                    props.e.Categorias.map(dsa =>
                        <li> <i class="fa fa-times" aria-hidden="true"></i>{dsa.nombre} </li>

                    )
                }
            </ul>
            </ul>
        </div>
        <a href= "/form">Seleccionar </a>
        </div>
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
                            <div class="col-sm-4">
                            {(() => {
                                if(e.Imagen != null){
                                    return <Ifblock e = {e}/>
                                }else{
                                    return <Elseblock e = {e}/>
                                }
                            })()}
                            </div>                
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
