// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import { loadDrivers, loadStudents } from '../../actions'
import LicencesInner from './LicencesInner'
import transformData from './Transformer/transformData'

class Licences extends React.Component {
  componentDidMount() {
    const { dispatch, user, students, drivers } = this.props
    if (user) {
      const { token } = user
      if (size(drivers) < 1) dispatch(loadDrivers({ token }))
      if (size(students) < 1) dispatch(loadStudents({ token }))
    }
  }

  render() {
    const { data } = this.props
    return <LicencesInner data={data} />
  }
}

const mapStateToProps = state => {
  const user = getOr({}, 'user')(state)
  const userDetails = getOr({}, 'userDetails')(state)
  const drivers = getOr([], 'drivers.drivers')(state)
  const students = getOr([], 'students.students')(state)
  const data = transformData(userDetails, students, drivers)
  return { drivers, students, user, userDetails, data }
}
export default connect(mapStateToProps)(Licences)
