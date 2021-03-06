import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login/register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            checked_id: "",
            password: "",
            password_check: "",
            name: "",
            email : "",
            belong : "",
        }
    }

    idChange = (e) => {this.setState({id: e.target.value})};
    pwdChange = (e) => {this.setState({password: e.target.value})};
    pwdCheckChange = (e) => {this.setState({password_check: e.target.value})};
    nameChange = (e) => {this.setState({name: e.target.value})};
    emailChange = (e) => {this.setState({email: e.target.value})};
    belongChange = (e) => {this.setState({belong: e.target.value})};

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/signup", {
            id: this.state.id,
            checked_id: this.state.checked_id,
            password: this.state.password,
            password_check: this.state.password_check,
            name: this.state.name,
            email: this.state.email,
            belong: this.state.belong,
        }).then((res) => {
            console.log(res)
            if (res.status === 210) {
                alert(res.data.message)
            }
            else {
                alert(res.data.message)
                document.location.href = "/";
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    onClickCheckId = () => {
        axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/checkid", {
            params: {
                id: this.state.id,
            }
        }).then((res) => {
            console.log(res)
            if (res.status === 210) {
                this.setState({checked_id: res.data.checked_id})
                alert(res.data.message)
            }
            else if (res.status === 200) {
                this.setState({checked_id: res.data.checked_id})
                alert(res.data.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onClickSubmit();
        }
    };

    render() {
        return (
                <div className = "registerForm">
                        <Form>
                        <Form.Group className="div-id-form">
                            <Form.Label className="text">?????????</Form.Label>
                            <Form.Control className="idInput-form" placeholder="?????????" onChange={this.idChange}/>
                            <Button className="idCheck-Button" variant="primary" onClick={this.onClickCheckId}>
                            ????????????
                            </Button>
                        </Form.Group>
                    
                        <Form.Group className="rg-div-form">
                            <Form.Label className="text">????????????</Form.Label>
                            <Form.Control type="password" placeholder="????????????" onChange={this.pwdChange}/>
                        </Form.Group>
                        
                        <Form.Group className="rg-div-form">
                            <Form.Label className="text">???????????? ?????????</Form.Label>
                            <Form.Control type="password" placeholder="???????????? ?????????" onChange={this.pwdCheckChange}/>
                        </Form.Group>

                        <Form.Group className="rg-div-form">
                            <Form.Label className="text">??????</Form.Label>
                            <Form.Control placeholder="??????" onChange={this.nameChange}/>
                        </Form.Group>

                        <Form.Group className="rg-div-form">
                            <Form.Label className="text">?????????</Form.Label>
                            <Form.Control placeholder="?????????" type="email" onChange={this.emailChange}/>
                        </Form.Group>

                        <Form.Group className="rg-div-form">
                            <Form.Label className="text">??????</Form.Label>
                            <Form.Control placeholder="??????"  onKeyPress={this.handleKeyPress} onChange={this.belongChange}/>
                        </Form.Group>
                    </Form>
                    
                    <Button className="register-Button" variant="primary" type="submit" onClick={this.onClickSubmit}>
                            ????????????
                    </Button>
                </div>
        );
    }
}

export default Register;