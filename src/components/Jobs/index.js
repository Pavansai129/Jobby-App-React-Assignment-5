import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
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

class Jobs extends Component {
  state = {searchInput: ''}

  renderTypeOfEmployment = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li className="type-of-employment">
            <input type="checkbox" id={each.employmentTypeId} />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li className="salary-range-item">
            <input
              type="radio"
              name="salaryRange"
              value={each.salaryRangeId}
              id={each.salaryRangeId}
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

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button type="button" data-testid="searchButton">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-app-container">
          <div className="profile-filters-container">
            <Profile />
            <hr className="horizontal-line" />
            {this.renderTypeOfEmployment()}
            <hr className="horizontal-line" />
            {this.renderSalaryRange()}
          </div>
          <div className="searchInput-container">
            {this.renderSearchInput()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
