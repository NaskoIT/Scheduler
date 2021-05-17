import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { email, password } = this.state;
        // this.props.registerHandler({ username, password, email });
        console.log(email);
        console.log(password);
    }

    render() {
        return (
            <div class="w-50 mx-auto">
                <h1 class="mb-4">Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Email address</label>
                        <input onChange={this.onChangeHandler} name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="password" class="form-label">Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="password" class="form-control" id="password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login