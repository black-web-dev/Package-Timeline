import React from 'react'
import { CellType, TimeType } from '../../../type'

const Grid = ({ time, grid }: { time: TimeType; grid: CellType[] }) => (
  <div className='rt-grid'>
    {grid.map(({ id, start, end }: CellType) => (
      <div key={id} className='rt-grid__cell' style={time.toStyleLeftAndWidth(start, end)} />
    ))}
  </div>
)

export default Grid
