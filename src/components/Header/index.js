import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="nav-links-container">
          <li className="nav-link">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
