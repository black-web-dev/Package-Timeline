import React, { Component } from 'react'
import { getDayMonth } from '../../../utils/formatDate'
import Marker from '.'
import { PointerMarkerProps } from '../../../type'
import { withTranslation } from 'react-i18next'

class PointerMarker extends Component<PointerMarkerProps> {
  render() {
    const { i18n, time, date, visible, highlighted } = this.props
    return (
      <Marker modifier='pointer' x={time.toX(date)} visible={visible} highlighted={highlighted}>
        <div>
          <div>
            <strong>{getDayMonth(date, i18n.language)}</strong>
          </div>
        </div>
      </Marker>
    )
  }
}

export default withTranslation()(PointerMarker)
