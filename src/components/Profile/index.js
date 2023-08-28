import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedProfileDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProfile()
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" width="50" height="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile">
        <img src={profileImageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>{this.renderProfile()}</div>
      </>
    )
  }
}

export default Profile
