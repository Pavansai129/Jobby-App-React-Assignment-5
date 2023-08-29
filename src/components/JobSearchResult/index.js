import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobSearchResult = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
  } = jobDetails
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`}>
        <div className="horizontal">
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div className="horizontal">
              <AiFillStar />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="horizontal-space">
          <div className="horizontal">
            <TiLocation />
            <p>{location}</p>
          </div>
          <div className="horizontal">
            <BsFillBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobSearchResult
