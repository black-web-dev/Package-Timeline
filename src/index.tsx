import React, { Component } from 'react'
import { ElementType, TimebarType, TimelineComponentProps, TimelineComponentState, TracksType } from './type'

import { withTranslation } from 'react-i18next'
import Controls from './components/Controls'
import Layout from './components/Layout'
import createTime from './utils/time'
import getEndDate from './utils/getEndDate'
import buildTimebar from './utils/getTimebar'
import './i18n/config'

const UNKNOWN_WIDTH = -1
const timelineViewportWidth = UNKNOWN_WIDTH
const sidebarWidth = UNKNOWN_WIDTH

export const mobileWidth = 900

class TimelineComponent extends Component<TimelineComponentProps, TimelineComponentState> {
  constructor(props: TimelineComponentProps) {
    super(props)

    const {
      timebar,
      start,
      end,
      dateTimebarEnd,
    }: { timebar: TimebarType[]; start: Date; end: Date; dateTimebarEnd: Date } = buildTimebar(
      props.tracks,
      props.i18n.language,
    )

    const tracks = props.tracks.map((subTracks) => {
      const modified_subTracks: TracksType[] = subTracks.map((_subTrack, index) => {
        const sub_element: ElementType = {
          ..._subTrack,
          dateNewRegistrationEnd: getEndDate(subTracks, index + 1, 'dateNewRegistration', dateTimebarEnd) as Date,
          dateNewTypesEnd: getEndDate(subTracks, index + 1, 'dateNewTypes', dateTimebarEnd) as Date,
          dateEffectiveEnd: getEndDate(subTracks, index + 1, 'dateEffective', dateTimebarEnd) as Date,
          dateAllVehiclesEnd: getEndDate(subTracks, index + 1, 'dateAllVehicles', dateTimebarEnd) as Date,
          dateExpirationEnd: getEndDate(subTracks, index + 1, 'dateExpiration', dateTimebarEnd) as Date,
        }

        return {
          id: _subTrack.id,
          name: _subTrack.name,
          element: sub_element,
          tracks: [],
          isOpen: false,
        }
      })

      const isOpen = modified_subTracks.length > 0
      const subTrack = modified_subTracks[0]
      const element: ElementType = {
        ...subTrack.element,
      }

      return {
        id: subTrack.id,
        name: subTrack.name,
        element: element,
        tracks: modified_subTracks.slice(1),
        isOpen,
      }
    })

    const tracksById = tracks.reduce((acc, _tracks) => {
      const { id } = _tracks
      acc[id] = _tracks
      return acc
    }, {} as Record<string, TracksType>)

    this.state = {
      isOpen: false,
      time: createTime({ ...props.scale, start, end, viewportWidth: timelineViewportWidth, minWidth: 0 }),
      timelineViewportWidth,
      sidebarWidth,
      timebar,
      tracksById,
      tracks,
      start,
      end,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: TimelineComponentProps) {
    const { i18n, locale, scale, tracks } = this.props
    const { timelineViewportWidth, start, end } = this.state

    if (nextProps.scale !== scale) {
      const time = createTime({
        ...nextProps.scale,
        start,
        end,
        viewportWidth: timelineViewportWidth,
        minWidth: 0,
      })
      this.setState({ time })
    }
    if (nextProps.locale !== locale) {
      i18n.changeLanguage(nextProps.locale)
      const { timebar }: { timebar: TimebarType[] } = buildTimebar(tracks, i18n.language)
      this.setState({ timebar })
    }
  }

  handleLayoutChange = (
    { timelineViewportWidth, sidebarWidth }: { timelineViewportWidth: number; sidebarWidth: number },
    cb?: () => void,
  ) => {
    const { scale } = this.props
    const { start, end } = this.state
    const time = createTime({
      ...scale,
      start,
      end,
      viewportWidth: timelineViewportWidth,
      minWidth: 0,
    })
    this.setState(
      {
        time,
        timelineViewportWidth,
        sidebarWidth,
      },
      cb,
    )
  }

  handleToggleOpen = () => {
    this.setState(({ isOpen }: { isOpen: boolean }) => ({ isOpen: !isOpen }))
  }

  handleToggleTrackOpen = (track: TracksType) => {
    this.setState((state: TimelineComponentState) => {
      const tracksById = {
        ...state.tracksById,
        [track.id]: {
          ...track,
          isOpen: !track.isOpen,
        },
      }

      return {
        tracksById,
        tracks: Object.values(tracksById),
      }
    })
  }

  render() {
    const {
      zoomIn,
      zoomOut,
      scale: { zoom, zoomMin, zoomMax },
      now,
      enableSticky = false,
      scrollToNow,
      lineStyle,
    }: TimelineComponentProps = this.props

    const {
      isOpen = true,
      time,
      timelineViewportWidth,
      sidebarWidth,
      timebar,
      tracks,
    }: TimelineComponentState = this.state

    return (
      <div className='rt'>
        <Controls
          isOpen={isOpen}
          toggleOpen={this.handleToggleOpen}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoom={zoom}
          zoomMin={zoomMin}
          zoomMax={zoomMax}
          lineStyle={lineStyle}
          timelineViewportWidth={timelineViewportWidth}
          sidebarWidth={sidebarWidth}
        />
        <Layout
          enableSticky={enableSticky}
          now={now}
          tracks={tracks}
          timebar={timebar}
          toggleTrackOpen={this.handleToggleTrackOpen}
          scrollToNow={scrollToNow}
          time={time}
          isOpen={isOpen}
          onLayoutChange={this.handleLayoutChange}
          timelineViewportWidth={timelineViewportWidth}
          sidebarWidth={sidebarWidth}
          lineStyle={lineStyle}
        />
      </div>
    )
  }
}

export default withTranslation()(TimelineComponent)
