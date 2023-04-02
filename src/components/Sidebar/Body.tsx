import React from 'react'

import TrackKeys from './TrackKeys'
import { TracksType } from '../../type'

const Body = ({ tracks, toggleTrackOpen }: { tracks: TracksType[]; toggleTrackOpen: (track: TracksType) => void }) => (
  <div className='rt-sidebar__body'>
    <TrackKeys tracks={tracks} toggleOpen={toggleTrackOpen} />
  </div>
)

export default Body
