import React from 'react'
import styles from './styles.less'
import Button from '../../Button'

const BlankState = ({tableName}) => {

  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        <div className={styles.text}>
          <img src={'/images/blank.png'}/>
          <div className={styles.texter}>THERE IS NO DATA TO DISPLAY</div>
        </div>
      
      </div>
    </div>
  )
}
export default BlankState
