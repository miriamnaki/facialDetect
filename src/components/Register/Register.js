import React,{Component} from 'react';

class Register  extends Component {
  constructor(props){
    super(props)
    this.state = {
      registerEmail: '',
      registerPassword: '',
      name: '',
    }
  }

  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})

  }

  onSubmitRegister = (e) => {
    e.preventDefault();
    fetch('https://immense-harbor-94525.herokuapp.com/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
    .then(res => res.json() )
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }
  render(){

    return (
      <div>
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                type="submit" 
                value="Register"
  
                />
            </div>
            
          </form>
        </main> 
        </article>
      </div>
    )
  }
}

export default Register;