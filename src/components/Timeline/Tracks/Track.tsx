import React from 'react'

import Tracks from '.'
import Element from './Element'
import { ElementType, TimeType, TracksType } from '../../../type'

const Track = ({
  time,
  element,
  isOpen,
  tracks,
  lineStyle,
}: {
  time: TimeType
  element: ElementType
  isOpen?: boolean
  tracks?: TracksType[]
  lineStyle?: {
    newRegistration?: string
    newTypes?: string
    effective?: string
    allVehicles?: string
    expiration?: string
  }
}) => (
  <div className='tr-track'>
    <div className='rt-track__elements'>
      {element && <Element key={element.id} time={time} lineStyle={lineStyle} {...element} />}
    </div>
    {isOpen && tracks && tracks.length > 0 && <Tracks time={time} tracks={tracks} lineStyle={lineStyle} />}
  </div>
)

export default Track
