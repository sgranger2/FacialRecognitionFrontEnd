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
  error: false,
  faceData: [],
  displayDemographics: {},
  activeFace: 0,
  route: 'login',
  isSignedIn: false,
  user: {
    id: '',
    name: 'guest',
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


  calculateFaceData = (data) => {
    this.setState({error: false});
    return data.outputs[0].data.regions.map(face => {
      let facebox = face.region_info.bounding_box;
      let image = document.getElementById('inputimage');
      let width = Number(image.width);
      let height = Number(image.height);
      let demographicInfo = face.data.face;
      return {
        leftCol: facebox.left_col * width,
        topRow: facebox.top_row * height,
        rightCol: width - (facebox.right_col * width),
        bottomRow: height - (facebox.bottom_row * height),
        demographics: {
          age: demographicInfo.age_appearance.concepts[0].name,
          gender: demographicInfo.gender_appearance.concepts[0].name,
          ethnicity: demographicInfo.multicultural_appearance.concepts[0].name,
        }
      }
    });
  }

  displayFaceData = (faceData) => {
    const currentFace = this.state.activeFace;
    this.setState({ 
      faceData: faceData, 
      displayDemographics: faceData[currentFace].demographics});
  }

  selectFace = (index) => {
    this.setState({displayDemographics: this.state.faceData[index].demographics, activeFace: index})
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
    this.setState({ imageUrl: this.state.input, faceData: [], activeFace: 0 });
    fetch('https://shanes-facial-recognition-app.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      }).then(response => response.json()).then(
      (response) => {
        this.displayFaceData(this.calculateFaceData(response));
      },
    ).catch((err) => {
      console.log(err);
      this.setState({ error: true });
    })
  }

  onTryItOutButton = () => {
    this.setState({ 
      imageUrl: 'https://data.whicdn.com/images/314046099/large.jpg',
      faceData: [],
      activeFace: 0 });
    fetch('https://shanes-facial-recognition-app.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: 'https://data.whicdn.com/images/314046099/large.jpg'
        })
      }).then(response => response.json()).then(
      (response) => {
        this.displayFaceData(this.calculateFaceData(response));
      },
    ).catch((err) => {
      console.log(err);
      this.setState({ error: true });
    })
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home"
          ? <Home
            userName={this.state.user.name}
            onTryItOutButton={this.onTryItOutButton}
            onInputChange={this.onInputChange}
            onSubmitButton={this.onSubmitButton}
            selectFace={this.selectFace}
            faceData={this.state.faceData}
            displayDemographics={this.state.displayDemographics}
            activeFace={this.state.activeFace}
            imageUrl={this.state.imageUrl}
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
