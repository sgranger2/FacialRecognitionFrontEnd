import React, { Component } from 'react';
import './App.css';
import './queries.css'
import Particles from 'react-particles-js';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Title from './components/Title';
const particlesOptions = require('./particlesjs-config.json');

const initialState = {
  input: '',
  imageUrl: '',
  age: null,
  gender: null,
  ethnicity: null,
  error: false,
  box: {},
  route: 'login',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

class App extends Component {

  state = initialState;

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    }})
  }


  calculateFaceBox = (data) => {
    const facebox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: facebox.left_col * width,
      topRow: facebox.top_row * height,
      rightCol: width - (facebox.right_col * width),
      bottomRow: height - (facebox.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onRouteChange = (route) => {
    if (route === 'logout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onSubmitButton = () => {
    this.setState({ imageUrl: this.state.input, age: null, gender: null, ethnicity: null });
    fetch('https://shanes-facial-recognition-app.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      }).then(response => response.json()).then(
      (response) => {
        this.setState({
          age: response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name,
          gender: response.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name,
          ethnicity: response.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name,
          error: false
        });
        this.displayFaceBox(this.calculateFaceBox(response));
      },
      (err) => {
        console.log(err);
        this.setState({ error: true });
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home"
          ? <Home
            userName={this.state.user.name}
            onInputChange={this.onInputChange}
            onSubmitButton={this.onSubmitButton}
            box={this.state.box}
            imageUrl={this.state.imageUrl}
            age={this.state.age}
            gender={this.state.gender}
            ethnicity={this.state.ethnicity}
            error={this.state.error} />
          :
          (this.state.route === "login" || this.state.route === "logout"
            ? <div><Title /> <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} /></div>
            : <div><Title /> <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} /></div>
          )}
      </div>
    );
  }
}

export default App;
