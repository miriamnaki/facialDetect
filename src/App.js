import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai'

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
// import Particles from 'react-tsparticles';
import 'tachyons';
import { Component } from 'react';

// api key
const app = new Clarifai.App({
  apiKey: 'fac5c841f3114888ba420b05a355df61'
 });

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)

  }

  onSubmit = () => {
    console.log('click')
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15', 'https://samples.clarifai.com/face-det.jpg').then(function(response){
      console.log(response)
    }, function(err){
      console.log(err)

    })
  }
  render(){

    return (
      <div className="App">
        {/* <Particles> */}
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} 
          onButtonSubmit = {this.onSubmit}/>
          {/* <FaceRecognition/> */}
  
        {/* </Particles> */}
      
      </div>
    );
  }
}

export default App;
