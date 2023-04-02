import React from 'react'

import Tracks from './Tracks'
import Grid from './Grid'
import { CellType, TimeType, TracksType } from '../../type'

const Body = ({
  time,
  grid,
  tracks,
  lineStyle,
}: {
  time: TimeType
  grid: CellType[] | undefined
  tracks: TracksType[]
  lineStyle?: {
    newRegistration?: string
    newTypes?: string
    effective?: string
    allVehicles?: string
    expiration?: string
  }
}) => (
  <div className='rt-timeline__body'>
    {grid && <Grid time={time} grid={grid} />}
    <Tracks time={time} tracks={tracks} lineStyle={lineStyle} />
  </div>
)

export default Body
