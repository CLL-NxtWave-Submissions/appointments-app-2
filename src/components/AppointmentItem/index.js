import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {itemData, itemStarredHandler} = props
  const {id, title, date, isStarred} = itemData

  const formattedDateString = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onStarToggleButtonClick = () => {
    itemStarredHandler(id)
  }

  return (
    <div className="appointment-item-container">
      <div className="appointment-title-star-container">
        <h1 className="appointment-title">{title}</h1>
        <button
          type="button"
          className="appointment-star-toggle-button"
          onClick={onStarToggleButtonClick}
        >
          <img
            className="appointment-star-icon-img"
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>

      <p className="appointment-formatted-date">{formattedDateString}</p>
    </div>
  )
}

export default AppointmentItem
