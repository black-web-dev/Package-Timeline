import React, { PureComponent } from 'react'

import Sidebar from '../Sidebar'
import Timeline from '../Timeline/index'
import { addListener, removeListener } from '../../utils/events'
import raf from '../../utils/raf'
import getNumericPropertyValue from '../../utils/getNumericPropertyValue'
import { LayoutProps, LayoutState } from '../../type'
import { mobileWidth } from '../../index'

const noop = () => {}

class Layout extends PureComponent<LayoutProps, LayoutState> {
  private timeline: React.RefObject<HTMLElement>
  private layout: React.RefObject<HTMLElement>
  private sidebar: React.RefObject<HTMLElement>
  constructor(props: LayoutProps) {
    super(props)

    this.timeline = React.createRef()
    this.layout = React.createRef()
    this.sidebar = React.createRef()

    this.state = {
      isSticky: false,
      headerHeight: 0,
      scrollLeft: 0,
    }
  }

  componentDidMount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      addListener('scroll', this.handleScrollY)
      this.updateTimelineHeaderScroll()
      this.updateTimelineBodyScroll()
    }

    addListener('resize', this.handleResize)
    this.handleLayoutChange(() => this.scrollToNow())
  }

  componentDidUpdate(_prevProps: LayoutProps, _prevState: LayoutState) {
    const { enableSticky } = this.props
    const { isSticky, scrollLeft }: LayoutState = this.state

    if (enableSticky && isSticky) {
      if (!_prevState.isSticky) {
        this.updateTimelineHeaderScroll()
      }

      if (scrollLeft !== _prevState.scrollLeft) {
        this.updateTimelineBodyScroll()
      }
    }

    this.handleLayoutChange()
  }

  componentWillUnmount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      removeListener('scroll', this.handleScrollY)
      removeListener('resize', this.handleResize)
    }
  }

  setHeaderHeight = (headerHeight: number) => {
    this.setState({ headerHeight })
  }

  scrollToNow = () => {
    const { time, scrollToNow, now, timelineViewportWidth }: LayoutProps = this.props
    if (scrollToNow && this.timeline.current && this.timeline.current.scrollLeft) {
      this.timeline.current.scrollLeft = time.toX(now) - 0.5 * timelineViewportWidth
    }
  }

  updateTimelineBodyScroll = () => {
    const { scrollLeft } = this.state
    if (this.timeline.current && this.timeline.current.scrollLeft) {
      this.timeline.current.scrollLeft = scrollLeft
    }
  }

  updateTimelineHeaderScroll = () => {
    const { scrollLeft } = this.timeline.current as HTMLDivElement
    this.setState({ scrollLeft })
  }

  handleHeaderScrollY = (scrollLeft: number) => {
    raf(() => {
      this.setState({ scrollLeft })
    })
  }

  handleScrollY = () => {
    raf(() => {
      const { headerHeight }: LayoutState = this.state
      const markerHeight = 0
      if (this.timeline.current) {
        const { top, bottom } = this.timeline.current.getBoundingClientRect()
        const isSticky = top <= -markerHeight && bottom >= headerHeight
        this.setState(() => ({ isSticky }))
      }
    })
  }

  handleScrollX = () => {
    raf(this.updateTimelineHeaderScroll)
  }

  calculateSidebarWidth = () => {
    if (this.sidebar.current && this.layout.current) {
      return this.sidebar.current.offsetWidth + getNumericPropertyValue(this.layout.current, 'margin-left')
    }
    return 0
  }

  calculateTimelineViewportWidth = () => this.timeline.current?.offsetWidth

  handleLayoutChange = (cb?: () => void | undefined) => {
    const { sidebarWidth, timelineViewportWidth, onLayoutChange } = this.props

    const nextSidebarWidth = this.calculateSidebarWidth() || 0
    const nextTimelineViewportWidth = this.calculateTimelineViewportWidth() || 0
    if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
      onLayoutChange(
        {
          sidebarWidth: nextSidebarWidth,
          timelineViewportWidth: nextTimelineViewportWidth,
        },
        cb,
      )
    }
  }

  handleResize = () => this.handleLayoutChange()

  render() {
    const { isOpen, tracks, now, time, timebar, toggleTrackOpen, sidebarWidth, timelineViewportWidth, lineStyle } =
      this.props

    const { isSticky, headerHeight, scrollLeft }: LayoutState = this.state

    return (
      <div
        className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`}
        ref={this.layout as React.RefObject<HTMLDivElement>}
        style={timelineViewportWidth + sidebarWidth > mobileWidth ? { marginLeft: 0 } : {}}
      >
        <div className='rt-layout__side' ref={this.sidebar as React.RefObject<HTMLDivElement>}>
          <Sidebar
            timebar={timebar}
            tracks={tracks}
            toggleTrackOpen={toggleTrackOpen}
            sticky={{ isSticky, headerHeight, sidebarWidth, timelineViewportWidth }}
          />
        </div>
        <div className='rt-layout__main'>
          <div
            className='rt-layout__timeline'
            ref={this.timeline as React.RefObject<HTMLDivElement>}
            onScroll={isSticky ? this.handleScrollX : noop}
          >
            <Timeline
              now={now}
              time={time}
              timebar={timebar}
              tracks={tracks}
              sticky={{
                isSticky,
                setHeaderHeight: this.setHeaderHeight,
                timelineViewportWidth,
                sidebarWidth,
                handleHeaderScrollY: this.handleHeaderScrollY,
                headerHeight,
                scrollLeft,
              }}
              lineStyle={lineStyle}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
