import React from 'react'
import { MarkerProps } from '../../../type'

const Marker = ({ x, modifier, children, visible, highlighted }: MarkerProps) => (
  <div
    className={`rt-marker rt-marker--${modifier} ${visible ? 'rt-is-visible' : ''} ${
      highlighted ? 'rt-is-highlighted' : ''
    }`}
    style={{ left: `${x}px` }}
  >
    <div className='rt-marker__label'>
      <div className='rt-marker__content'>{children}</div>
    </div>
  </div>
)

export default Marker
