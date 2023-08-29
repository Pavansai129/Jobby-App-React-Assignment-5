import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Profile from '../Profile'
import JobSearchResult from '../JobSearchResult'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    listOfEmploymentTypes: [],
    salaryRange: '',
    jobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  onClickRetry = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, listOfEmploymentTypes, salaryRange} = this.state
    const accessToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${listOfEmploymentTypes}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedJobs = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        location: each.location,
        title: each.title,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
      }))
      this.setState({jobs: updatedJobs, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeEmploymentType = event => {
    const {listOfEmploymentTypes} = this.state
    if (listOfEmploymentTypes.includes(event.target.value) === true) {
      const updatedListOfEmploymentTypes = listOfEmploymentTypes.filter(
        each => each !== event.target.value,
      )
      this.setState(
        {listOfEmploymentTypes: updatedListOfEmploymentTypes},
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          listOfEmploymentTypes: [
            ...prevState.listOfEmploymentTypes,
            event.target.value,
          ],
        }),
        this.getJobs,
      )
    }
  }

  renderTypeOfEmployment = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li className="type-of-employment" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={this.onChangeEmploymentType}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobs)
  }

  renderSalaryRange = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li className="salary-range-item" key={each.salaryRangeId}>
            <input
              type="radio"
              name="salaryRange"
              value={each.salaryRangeId}
              id={each.salaryRangeId}
              onChange={this.onChangeSalaryRange}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          type="search"
          value={searchInput}
          placeholder="search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobs} = this.state
    return (
      <>
        <div className="jobs-app-container">
          <div className="searchInput-container">
            {jobs.length > 0 ? (
              <ul>
                {jobs.map(each => (
                  <JobSearchResult key={each.id} jobDetails={each} />
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters</p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderThis = () => {
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
    const accessToken = Cookies.get('jwt_token')
    if (accessToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="horizontal">
          <div className="profile-filters-container">
            <Profile />
            <hr className="horizontal-line" />
            {this.renderTypeOfEmployment()}
            <hr className="horizontal-line" />
            {this.renderSalaryRange()}
          </div>
          <div>
            {this.renderSearchInput()}
            {this.renderThis()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
