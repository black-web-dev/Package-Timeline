import React from 'react'
import { StickyType, TimebarType } from '../../type'

const Header = ({
  timebar,
  sticky: { isSticky, sidebarWidth, headerHeight } = {} as StickyType,
}: {
  timebar: TimebarType[]
  sticky: StickyType
}) => (
  <div style={isSticky ? { paddingTop: headerHeight } : {}}>
    <div
      className={`rt-sidebar__header ${isSticky ? 'rt-is-sticky' : ''}`}
      style={isSticky ? (sidebarWidth > 0 ? { width: sidebarWidth } : { display: 'none' }) : {}}
    >
      {timebar.map(({ id, name, style }: TimebarType) => (
        <div key={id} className='rt-timebar-key' style={style}>
          {name}
        </div>
      ))}
    </div>
  </div>
)

export default Header
