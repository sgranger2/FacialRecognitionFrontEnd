import React from 'react';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onSubmitSignIn = () => {
        if (!this.state.name || !this.state.email || !this.state.password) {
            alert('Incorrect form submission');
        } else {
            fetch('http://localhost:3000/signup', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user)
                        this.props.onRouteChange('home');
                    }
                })
        } 
    }

    render() {
        return (
            <article className=' article center w-100 w-60-m w-30-l mv4 mw6 ba b--black-10 br3 shadow-5'>
                <legend className='signup f1 fw7'>Sign Up</legend>
                <div className="mt3">
                    <input
                        className="input-reset ba bg-transparent br4"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name"
                        onChange={this.onNameChange}
                    />
                </div>
                <div>
                    <input
                        className="input-reset ba bg-transparent br4"
                        type="email"
                        name="email-address"
                        id="email-address"
                        placeholder="email address"
                        onChange={this.onEmailChange}
                    />
                </div>
                <div>
                    <input
                        className=" input-reset ba bg-transparent br4"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        onChange={this.onPasswordChange}
                    />
                </div>
                <div>
                    <input
                        onClick={this.onSubmitSignIn}
                        className="submit b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
                        type="submit"
                        value="Sign Up"
                    />
                </div>
            </article>
        );
    }
}

export default Signup;