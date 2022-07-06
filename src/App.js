import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import 'tachyons';
import { Component } from 'react';

// (  
//   <Logo/>,
//   <Rank/>,
//   <ImageLinkForm onInputChange={this.onInputChange} 
//   onButtonSubmit={this.onSubmitButton}/>,
//   <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
//  )

// api key
//'53e1df302c079b3db8a0a36033ed2d15'
const app = new Clarifai.App({
  apiKey: 'fac5c841f3114888ba420b05a355df61'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (userData) => {
    this.setState({user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }})
    
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); 
  }
  
  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(error => {
        console.log(error);
    })
  }

  calculateFaceLocation = (data) => {
    const clarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifai.left_col * width,
      topRow: clarifai.top_row * height,
      rightCol: width -(clarifai.right_col * width),
      bottomRow: height - (clarifai.bottom_row * height)
    } 
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  // fetching data from ther server
  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(res => res.json())
  //   .then(console.log)
  //   .catch(err => console.log(err))
  // }

  render(){
    return (
      <div className="App">     
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home' ? 
            <>
                <Logo/>
                <Rank 
                  userName={this.state.user.name}
                  userEntries={this.state.user.entries}
                />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onSubmitButton}/>
                <FaceRecognition 
                  box={this.state.box} 
                  imageUrl={this.state.imageUrl}/>
            </>  : (
              this.state.route === 'signin' ?
              <SignIn 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              /> :
              <Register 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
            )
                   
          }              
      </div>
    );
  }
}

export default App;
