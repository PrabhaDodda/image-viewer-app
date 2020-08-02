import React, {Component} from 'react';
import './Login.css';
import Header from '../../common/header/Header.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText';
import Home from '../../screens/home/Home';
import {BrowserRouter, Redirect } from 'react-router-dom'
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            requiredUsername: "dispNone",
            requiredPassword: "dispNone",
            errorMessage: "dispNone",
            loginSucess: false,
            loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
        }
    }

    // Setting the parameter value of username entered by user

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    // Setting the parameter value of password entered by user

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    //On click event handler on login button to read the username and password values entered by user and perform subsequent steps
    loginButtonHandler = () => {
        this.state.username === "" ? this.setState({ requiredUsername: "dispBlock" }) : this.setState({ requiredUsername: "dispNone" });
        this.state.password === "" ? this.setState({ requiredPassword: "dispBlock" }) : this.setState({ requiredPassword: "dispNone" });
        let usernameInput = "TestUser";
        let passwordInput = "Password";
        if (this.state.username === usernameInput && this.state.password === passwordInput) {
            this.setState({loggedIn:'true'});
            sessionStorage.setItem('access_token', 'AQCVoKqEkDwUSYs6alg8YUe1zn85XuHK8YxspOeQq-4_iYHGE-FVCWfENVkR6HQdJlKLVBQ3FJsE0gtXlEk-6ij_OZQB2x571yrI4_7zCoihi4mMn2dAI3ODdKqMbzz7i631IER1qibbUIofSA3lOdGvvHRrT9pUHWHYrvhlhQNf8QXI_idf7mFp15BoB9Uipq8lrRuh0_kGBWogOGLBBxwkuYsfv6F0yo3cP_GkQjuUtw');
            ReactDOM.render(<Home baseUrl={this.props.baseUrl} />, document.getElementById('root'));
        }
        else {
            if (this.state.username !== "" && this.state.password !== "")
                this.setState({ error: "dispBlock" });
        }
    }

    render() {
        return (
            <div>
                 {this.state.loggedIn === true ?   
                    <BrowserRouter>
                    <Redirect to="/home" Component={Login} /></BrowserRouter>
                    :
                    <div>
                        {/* Calling Header definitions */}
                        <Header baseUrl={this.props.baseUrl} />
                <Card className="card-style">
                <CardContent>
        <Typography variant="h4">
         LOGIN
        </Typography>
        <br/>
        <FormControl required className="form-style">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} value={this.state.username} />
            <FormHelperText className={this.state.reqiredUsername}><span className="red">required</span></FormHelperText>
        </FormControl><br /><br />
                                <FormControl required className="form-style">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                    <FormHelperText className={this.state.requiredPassword}><span className="red">required</span></FormHelperText>
                                </FormControl> <br /><br />
                                <FormControl required className="form-style">
                                    <FormHelperText className={this.state.errorMessage}><span className="red">Incorrect username and/or password</span></FormHelperText>
                                </FormControl><br /><br />
                                <Button variant="contained" onClick={this.loginButtonHandler} color="primary">
                                    LOGIN
                            </Button>
                            </CardContent>
                        </Card>
            </div>
    }
    </div>
        )
    }
}

export default Login;