import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
// import Particles from 'react-tsparticles';
import 'tachyons';
import { Component } from 'react';

// api key
//'53e1df302c079b3db8a0a36033ed2d15'
const app = new Clarifai.App({
  apiKey: 'fac5c841f3114888ba420b05a355df61'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: 'hello input',
      imageUrl: 'hello image'
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
    console.log(this.state.input)
    console.log(this.state.imageUrl)
  }
  

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    }, function(err){
      console.log(err)

    })
  }

  render(){
    console.log(this.state.input)
    console.log(this.state.imageUrl)

    return (
      <div className="App">
        {/* <Particles> */}
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} 
          onButtonSubmit={this.onSubmitButton}/>
          <FaceRecognition imageUrl={this.state.imageUrl}/>

      
      </div>
    );
  }
}

export default App;
