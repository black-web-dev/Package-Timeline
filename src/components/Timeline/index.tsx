import React, { Component } from 'react'

import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'
import getMouseX from '../../utils/getMouseX'
import getGrid from '../../utils/getGrid'
import { TimelineProps, TimelineState } from '../../type'

class Timeline extends Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props)

    this.state = {
      pointerDate: null,
      pointerVisible: false,
      pointerHighlighted: false,
    }
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { time }: TimelineProps = this.props
    this.setState({ pointerDate: time.fromX(getMouseX(e)) })
  }

  handleMouseLeave = () => {
    this.setState({ pointerHighlighted: false })
  }

  handleMouseEnter = () => {
    this.setState({ pointerVisible: true, pointerHighlighted: true })
  }

  render() {
    const { now, time, timebar, tracks, sticky, lineStyle }: TimelineProps = this.props

    const { pointerDate, pointerVisible, pointerHighlighted }: TimelineState = this.state

    const grid = getGrid(timebar)

    return (
      <div className='rt-timeline' style={{ width: time.timelineWidthStyle }}>
        {now && <NowMarker now={now} visible time={time} />}
        {pointerDate && (
          <PointerMarker date={pointerDate} time={time} visible={pointerVisible} highlighted={pointerHighlighted} />
        )}
        <Header
          time={time}
          timebar={timebar}
          onMove={this.handleMouseMove}
          onEnter={this.handleMouseEnter}
          onLeave={this.handleMouseLeave}
          width={time.timelineWidthStyle}
          sticky={sticky}
        />
        <Body time={time} grid={grid} tracks={tracks} lineStyle={lineStyle} />
      </div>
    )
  }
}

export default Timeline
