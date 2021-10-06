import React, { Component } from 'react';
import '../../styles/guest/carrousel.css';

import tasks from '../../task.json';

class guest extends Component{

    state = {
        tasks: tasks
    }
    
    render(){
        return <body>
            <section>
                <div class="container-fluid">
                <div class="container">
                <div class="row">
                {               
                    this.state.tasks.map(e => 
                        <div>
                        {
                            e.departamento.puestos.puesto.map(er =>
                                <div class="col-sm-4">
                                <div class="card text-center">
                                    <div class="title">
                                    <h2>{er.nombre}</h2>
                                    </div>
                                    <div class="price">
                                    <h4>25</h4>
                                    </div>
                                    <div class="option">
                                        <ul>
                                        <li> <i class="fa fa-check" aria-hidden="true"></i> dsddasdfsadads </li>
                                        <li> <i class="fa fa-check" aria-hidden="true"></i> 3 Domain Names </li>
                                        <li> <i class="fa fa-check" aria-hidden="true"></i> 20 Email Address </li>
                                        <li> <i class="fa fa-times" aria-hidden="true"></i> Live Support </li>
                                        </ul>
                                    </div>
                                    <a>Order Now </a>
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
        
    }
}

export default guest;