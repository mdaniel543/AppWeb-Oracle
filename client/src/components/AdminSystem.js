import React, { Component} from "react";
import Swal from 'sweetalert2';
import Dropdown from 'react-dropdown';
import Pdf from "react-to-pdf";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/asys.css'
import {
    Button,
    FormGroup,
    Container,
    Modal,
    Table
} from "reactstrap";


const ref2 = React.createRef();
const ref3 = React.createRef();
const ref4 = React.createRef();
const ref5 = React.createRef();
const ref6 = React.createRef();

class AdminSystem extends Component{
    constructor() {
        super();
        this.state = {
            dep: '',
            deps : [], 
            load2: false,
            value: '',
            View1: false,
            View2: false,
            View3: false,
            View4: false,
            View5: false,
            View6: false,
            tasks1: [],
            tasks2: [],
            tasks3: [],
            tasks4: [],
            tasks5: [],
            tasks6: [],
            options: {
                orientation: 'landscape',
                unit: 'in',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.cargarXml = this.cargarXml.bind(this);
        this.sendXml = this.sendXml.bind(this);
        this.fetchdepa();
    }
    fetchdepa() {
        fetch('/depas')
          .then(res => res.json())
          .then(data => {
            const aux = [];
            for(const i of data){
                aux.push(i.nombre)    
            }
            aux.push("INSTITUCION COMPLETA")
            this.setState({deps: aux});
        });
    }

    fetchtask2(){
        this.setState({load2: true})
        fetch('/report2', {
            method: 'POST',
            body: JSON.stringify(
                {depa: this.state.dep}
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => { 
                Swal.fire({
                    title: "Reporte Generado Exitosamente",
                  })
                console.log(data)
                this.setState({View2: true, load2: false, tasks2: data.resultado})
            })
            .catch(err => console.error(err));
    }
    fetchTask3() {
        this.setState({load2: true})
        fetch('/report3')
          .then(res => res.json())
          .then(data => {
            Swal.fire({
                title: "Reporte Generado Exitosamente",
              })
            this.setState({View3: true, load2: false, tasks3: data.resultado})
        })
        .catch(err => console.error(err));
    }
    fetchTask4() {
        this.setState({load2: true})
        fetch('/report4')
          .then(res => res.json())
          .then(data => {
            Swal.fire({
                title: "Reporte Generado Exitosamente",
              })
            this.setState({View4: true, load2: false, tasks4: data.resultado})
        })
        .catch(err => console.error(err));
    }
    fetchTask5() {
        this.setState({load2: true})
        fetch('/report5')
          .then(res => res.json())
          .then(data => {
            Swal.fire({
                title: "Reporte Generado Exitosamente",
              })
            this.setState({View5: true, load2: false, tasks5: data.resultado})
        })
        .catch(err => console.error(err));
    }
    fetchTask6() {
        this.setState({load2: true})
        fetch('/report6')
          .then(res => res.json())
          .then(data => {
            Swal.fire({
                title: "Reporte Generado Exitosamente",
              })
            this.setState({View6: true, load2: false, tasks6: data.resultado})
        })
        .catch(err => console.error(err));
    }
    enviar(){
        
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }
    handleChangeP(e){
        this.setState({
            dep : e.value
        });
    }
    sendXml(){
        this.setState({load2: true})
        fetch('/carga', {
            method: 'POST',
            body: JSON.stringify({"xml": this.state.value}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => { 
                Swal.fire({
                    title: data.msg,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                this.setState({load2: false})
            })
            .catch(err => console.error(err));
            this.setState({value: ''});

    }

    cerrarSesion=()=>{
        window.location.href='./';
    }

    cargarXml(e){
        const file = e.target.files[0];
        if ( !file ) return;

        const fileReader = new FileReader();

        fileReader.readAsText( file );

        fileReader.onload = () => {
        console.log( fileReader.result );
        this.setState({value: fileReader.result});
        }

        fileReader.onerror = () => {
        console.log( fileReader.error );
        }
    }
    
    render (){
        return <div>
            <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                <button onClick={()=>this.cerrarSesion()}><li>Cerrar Sesion</li></button>
                </ul>
            </div>
            </nav>
            <div className="xml">
                <h1>Admin Sistema</h1>
            </div>
            <div className="box"></div>
            <Container>
                <Tabs >
                    <TabList>
                        <Tab>Carga</Tab>
                        <Tab>Reporte 1</Tab>
                        <Tab>Reporte 2</Tab>
                        <Tab>Reporte 3</Tab>
                        <Tab>Reporte 4</Tab>
                        <Tab>Reporte 5</Tab>
                        <Tab>Reporte 6</Tab>
                    </TabList>
                    <TabPanel >
                        <Tab1 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_1 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_2 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_3 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_4 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_5 this = {this} />
                    </TabPanel>
                    <TabPanel >
                        <Report_6 this = {this} />
                    </TabPanel>
                </Tabs>
            </Container>
            

            <Load this= {this}/>
        </div>
    }
}


function Tab1(props){
    return(
        <div className="xml">
                <h3>Carga Masiva</h3>
                <div>
                    <input type="file" 
                        multiple={false}
                        accept=".xml"
                        onChange={props.this.cargarXml}
                    />
                    <div className="boxer"/>
                    <div className="boxer"/>
                    <p>
                    <textarea name="value" value={props.this.state.value} onChange={props.this.handleChange} id="textExample" rows="10"  cols="60"></textarea>
                    </p>
                    <div className="boxer"/>
                    <div className="boxer"/>
                    <p>
                        <button onClick={props.this.sendXml} id='type'>Confirmar</button>
                    </p>
                </div>
        </div>
    );
}

function Report_1(props) {
    return(
        <Container>
        <div className="boxer"></div>
        <div className="boxer"></div>
        <FormGroup>
                <Dropdown name = "Dep" 
                options={props.this.state.deps} 
                onChange={props.this.handleChangeP} 
                value={props.this.state.dep}
                placeholder="Seleccione Departamento" />
        </FormGroup>
        <Button
            color="primary"
            onClick={() => props.this.fetchtask1()}
            >
            Generar Reporte 
        </Button>

        <div className="xmt">
            <h2>Reporte 1 </h2>
            </div>
            <div className="xm" >
            <text style={{textAlign: 'center'}}>Organigrama de la institución, se puede seleccionar tanto la institución completa o un departamento en específico</text>
        </div>      

        </Container>
    );
}

function Report_2(props) {
    return(
        <Container>
        <div className="boxer"></div>
        <div className="boxer"></div>
        <FormGroup>
                <Dropdown name = "Dep" 
                options={props.this.state.deps} 
                onChange={props.this.handleChangeP} 
                value={props.this.state.dep}
                placeholder="Seleccione Departamento" />
        </FormGroup>
        <Button
            color="primary"
            onClick={() => props.this.fetchtask2()}
            >
            Generar Reporte 
        </Button>
        <div ref = {ref2}>
        <div className="xmt">
            <h2>Reporte 2</h2>
            </div>
            <div className="xm" style={{float: 'center'}}>
            <text> Planilla de personas contratadas por un departamento en específico o todos los departamentos.</text>
        </div>      
        <div className="box"></div>
        {props.this.state.View2 && <div>
         <Table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Departamento</th>
                <th>Nombre y Apellido</th>
                <th>Puesto</th>
            </tr>
            </thead>
            {props.this.state.tasks2.map((dato, index) => (
                <tbody>
                <tr>
                <td>{index + 1}</td>
                <td>{dato[2]}</td>
                <td>{dato[0]} {dato[1]}</td> 
                <td>{dato[4]}</td> 
                </tr>
                </tbody>
            ))}
        </Table>
        </div>}
        </div>
        {props.this.state.View2 &&
        <Pdf targetRef={ref2} filename="reporte2.pdf"
        options={props.this.state.options} x={.5} y={.5} scale={0.8}
        >
        {({ toPdf }) => <Button
        color="success"
        style={{float: 'right'}}
        onClick={toPdf}>Descargar Reporte</Button>}
        </Pdf>}
        </Container>
    );
}

function Report_3(props) {
    return(
        <Container>
        <div className="boxer"></div>
        <div className="boxer"></div>
        <Button
            color="primary"
            onClick={() => props.this.fetchTask3()}
            >
            Generar Reporte 
        </Button>
        <div  ref={ref3}>
        <div className="xmt">
            <h2>Reporte 3</h2>
            </div>
            <div className="xm" >
            <text style={{textAlign: 'center'}}>Top 5 de departamentos con más personas contratadas</text>
        </div>      
        <div className="box"></div>
        {props.this.state.View3 && <div>
        <Table >
            <thead>
            <tr>
                <th>No.</th>
                <th>Departamento</th>
                <th>Personas Contratadas</th>
            </tr>
            </thead>
            {props.this.state.tasks3.map((dato, index) => (
                <tbody>
                <tr>
                <td>{index + 1}</td>
                <td>{dato[0]}</td>
                <td>{dato[1]}</td> 
                </tr>
                </tbody>
            ))}
        </Table>
        </div>
        }
        </div>
        {props.this.state.View3 &&
        <Pdf targetRef={ref3} filename="reporte3.pdf"
        options={props.this.state.options} x={.5} y={.5} scale={0.8}
        >
        {({ toPdf }) => <Button
        color="success"
        style={{float: 'right'}}
        onClick={toPdf}>Descargar Reporte</Button>}
        </Pdf>
        }
        </Container>
    );
}

function Report_4(props) {
    return(
        <Container>
        <div className="boxer"></div>
        <div className="boxer"></div>
        <Button
            color="primary"
            onClick={() => props.this.fetchTask4()}
            >
            Generar Reporte 
        </Button>    
        <div ref={ref4}>
        <div className="xmt">
            <h2>Reporte 4</h2>
            </div>
            <div className="xm" >
            <text style={{textAlign: 'center'}}>Top 5 de reclutadores con más invitaciones enviadas</text>
        </div>         
        <div className="box"></div>
        {props.this.state.View4 && <div>
        <Table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Revisor</th>
                <th>Expedientes Asignados</th>
            </tr>
            </thead>
            {props.this.state.tasks4.map((dato, index) => (
                <tbody>
                <tr>
                <td>{index + 1}</td>
                <td>{dato[0]}</td>
                <td>{dato[1]}</td> 
                </tr>
                </tbody>
            ))}
        </Table>
        </div>}
        </div>  
        {props.this.state.View4 &&
        <Pdf targetRef={ref4} filename="reporte4.pdf"
        options={props.this.state.options} x={.5} y={.5} scale={0.8}
        >
        {({ toPdf }) => <Button
        color="success"
        style={{float: 'right'}}
        onClick={toPdf}>Descargar Reporte</Button>}
        </Pdf>
        }  
        </Container>
    );
}

function Report_5(props) {
    return(
        <Container>
        <div className="boxer"></div>
        <div className="boxer"></div>
        <Button
            color="primary"
            onClick={() => props.this.fetchTask5()}
            >
            Generar Reporte 
        </Button>
        <div ref={ref5}>
        <div className="xmt">
            <h2>Reporte 5 </h2>
            </div>
            <div className="xm" >
            <text style={{textAlign: 'center'}}>Top 5 de aplicantes con la mayor cantidad de documentos rechazados</text>
        </div>          
        <div className="box"></div>
        {props.this.state.View5 && <div>
        <Table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Nombre y Apellido</th>
                <th>Documentos Rechazados</th>
            </tr>
            </thead>
            {props.this.state.tasks5.map((dato, index) => (
                <tbody>
                <tr>
                <td>{index + 1}</td>
                <td>{dato[0]} {dato[1]}</td>
                <td>{dato[2]}</td> 
                </tr>
                </tbody>
            ))}
        </Table>
        </div>}
        </div>
        {props.this.state.View5 &&
        <Pdf targetRef={ref5} filename="reporte5.pdf"
        options={props.this.state.options} x={.5} y={.5} scale={0.8}
        >
        {({ toPdf }) => <Button
        color="success"
        style={{float: 'right'}}
        onClick={toPdf}>Descargar Reporte</Button>}
        </Pdf>
        }  
        </Container>
    );
}

function Report_6(props) {
    return(
        <Container>
            <div className="boxer"></div>
            <div className="boxer"></div>
        <Button
            color="primary"
            onClick={() => props.this.fetchTask6()}
            >
            Generar Reporte 
        </Button>
        <div ref={ref6}>
        <div className="xmt">
            <h2>Reporte 6 </h2>
            </div>
            <div className="xm" >
            <text style={{textAlign: 'center'}}>Top 5 de Departamentos con mayor uso de su capital total y el puesto con mayor salario con el que cuenta</text>
        </div>      
        <div className="box"></div>
        {props.this.state.View6 && <div>
        <Table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Departamento</th>
                <th>Uso de Capital</th>
                <th>Puesto</th>
                <th>Salario</th>
            </tr>
            </thead>
            {props.this.state.tasks6.map((dato, index) => (
                <tbody>
                <tr>
                <td>{index + 1}</td>
                <td>{dato[0]}</td>
                <td>{dato[1]}</td> 
                <td>{dato[2]}</td>
                <td>{dato[3]}</td> 
                </tr>
                </tbody>
            ))}
        </Table>
        </div>}
        </div>
        {props.this.state.View6 &&
        <Pdf targetRef={ref6} filename="reporte6.pdf"
        options={props.this.state.options} x={.5} y={.5} scale={0.8}
        >
        {({ toPdf }) => <Button
        color="success"
        style={{float: 'right'}}
        onClick={toPdf}>Descargar Reporte</Button>}
        </Pdf>
        }  
        </Container>
    );
}


function Load(props){
    return (
        <Modal isOpen={props.this.state.load2} fade={false}>
        <div class="load">
        <hr/><hr/><hr/><hr/>
        </div>
        </Modal>
    );
}


export default AdminSystem;