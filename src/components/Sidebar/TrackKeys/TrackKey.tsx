import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import TrackKeys from '.'
import { TrackKeyProps, TracksType } from '../../../type'

class TrackKey extends Component<TrackKeyProps> {
  constructor(props: TrackKeyProps) {
    super(props)
  }

  render() {
    const { t, track, toggleOpen }: TrackKeyProps = this.props
    const { name, tracks, isOpen }: TracksType = track
    const isExpandable = tracks.length > 0

    return (
      <li className='rt-track-key'>
        <div className='rt-track-key__entry'>
          {isExpandable && (
            <button
              title='Expand track'
              className={`rt-track-key__toggle ${
                isOpen ? 'rt-track-key__toggle--close' : 'rt-track-key__toggle--open'
              }`}
              onClick={() => toggleOpen(track)}
              type='button'
            >
              {isOpen ? 'Close' : 'Open'}
            </button>
          )}
          <span className='rt-track-key__title'>{`${t('version')} ${name}`}</span>
        </div>
        {isOpen && tracks && tracks.length > 0 && <TrackKeys tracks={tracks} toggleOpen={toggleOpen} />}
      </li>
    )
  }
}
export default withTranslation()(TrackKey)
