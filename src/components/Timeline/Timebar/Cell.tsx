import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { CellType } from '../../../type'

class Cell extends Component<CellType & WithTranslation> {
  render() {
    const { t, time, name, start, end }: CellType & WithTranslation = this.props
    return (
      <div className='rt-timebar__cell' style={time?.toStyleLeftAndWidth(start, end)}>
        {t(name)}
      </div>
    )
  }
}

export default withTranslation()(Cell)
