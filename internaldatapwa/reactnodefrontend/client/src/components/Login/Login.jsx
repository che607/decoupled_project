import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken.js';
import jwt from 'jsonwebtoken';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            error:''
        }
    }

    handleClick(){

        let data = JSON.stringify({
            "name":this.state.username,
            "pass":this.state.password
        });

        axios.post("http://d8decoupled.test/user/login?_format=json", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log("SUCCESS: ", response);
            const token = response.data.csrf_token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            console.log("jwt: ", jwt.decode(token));
        }).catch(err => {
            console.log("ERROR: ", err);
            this.setState({ error: "Credentials do not match!" });
        });
    };

    render() {
        return (
            <div className="login">
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Unleashed Technologies Internal Data"
                        />
                        <h4 className="loginError">{this.state.error}</h4>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        {/*<RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSearch} />*/}
                        </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;