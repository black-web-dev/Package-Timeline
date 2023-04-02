import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { NUM_OF_TRACKS } from './mockup/constants'
import { buildTrack, buildLineStyle } from './mockup/builders'
import { fill } from './mockup/utils'
import TimelineComponent from 'react-document-timeline'
import { LineStyle, TrackType } from 'react-document-timeline/lib/type'
import 'react-document-timeline/lib/style.css'

type AppProps = WithTranslation

type AppState = {
  lng: string
  zoom: number
  tracksById: Record<number, TrackType[]>
  tracks: TrackType[][]
  lineStyle?: LineStyle
  widthType: string
}

const now = new Date()
const MIN_ZOOM = 2
const MAX_ZOOM = 20

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    const lineStyle = buildLineStyle()

    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
      const track = buildTrack(i + 1)
      acc[track[0].id] = track
      return acc
    }, {} as Record<string, TrackType[]>)

    this.state = {
      lng: 'en',
      zoom: 4,
      tracksById,
      tracks: Object.values(tracksById),
      lineStyle: lineStyle,
      widthType: '100%',
    }
  }

  handleZoomIn = () => {
    this.setState(({ zoom }: { zoom: number }) => ({ zoom: Math.min(zoom + 1, MAX_ZOOM) }))
  }

  handleZoomOut = () => {
    this.setState(({ zoom }: { zoom: number }) => ({ zoom: Math.max(zoom - 1, MIN_ZOOM) }))
  }

  handleChangeLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(() => ({ lng: e.target.value }))
  }

  handleWidthOptions = (type: string) => () => {
    this.setState({ widthType: type })
  }

  render() {
    const { t }: AppProps = this.props
    const { lng, zoom, tracks, lineStyle, widthType }: AppState = this.state

    return (
      <div className='app'>
        <h1 className='title'>{t('title', { lng })}</h1>
        <div className='options'>
          <select onChange={this.handleChangeLng}>
            <option>en</option>
            <option>de</option>
          </select>
          {['100%', '75%', '50%', '25%'].map((i) => (
            <div key={i} className='full-option' onClick={this.handleWidthOptions(i)}>
              {i}
            </div>
          ))}
        </div>
        <div style={{ width: widthType, margin: 'auto' }}>
          <TimelineComponent
            locale={lng}
            scale={{
              zoom,
              zoomMin: MIN_ZOOM,
              zoomMax: MAX_ZOOM,
            }}
            zoomIn={this.handleZoomIn}
            zoomOut={this.handleZoomOut}
            tracks={tracks}
            now={now}
            enableSticky
            scrollToNow
            lineStyle={lineStyle}
          />
        </div>
        <div className='template'>
          <div>
            {lineStyle &&
              Object.keys(lineStyle).map((key: string) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 100,
                      textAlign: 'center',
                      padding: 5,
                      backgroundColor: lineStyle[key as keyof LineStyle],
                    }}
                  >
                    {lineStyle[key as keyof LineStyle]}
                  </div>
                  <div>{key}</div>
                </div>
              ))}
          </div>
          <pre>{JSON.stringify(tracks, undefined, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default withTranslation()(App)
