import React ,{Component}from 'react';

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      signinEmail: '',
      signinPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signinEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value})
  }

  onSubmitSignin = (e) => {
    e.preventDefault()
    fetch('https://immense-harbor-94525.herokuapp.com/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
    .then(res => res.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }

  render(){

    const {onRouteChange} = this.props

    return (
      <div>
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
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
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitSignin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"
                />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</p>
            </div>
          </form>
        </main> 
        </article>
      </div>
    )
  }
  }


export default SignIn