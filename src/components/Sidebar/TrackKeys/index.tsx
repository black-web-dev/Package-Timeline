import React from 'react'

import TrackKey from './TrackKey'
import { TracksType } from '../../../type'

const TrackKeys = ({ tracks, toggleOpen }: { tracks: TracksType[]; toggleOpen: (track: TracksType) => void }) => (
  <ul className='rt-track-keys'>
    {tracks.map((track: TracksType) => (
      <TrackKey key={track.id} track={track} toggleOpen={toggleOpen} />
    ))}
  </ul>
)

export default TrackKeys
