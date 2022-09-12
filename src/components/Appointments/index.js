import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import AppointmentItem from '../AppointmentItem'

export default class Appointments extends Component {
  state = {
    appointmentData: {
      appointmentTitle: '',
      appointmentDate: '',
      appointmentsList: [],
    },

    isStarredAppointmentsFilterOn: false,
  }

  onTitleChange = titleChangeEvent => {
    const updatedTitle = titleChangeEvent.target.value

    this.setState(previousAppointmentsState => {
      const {appointmentData} = previousAppointmentsState

      const updatedAppointmentData = {
        ...appointmentData,
        appointmentTitle: updatedTitle,
      }

      return {
        appointmentData: updatedAppointmentData,
      }
    })
  }

  onDateChange = dateChangeEvent => {
    const selectedDate = dateChangeEvent.target.value

    this.setState(previousAppointmentsState => {
      const {appointmentData} = previousAppointmentsState

      const updatedAppointmentData = {
        ...appointmentData,
        appointmentDate: selectedDate,
      }

      return {
        appointmentData: updatedAppointmentData,
      }
    })
  }

  onAddNewAppointment = addNewAppointmentEvent => {
    addNewAppointmentEvent.preventDefault()

    this.setState(previousAppointmentsState => {
      const {appointmentData} = previousAppointmentsState

      const {
        appointmentTitle,
        appointmentDate,
        appointmentsList,
      } = appointmentData

      const newAppointmentData = {
        id: uuidv4(),
        title: appointmentTitle,
        date: appointmentDate,
        isStarred: false,
      }

      const updatedAppointmentsList = [...appointmentsList, newAppointmentData]

      const updatedAppointmentData = {
        appointmentTitle: '',
        appointmentDate: '',
        appointmentsList: updatedAppointmentsList,
      }

      return {
        appointmentData: updatedAppointmentData,
      }
    })
  }

  onStarredAppointmentsFilterClick = () => {
    this.setState(previousAppointmentsState => {
      const {isStarredAppointmentsFilterOn} = previousAppointmentsState

      return {
        isStarredAppointmentsFilterOn: !isStarredAppointmentsFilterOn,
      }
    })
  }

  onStarTogglingAppointment = starToggledAppointmentId => {
    this.setState(previousAppointmentsState => {
      const {appointmentData} = previousAppointmentsState
      const {appointmentsList} = appointmentData

      const starToggledAppointmentData = appointmentsList.find(
        appointmentsListItem =>
          appointmentsListItem.id === starToggledAppointmentId,
      )
      const updatedStarToggledAppointmentData = {
        ...starToggledAppointmentData,
        isStarred: !starToggledAppointmentData.isStarred,
      }

      const updatedAppointmentsList = [
        ...appointmentsList,
        updatedStarToggledAppointmentData,
      ]
      const updatedAppointmentData = {
        ...appointmentData,
        appointmentsList: updatedAppointmentsList,
      }

      return {
        appointmentData: updatedAppointmentData,
      }
    })
  }

  render() {
    const {appointmentData, isStarredAppointmentsFilterOn} = this.state
    const {
      appointmentTitle,
      appointmentDate,
      appointmentsList,
    } = appointmentData

    return (
      <div className="appointments-bg-container">
        <div className="appointments-content-container">
          <div className="form-content-container">
            <h1 className="form-content-header">Add Appointment</h1>

            <div className="form-input-and-top-img-container">
              <form
                className="form-input-container"
                onSubmit={this.onAddNewAppointment}
              >
                <label className="form-input-label" htmlFor="titleInput">
                  TITLE
                </label>
                <input
                  id="titleInput"
                  className="form-input"
                  type="text"
                  placeholder="Title"
                  value={appointmentTitle}
                  onChange={this.onTitleChange}
                />

                <label className="form-input-label" htmlFor="dateInput">
                  DATE
                </label>
                <input
                  id="dateInput"
                  className="form-input"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={appointmentDate}
                  onChange={this.onDateChange}
                />

                <button type="submit" className="form-submit-button">
                  Add
                </button>
              </form>

              <img
                className="form-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>

          <hr className="horizontal-line-separator" />

          <div className="appointments-data-display-container">
            <div className="appointments-data-display-header-container">
              <h1 className="appointments-data-display-header-title">
                Appointments
              </h1>
              <button
                type="button"
                className={
                  isStarredAppointmentsFilterOn
                    ? 'starred-appointments-filter-on-button'
                    : 'starred-appointments-filter-off-button'
                }
                onClick={this.onStarredAppointmentsFilterClick}
              >
                Starred
              </button>
            </div>

            <ul className="appointments-data-container">
              {appointmentsList.map(appointmentsListItem => (
                <AppointmentItem
                  key={appointmentsListItem.id}
                  itemData={appointmentsListItem}
                  itemStarredHandler={this.onStarTogglingAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
