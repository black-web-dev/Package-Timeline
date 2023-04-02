import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Marker from '.'
import { NowMarkerProps } from '../../../type'
import { getDayMonth } from '../../../utils/formatDate'

class NowMarker extends Component<NowMarkerProps> {
  render() {
    const { t, i18n, now, time, visible }: NowMarkerProps = this.props
    return (
      <Marker modifier='now' x={time.toX(now)} visible={visible}>
        <div>
          <div>{t('today')}</div>
          <strong>{getDayMonth(now, i18n.language)}</strong>
        </div>
      </Marker>
    )
  }
}

export default withTranslation()(NowMarker)
