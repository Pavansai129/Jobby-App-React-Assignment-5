import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData
      const updatedJobDetails = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        title: jobDetails.title,
        rating: jobDetails.rating,
        employmentType: jobDetails.employment_type,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
      }

      const updatedSimilarJobs = similarJobs.map(each => ({
        id: each.id,
        title: each.title,
        location: each.location,
        rating: each.rating,
        jobDescription: each.job_description,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      lifeAtCompany,
      skills,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <Header />
        <div className="horizontal">
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <h1>{title}</h1>
            <li className="horizontal">
              <AiFillStar />
              <p>{rating}</p>
            </li>
          </div>
        </div>
        <div className="horizontal-space">
          <li className="horizontal">
            <TiLocation />
            <p>{location}</p>
          </li>
          <div className="horizontal">
            <BsFillBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
          <BiLinkExternal />
          <p>{jobDescription}</p>
        </div>
        <h1>Skills</h1>
        <ul>
          {skills.map(each => (
            <li key={each.name}>
              <img src={each.imageUrl} alt={each.name} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <h1>Life at company</h1>
        <div>
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(each => (
            <li key={each.id}>
              <div className="horizontal">
                <img src={each.companyLogoUrl} alt="similar job company logo" />
                <div>
                  <h1>{each.title}</h1>
                  <div className="horizontal">
                    <AiFillStar />
                    <p>{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1>Description</h1>
              <div>
                <p>{each.jobDescription}</p>
              </div>
              <div className="horizontal-space">
                <div className="horizontal">
                  <TiLocation />
                  <p>{each.location}</p>
                </div>
                <div className="horizontal">
                  <BsFillBriefcaseFill />
                  <p>{each.employmentType}</p>
                </div>
                <p>{each.packagePerAnnum}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div type="button" data-testid="loader">
      <Loader type="ThreeDots" color="red" width="50" height="50" />
    </div>
  )

  render() {
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
}

export default JobItemDetails
