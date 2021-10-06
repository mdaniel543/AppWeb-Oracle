import React, { Component } from 'react';
import '../../styles/guest/barra.css';

class barra extends Component{
    render(){
        return <header>
            <div class="padre-sup">
                <div class="hijo-sup">
                    <div class="logo-titulo">		
                        <h1 id="titulo-h"><a class="hipervinculo-h">TOTONET S.A</a></h1>
                    </div>
                    <nav id="menu-header">
                        <ul id="lista">
                            <a class="item hipervinculo-h"><li> INICIAR SESION</li></a>
                        </ul>
                    </nav>
				</div>
			</div>
			<div id="franja-amarilla-h"></div>  
        </header> 
    }
}

export default barra;