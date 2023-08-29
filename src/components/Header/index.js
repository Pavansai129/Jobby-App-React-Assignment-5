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
        <ul>
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>
        </ul>

        <ul className="nav-links-container">
          <li className="nav-link" key="home">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-link" key="jobs">
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
