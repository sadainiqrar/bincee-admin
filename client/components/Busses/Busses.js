// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import transformData, {
  transformDrawerData,
} from './transformers/transformData'
import { hasPropChanged, exportData } from '../../utils'
import InfoDrawer from '../InfoDrawer'
import { loadAllBus, deleteBus, loadSingleDriver } from '../../actions'
import BussesInner from './BussesInner'
import Drawer from '../Drawer'

class Busses extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadAllBus({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'busses'], this.props, nextProps)) {
      const { dispatch, user, busses, error } = nextProps
      const { token } = user
      if (size(busses) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadAllBus({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  exportData = () => {
    const { rawBuses } = this.props
    const { bus } = rawBuses
    if (size(bus) > 0) {
      exportData(bus, 'Busses')
    } else {
      exportData(
        [{ id: '', registration_no: '', description: '', driver_id: '' }],
        'Busses',
      )
    }
  }

  handleDeleteBus = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteBus({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadAllBus({ token }))
    })
  }

  handleCreateBus = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateBus = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleRowClick = data => {
    const { triggerDrawer, dispatch, user, onDrawerClose } = this.props
    const { driver_id } = data
    const { token } = user
    onDrawerClose()

    this.setState(() => ({
      isLoading: true,
    }))
    dispatch(loadSingleDriver({ id: driver_id, token })).then(({ payload }) => {
      const { status, data: payloadData } = payload
      if (status === 200) {
        const dataToShow = transformDrawerData({
          bus: data,
          driver: payloadData,
        })
        this.setState(() => ({
          isLoading: false,
        }))
        triggerDrawer({
          title: 'Bus Content',
          content: <Drawer data={dataToShow} />,
        })
      }
    })
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadAllBus({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { busses } = this.props
    const { columns: rows, rows: data } = busses

    return (
      <BussesInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDataExport={this.exportData}
        onRowClick={this.handleRowClick}
        onDeleteBus={this.handleDeleteBus}
        onCreateBus={this.handleCreateBus}
        onUpdateBus={this.handleUpdateBus}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const busses = getOr({}, 'bus')(state)
  const user = getOr({}, 'user')(state)
  const bussesList = getOr([], 'bus')(busses)
  const error = getOr('', 'message')(busses)
  const transformedBusses = transformData(bussesList)
  return { busses: transformedBusses, rawBuses: busses, user, error }
}
const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Busses))
