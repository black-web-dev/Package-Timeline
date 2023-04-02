import React from 'react'

import Row from './Row'
import { TimebarType, TimeType } from '../../../type'

const Timebar = ({ time, rows }: { time: TimeType; rows: TimebarType[] }) => (
  <div className='rt-timebar'>
    {rows.map(({ id, name, cells, style }: TimebarType) => (
      <Row key={id} time={time} name={name} cells={cells} style={style ? style : {}} />
    ))}
  </div>
)

export default Timebar
