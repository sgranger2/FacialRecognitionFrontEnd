import React from 'react';

class Login extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: ''
  }

  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  }

  onPasswordChange = (e) => {
    this.setState({ signInPassword: e.target.value });
  }

  onSubmitSignIn = () => {
    if (!this.state.signInEmail || !this.state.signInPassword) {
      alert('Incorrect email or password');
    } else {
      fetch('https://shanes-facial-recognition-app.herokuapp.com/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('home');
          }
          else {
            alert('Incorrect email or password');
          }
        })
    }
  }

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className=' article center w-100 w-60-m w-30-l mw6 ba b--black-10 br3 shadow-5'>
        <legend className='login f1 fw7'>Log In</legend>
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
            value="Log in"
          />
        </div>
        <div className="lh-copy mt3">
          <p onClick={() => onRouteChange('signup')} className="f6 link dim black db pointer">Sign Up</p>
        </div>
      </article>
    );
  }
}

export default Login;