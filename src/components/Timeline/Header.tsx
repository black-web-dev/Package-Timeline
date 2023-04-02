import React, { PureComponent } from 'react'
import { HeaderProps, StickyType } from '../../type'

import Timebar from './Timebar'

const noop = () => {}

class Header extends PureComponent<HeaderProps> {
  private scroll: React.RefObject<HTMLDivElement>
  private timebar: React.RefObject<HTMLDivElement>
  constructor(props: HeaderProps) {
    super(props)

    this.scroll = React.createRef()
    this.timebar = React.createRef()
  }

  componentDidMount() {
    const { sticky } = this.props
    if (sticky) {
      this.timebar.current && sticky.setHeaderHeight && sticky.setHeaderHeight(this.timebar.current.offsetHeight)
      const { scrollLeft, isSticky } = sticky
      if (isSticky && this.scroll.current) {
        this.scroll.current.scrollLeft = scrollLeft || 0
      }
    }
  }

  componentDidUpdate(prevProps: HeaderProps) {
    const { sticky } = this.props
    if (sticky) {
      const { scrollLeft, isSticky } = sticky
      const prevScrollLeft = prevProps.sticky.scrollLeft
      const prevIsSticky = prevProps.sticky.isSticky
      if (scrollLeft !== prevScrollLeft || isSticky !== prevIsSticky) {
        if (this.scroll.current) this.scroll.current.scrollLeft = scrollLeft || 0
      }
    }
  }

  handleScroll = () => {
    const { sticky } = this.props
    if (this.scroll.current) {
      sticky.handleHeaderScrollY && sticky.handleHeaderScrollY(this.scroll.current.scrollLeft)
    }
  }

  render() {
    const {
      time,
      onMove,
      onEnter,
      onLeave,
      width,
      timebar: rows,
      sticky: { isSticky, headerHeight, timelineViewportWidth } = {} as StickyType,
    }: HeaderProps = this.props

    return (
      <div
        style={isSticky ? { paddingTop: headerHeight } : {}}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div
          className={`rt-timeline__header ${isSticky ? 'rt-is-sticky' : ''}`}
          style={isSticky ? { width: timelineViewportWidth, height: headerHeight } : {}}
        >
          <div className='rt-timeline__header-scroll' ref={this.scroll} onScroll={isSticky ? this.handleScroll : noop}>
            <div ref={this.timebar} style={isSticky ? { width } : {}}>
              <Timebar time={time} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
