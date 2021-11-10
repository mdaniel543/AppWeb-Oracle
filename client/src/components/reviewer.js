import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getCurrentDate } from '../utils/date'
import Swal from 'sweetalert2'
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";
import Chat from "./Chat";


class Reviewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            load: true,
            laod2: false,
            nombre: '',
            modalBuscar: false,
            copy: [],
            modalVer: false,
            search: {
                nombre: null,
                puesto: null,
                estado: null
            },
            data: {},
            auth: false,
            chatname: '',
            ar: {},
            archivos: [],
            bus: false,
            expedientes: [],
            puestos: [],
            estados: ["Sin revisar", "Aceptado", "Correccion", "Corregido"],
            motivo: '',
            modalMotivo: false,
            bandera: false,
            fileName: '',
            file: '',
            ReqFile: '',
            ViewFile: false,
            date: getCurrentDate()
        };
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleChangeE = this.handleChangeE.bind(this);
        this.fetchProfile();
        this.fetchDepa();
        this.fetchTasks();
    }
    fetchDepa() {
        fetch('/depasr', {
            method: 'POST',
            body: JSON.stringify({
                per: this.state.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.fetchPuestos(data.id)
            })
            .catch(err => console.error(err));
    }

    fetchProfile() {
        fetch('/pers', {
            method: 'POST',
            body: JSON.stringify({
                per: this.state.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ nombre: data.nombre })
            })
            .catch(err => console.error(err));
    }

    fetchPuestos(id) {
        console.log(this.state.depa);
        fetch('/puestos', {
            method: 'POST',
            body: JSON.stringify({
                depa: id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ puestos: data });
            })
            .catch(err => console.error(err));
    }

    fetchTasks() {
        fetch('/selectre', {
            method: 'POST',
            body: JSON.stringify({
                personal: this.state.id,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ expedientes: data, copy: data });
                this.setState({ load: false })
            })
            .catch(err => console.error(err));
    }

    fetchTasks1() {
        fetch('/selectre', {
            method: 'POST',
            body: JSON.stringify({
                personal: this.state.id,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ expedientes: data, copy: data });
                for (const exp of data) {
                    if (exp.cui === this.state.data.cui) {
                        this.setState({ data: exp, archivos: exp.archivos })
                        break;
                    }
                }
                this.setState({ modalVer: true });
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
    }

    cerrarSesion() {
        window.location.href = '../';
    }

    mostrarModalBuscar() {
        this.setState({ modalBuscar: true })
    }

    handleChangeS(e) {
        const { name, value } = e.target;
        this.setState({
            search: {
                ...this.state.search,
                [name]: value
            },
        });
    }
    handleChangeP(e) {
        this.setState({
            search: {
                ...this.state.search,
                puesto: e.value
            },
        });
    }
    handleChangeE(e) {
        this.setState({
            search: {
                ...this.state.search,
                estado: e.value
            },
        });
    }
    handleChange(e) {
        this.setState({
            motivo: e.target.value
        })
    }
    buscar() {
        this.setState({ load2: true })
        console.log(this.state.search)
        var estado = null
        if (this.state.search.estado === 'Sin Revisar') estado = '2';
        if (this.state.search.estado === 'Aceptado') estado = '1';
        if (this.state.search.estado === 'Correccion') estado = '0';
        if (this.state.search.estado === 'Corregido') estado = '3';

        fetch('/searche', {
            method: 'POST',
            body: JSON.stringify({
                personal: this.state.id,
                pueston: this.state.search.puesto,
                estado: estado,
                nombree: this.state.search.nombre
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ expedientes: data });
                this.setState({ load2: false, bus: true })
            })
            .catch(err => console.error(err));
        this.setState({ modalBuscar: false })
        this.setState({
            search: {
                ...this.state.search,
                nombre: null,
                puesto: null,
                fecha: null
            },
        });
    }
    cerrarModalBuscar() {
        this.setState({ modalBuscar: false })
    }

    cerrarModalVer() {
        this.setState({ modalVer: false })
    }

    async abrir(exp, req) {
        this.setState({file: `http://localhost:5000/static/expedientes/${exp}`})
        this.setState({ ReqFile: req, fileName: exp, ViewFile: true });
    }

    cerrarModalViewFile() {
        this.setState({ ViewFile: false });
    }

    decargarExp(cv) {
        this.setState({ load2: true })
        fetch('/controller2', {
            method: 'POST',
            body: JSON.stringify({
                d: cv
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${cv}`,
                );
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link.click();
                this.setState({ load2: false })
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }
    aceptar(dato) {
        this.setState({ load2: true, modalVer: false, bandera: true })
        fetch('/archivos', {
            method: 'PUT',
            body: JSON.stringify({
                ida: dato.archivoID,
                estado: '1'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Hecho!',
                    'Archivo Aceptado Correctamente',
                    'success'
                )
                this.fetchTasks1();

            })
            .catch(err => console.error(err));
    }
    rechazar() {
        this.setState({ load2: true, modalMotivo: false, bandera: true })
        fetch('/archivos', {
            method: 'PUT',
            body: JSON.stringify({
                ida: this.state.ar.archivoID,
                estado: '0'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire(
                    'Hecho!',
                    'Archivo rechazado correctamente',
                    'success'
                )
                this.fetchTasks1();
            })
            .catch(err => console.error(err));
        //------------------------------------------
        this.setState({ load2: true })
        fetch('/historial', {
            method: 'POST',
            body: JSON.stringify({
                correo: this.state.data.correo,
                nombre: this.state.data.nombre,
                requisito: this.state.ar.requisito,
                ruta: this.state.ar.ruta,
                motivo: this.state.motivo,
                fecha: this.state.date,
                ida: this.state.ar.archivoID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
    }
    mostrarModalMotivo(dato) {
        this.setState({ modalMotivo: true, ar: dato })
    }
    cerrarModalMotivo() {
        this.setState({ modalMotivo: false })
    }

    enviar() {
        this.setState({ load: true })
        this.cerrarModalVer();
        var aux = '1';
        for (const i of this.state.data.archivos) {
            if (i.aceptado === '0') {
                aux = '0';
            }
            if (i.aceptado === '2') {
                aux = '2';
                break;
            }
        }
        if (aux === '1') {
            fetch('/sendcorreo', {
                method: 'POST',
                body: JSON.stringify({
                    correo: this.state.data.correo,
                    nombre: this.state.data.nombre
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.msg)
                })
                .catch(err => console.error(err));
        }
        fetch('/expedientes', {
            method: 'PUT',
            body: JSON.stringify({
                cui: this.state.data.cui,
                estado: aux
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire(
                    'Hecho!',
                    'Expediente Revisado correctamente',
                    'success'
                )
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        this.setState({ bandera: false })
    }

    cerrarBusqueda() {
        this.setState({ expedientes: this.state.copy, bus: false })
    }
    mostrarModalVer(dato) {
        this.setState({ data: dato, modalVer: true })
        this.setState({ archivos: dato.archivos })
    }
    chatear(nombre) {
        this.setState({ auth: true, chatname: nombre })
    }
    regresa() {
        this.setState({ auth: false })
    }

    render() {
        return (
            <div>
                <Menu this={this} />
                <Search this={this} />
                <Ver this={this} />
                <Load this={this} />
                <ViewA this={this} />
                <Motivo this={this} />
                <Container>
                    <Tabs>
                        <TabList>
                            <Tab>Expedientes</Tab>
                            <Tab>CHAT</Tab>
                        </TabList>
                        <TabPanel>
                            {(() => {
                                if (this.state.load === true) {
                                    return <Container>
                                        <div class="load">
                                            <hr /><hr /><hr /><hr />
                                        </div>
                                    </Container>
                                } else {
                                    return (
                                        <div>
                                            <div className="xml">
                                                <h3>Expedientes Asignados</h3>
                                            </div>
                                            <div className="box"></div>
                                            <Fethc this={this} />
                                        </div>

                                    );
                                }
                            })()}
                        </TabPanel>
                        <TabPanel>
                            {!this.state.auth && <FChat this={this} />}
                            {this.state.auth && <HChat this={this} />}
                        </TabPanel>
                    </Tabs>
                </Container>
            </div>
        );
    }
}

function ViewA(props) {
    return (
        <Modal isOpen={props.this.state.ViewFile} fade={false} size="lg" style={{ maxWidth: '700px', width: '100%' }}>
            <ModalHeader>
                <div><h3>{props.this.state.ReqFile}</h3></div>
            </ModalHeader>
            <ModalBody>
                <embed src={props.this.state.file} alt="trial" width="650" height="500"></embed>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="danger"
                    onClick={() => props.this.cerrarModalViewFile()}
                >
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>

    );
}

function Load(props) {
    return (
        <Modal isOpen={props.this.state.load2} fade={false}>
            <div class="load">
                <hr /><hr /><hr /><hr />
            </div>
        </Modal>
    );
}

function Menu(props) {
    return (<div>
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    <button onClick={() => props.this.mostrarModalBuscar()}><li>Buscar</li></button>
                    <div className='boxer' />
                    <button onClick={() => props.this.cerrarSesion()}><li>Cerrar Sesion</li></button>
                </ul>
            </div>
        </nav>
        <div className='xml'>
            <h2>Revisor {props.this.state.nombre}</h2>
        </div>
        <div className="box"></div>
    </div>
    );
}

function Search(props) {
    return (
        <Modal isOpen={props.this.state.modalBuscar} fade={false}>
            <ModalHeader>
                <div><h3>Buscar Expediente</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Nombre:
                    </label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        onChange={props.this.handleChangeS}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Puesto
                    </label>
                    <Dropdown name="puesto"
                        options={props.this.state.puestos}
                        onChange={props.this.handleChangeP}
                        value={props.this.state.search.puesto}
                        placeholder="--" />
                </FormGroup>
                <FormGroup>
                    <label>
                        Estado
                    </label>
                    <Dropdown name="estado"
                        options={props.this.state.estados}
                        onChange={props.this.handleChangeE}
                        value={props.this.state.search.estado}
                        placeholder="--" />
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => props.this.buscar()}
                >
                    Buscar
                </Button>
                <Button
                    color="danger"
                    onClick={() => props.this.cerrarModalBuscar()}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

function Ver(props) {
    return (
        <Modal isOpen={props.this.state.modalVer} fade={false}>
            <ModalHeader>
                <div><h3>Archivos del expediente de {props.this.state.data.nombre}</h3></div>
            </ModalHeader>
            <ModalBody>
                <Table>
                    <thead>
                        <tr>
                            <th>Requisito</th>
                            <th>Estado</th>
                            <th>Visualizar</th>
                            <th></th>
                        </tr>
                    </thead>
                    {props.this.state.archivos.map((dato) => (
                        (() => {
                            if (dato.aceptado === '1') {
                                return <Ift dato={dato} this={props.this} />
                            } else if (dato.aceptado === '0') {
                                return <Elset dato={dato} this={props.this} />
                            } else if (dato.aceptado === '2') {
                                return <Nothingt dato={dato} this={props.this} />
                            }
                        })()
                    ))}
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => props.this.enviar()}
                >
                    Actualizar Expediente
                </Button>
                {(() => {
                    if (props.this.state.bandera === false) {
                        return <Button
                            color="danger"
                            onClick={() => props.this.cerrarModalVer()}
                        >
                            Cerrar
                        </Button>
                    }
                })()}
            </ModalFooter>
        </Modal>
    );
}

function Ift(props) {
    var dato = props.dato;
    return (
        <tbody style={{ backgroundColor: "#81C784" }}>
            <tr key={dato.id} >
                <td>{dato.requisito}</td>
                <td>Aceptado</td>
                <td>
                    <Button
                        onClick={() => props.this.decargarExp(dato.ruta)}>
                        Descargar
                    </Button>
                    {"  "}
                    <Button
                        onClick={() => props.this.abrir(dato.ruta, dato.requisito)}>
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Elset(props) {
    var dato = props.dato;
    return (
        <tbody style={{ backgroundColor: "#F44336" }}>
            <tr key={dato.id} >
                <td>{dato.requisito}</td>
                <td>Rechazado</td>
                <td>
                    <Button
                        onClick={() => props.this.decargarExp(dato.ruta)}>
                        Descargar
                    </Button>
                    {"  "}
                    <Button
                        onClick={() => props.this.abrir(dato.ruta, dato.requisito)}>
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Nothingt(props) {
    var dato = props.dato;
    return (
        <tbody >
            <tr key={dato.id} >
                <td>{dato.requisito}</td>
                <td>Sin revisar</td>
                <td>
                    <Button
                        onClick={() => props.this.decargarExp(dato.ruta)}>
                        Descargar
                    </Button>
                    {"  "}
                    <Button
                        onClick={() => props.this.abrir(dato.ruta, dato.requisito)}>
                        Ver
                    </Button>
                </td>
                <td>
                    <Button
                        color="success"
                        onClick={() => props.this.aceptar(dato)}
                    >
                        Aceptar
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => props.this.mostrarModalMotivo(dato)}
                    >
                        Rechazar
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Motivo(props) {
    return (
        <Modal isOpen={props.this.state.modalMotivo} fade={false}>
            <ModalHeader>
                <div><h3>Detalles de rechazo</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Motivo
                    </label>
                    <textarea
                        className="form-control"
                        name="motivo"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => props.this.rechazar()}
                >
                    Enviar Correccion
                </Button>
                <Button
                    color="danger"
                    onClick={() => props.this.cerrarModalMotivo()}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
function HChat(props) {
    return <div>

        <div class="box"></div>
        <Button style={{ float: 'left' }}
            className="btn btn-danger"
            onClick={() => props.this.regresa()}
        >
            X
        </Button>

        <Chat nombre={props.this.state.nombre} other={props.this.state.chatname} />
    </div>
}

function FChat(props) {
    return (
        <Container>
            <br />
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Abrir Chat</th>
                    </tr>
                </thead>

                {props.this.state.expedientes.map((dato) => (
                    <tbody>
                        <tr key={dato.id} >
                            <td>{dato.nombre}</td>
                            <td>{dato.puesto}</td>
                            <td>
                                <Button
                                    onClick={() => props.this.chatear(dato.nombre)}>
                                    Chatear
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Container>
    );
}


function Fethc(props) {
    return (
        <Container>
            <br />
            {(() => {
                if (props.this.state.bus === true) {
                    return <Container>
                        <Button style={{ float: 'right' }}
                            className="btn btn-danger"
                            onClick={() => props.this.cerrarBusqueda()}
                        >
                            X
                        </Button>
                        <div class="box"></div>
                    </Container>
                }
            })()}
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Estado</th>
                        <th>Ver Expediente</th>
                    </tr>
                </thead>

                {props.this.state.expedientes.map((dato) => (
                    (() => {
                        if (dato.estado_e === '1') {
                            return <Ifyes dato={dato} this={props.this} />
                        } else if (dato.estado_e === '0') {
                            return <Elsen dato={dato} this={props.this} />
                        } else if (dato.estado_e === '2') {
                            return <Nothing dato={dato} this={props.this} />
                        }
                        else if (dato.estado_e === '3') {
                            return <Another dato={dato} this={props.this} />
                        }
                    })()
                ))}
            </Table>
        </Container>
    );
}

function Ifyes(props) {
    var dato = props.dato;
    return (
        <tbody style={{ backgroundColor: "#81C784" }}>
            <tr key={dato.id} >
                <td>{dato.nombre}</td>
                <td>{dato.puesto}</td>
                <td>Aceptado</td>
                <td>
                    <Button
                        onClick={() => props.this.mostrarModalVer(dato)}
                    >
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Elsen(props) {
    var dato = props.dato;
    return (
        <tbody style={{ backgroundColor: "#EAE718" }}>
            <tr key={dato.id}>
                <td>{dato.nombre}</td>
                <td>{dato.puesto}</td>
                <td>Enviado a Corregir</td>
                <td>
                    <Button
                        onClick={() => props.this.mostrarModalVer(dato)}
                    >
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Nothing(props) {
    var dato = props.dato;
    return (
        <tbody>
            <tr key={dato.id} >
                <td>{dato.nombre}</td>
                <td>{dato.puesto}</td>
                <td>Sin revisar</td>
                <td>
                    <Button
                        onClick={() => props.this.mostrarModalVer(dato)}>
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

function Another(props) {
    var dato = props.dato;
    return (
        <tbody style={{ backgroundColor: "#67A5DB" }} >
            <tr key={dato.id} >
                <td>{dato.nombre}</td>
                <td>{dato.puesto}</td>
                <td>Corregido (Sin Revisar)</td>
                <td>
                    <Button
                        onClick={() => props.this.mostrarModalVer(dato)}>
                        Ver
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}

export default Reviewer;