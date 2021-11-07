import React, { Component } from "react";
import '../styles/login.css'
import Cookies from 'universal-cookie';
import {
    Modal,
} from "reactstrap";
import Swal from 'sweetalert2'


const cookies = new Cookies();


class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            load2: false,
            pass: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.prob = this.prob.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    prob(e) {
        this.setState({ load2: true })
        e.preventDefault();
        fetch('/loginn', {
            method: 'POST',
            body: JSON.stringify({
                usuario: this.state.user,
                pass: this.state.pass
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                switch (data.Rol) {
                    case "Admin Sistema":
                        window.location.href = `./AdminSystem`;
                        break;
                    case "Admin Usuario":
                        window.location.href = "./AdminUser";
                        break;
                    case "Coordinador":
                        window.location.href = `./Coordinador/${data.id}`;
                        break;
                    case "Reclutador":
                        console.log(data.id)
                        window.location.href = `./reclutar/${data.id}`;
                        break;
                    case "Revisor":
                        window.location.href = `./reviewer/${data.id}`;
                        break;
                    case undefined:
                        console.log("NADA")
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario y/o Contraseña incorrecta',
                        })
                        this.setState({ user: '', pass: '', load2: false });
                        break;
                    case "Aplicante":
                        window.location.href = `./Applicant/${data.id}`;
                        break;
                    default:
                        break;
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        return <div className="login">
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <h2 class="active"> Iniciar sesion </h2>
                    <div class="fadeIn first">
                    </div>
                    <form onSubmit={this.prob}>
                        <input type="text" id="login" class="fadeIn second" name="user" onChange={this.handleChange} value={this.state.user} placeholder="Usuario" />
                        <input type="password" id="password" class="fadeIn third" name="pass" onChange={this.handleChange} value={this.state.pass} placeholder="Contraseña" />
                        <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>
                </div>
            </div>
            <Load this={this} />
        </div>
    }
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

export default login;