import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: 'error'}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div>
          <form onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
            <button type="submit">Login</button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </form>
        </div>
      </>
    )
  }
}

export default Login
