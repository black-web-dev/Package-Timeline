import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { mobileWidth } from '../../index'
import { ControlProps } from '../../type'

import Toggle from './Toggle'
import ZoomIn from './ZoomIn'
import ZoomOut from './ZoomOut'

class Controls extends Component<ControlProps> {
  constructor(props: ControlProps) {
    super(props)
  }
  render() {
    const {
      t,
      isOpen = true,
      toggleOpen,
      zoomIn,
      zoomOut,
      zoom,
      zoomMin,
      zoomMax,
      lineStyle,
      timelineViewportWidth,
      sidebarWidth,
    }: ControlProps = this.props

    return (
      <div
        className='rt-controls'
        style={
          timelineViewportWidth + sidebarWidth < mobileWidth - 80
            ? { flexDirection: 'column', alignItems: 'flex-end' }
            : {}
        }
      >
        {timelineViewportWidth + sidebarWidth > mobileWidth && (
          <div className='rt-controls__label'>{t('timeline')}</div>
        )}
        <div
          className='rt-controls__options'
          style={timelineViewportWidth + sidebarWidth <= mobileWidth ? { width: '100%' } : {}}
        >
          <div className='rt-controls__option'>
            {t('registration')}
            <span
              className='option_registration'
              style={lineStyle?.newRegistration ? { backgroundColor: lineStyle.newRegistration } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('types')}
            <span
              className='option_types'
              style={lineStyle?.newTypes ? { backgroundColor: lineStyle.newTypes } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('effective')}
            <span
              className='option_effective'
              style={lineStyle?.effective ? { backgroundColor: lineStyle.effective } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('vehicles')}
            <span
              className='option_all_vehicles'
              style={lineStyle?.allVehicles ? { backgroundColor: lineStyle.allVehicles } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('expiration')}
            <span
              className='option_expiration'
              style={lineStyle?.expiration ? { backgroundColor: lineStyle.expiration } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('phaseIn')}
            <span
              className='option_phase_in'
              style={lineStyle?.phaseIn ? { backgroundColor: lineStyle.phaseIn } : {}}
            ></span>
          </div>
          <div className='rt-controls__option'>
            {t('phaseOut')}
            <span
              className='option_phase_out'
              style={lineStyle?.phaseOut ? { backgroundColor: lineStyle.phaseOut } : {}}
            ></span>
          </div>
        </div>
        <div className='rt-controls__content'>
          {timelineViewportWidth + sidebarWidth <= mobileWidth && toggleOpen && (
            <Toggle isOpen={isOpen} toggleOpen={toggleOpen} />
          )}
          {zoomIn && <ZoomIn zoomIn={zoomIn} zoomMax={zoomMax} zoom={zoom} />}
          {zoomOut && <ZoomOut zoomOut={zoomOut} zoomMin={zoomMin} zoom={zoom} />}
        </div>
      </div>
    )
  }
}

export default withTranslation()(Controls)
