import React from 'react'
import TextField from '@material-ui/core/TextField'

import styles from './SearchField.less'

class SearchField extends React.Component {
  handleChange = event => {
    const val = event.target.value
    const anchorEl = event.currentTarget
    this.props.onChange(val, anchorEl)
  }

  onFocus = () => {
    this.props.onFocus()
  }

  onBlur = () => {
    this.props.onBlur()
  }

  onInputKeyDown = event => {
    const { onNext, onPrev, onSelect, onEscape } = this.props
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault()
        onNext()
        break
      case 38: // UP
        event.preventDefault()
        onPrev()
        break
      case 13: // ENTER
        event.preventDefault()
        onSelect()
        break
      case 9: // TAB
        onSelect()

        break
      case 27: // ESC
        this.props.onEscape()
        break
      default:
        break
    }
  }

  render() {
    const { value, width } = this.props
    return (
      <TextField
        label={'search'}
        style={{ width: `${width}px` }}
        className={styles.root}
        ref="input"
        type="text"
        autoComplete="off"
        variant="outlined"
        value={value}
        onKeyDown={this.onKeyDown}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }
}

export default SearchField
