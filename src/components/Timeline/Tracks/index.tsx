import React from 'react'

import Track from './Track'
import { TimeType, TracksType } from '../../../type'

const Tracks = ({
  time,
  tracks,
  lineStyle,
}: {
  time: TimeType
  tracks: TracksType[]
  lineStyle?: {
    newRegistration?: string
    newTypes?: string
    effective?: string
    allVehicles?: string
    expiration?: string
  }
}) => (
  <div className='rt-tracks'>
    {tracks.map(({ id, element, isOpen, tracks: children }: TracksType) => (
      <Track key={id} time={time} element={element} isOpen={isOpen} tracks={children} lineStyle={lineStyle} />
    ))}
  </div>
)

export default Tracks
