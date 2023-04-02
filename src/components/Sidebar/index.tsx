import React from 'react'

import Header from './Header'
import Body from './Body'
import { SidebarProps } from '../../type'

const Sidebar = ({ timebar, tracks, toggleTrackOpen, sticky }: SidebarProps) => (
  <div className='rt-sidebar'>
    <Header timebar={timebar} sticky={sticky} />
    <Body tracks={tracks} toggleTrackOpen={toggleTrackOpen} />
  </div>
)

export default Sidebar
