import React from 'react'
import { CellType, TimeType } from '../../../type'

import Cell from './Cell'

const Row = ({
  name,
  time,
  cells,
  style,
}: {
  name: string
  time: TimeType
  cells: CellType[]
  style: {
    [key: string]: string | number
  }
}) => (
  <div className='rt-timebar__row' style={style} title={name}>
    {cells.map((cell: CellType) => (
      <Cell key={cell.id} time={time} {...cell} />
    ))}
  </div>
)

export default Row
