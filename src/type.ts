import { WithTranslation } from 'react-i18next'

export type TrackType = {
  id: string
  name: string
  dateNewRegistration: Date
  dateNewTypes: Date
  dateEffective?: Date
  dateAllVehicles?: Date
  dateExpiration?: Date
  phaseIn: Date[]
  phaseOut: Date[]
  style?: {
    backgroundColor?: string
    color?: string
    boxShadow?: string
    textTransform?: string
  }
}

export type TracksType = {
  id: string
  name: string
  element: ElementType
  tracks: TracksType[]
  isOpen: boolean
}

export type ElementType = {
  id: string
  name: string
  dateNewRegistration: Date
  dateNewTypes: Date
  dateEffective?: Date
  dateAllVehicles?: Date
  dateExpiration?: Date
  dateNewRegistrationEnd: Date
  dateNewTypesEnd: Date
  dateEffectiveEnd: Date
  dateAllVehiclesEnd: Date
  dateExpirationEnd: Date
  phaseIn: Date[]
  phaseOut: Date[]
}

export type CellType = {
  id: string
  time?: TimeType
  name: string
  start: Date
  end: Date
}

export type TimebarType = {
  id: string
  name: string
  cells: CellType[]
  style?: {
    [key: string]: string | number
  }
  useAsGrid?: boolean | undefined
}

export type TimelineComponentProps = {
  locale?: string
  scale: scaleType
  zoomIn: () => void
  zoomOut: () => void
  tracks: TrackType[][]
  now: Date
  enableSticky: boolean
  scrollToNow: boolean
  lineStyle?: LineStyle
} & WithTranslation

export type TimelineComponentState = {
  start: Date
  end: Date
  isOpen: boolean
  time: TimeType
  timelineViewportWidth: number
  sidebarWidth: number
  timebar: TimebarType[]
  tracksById: Record<number, TracksType>
  tracks: TracksType[]
}

export type CreateTimeType = {
  start: Date
  end: Date
  zoom: number
  viewportWidth: number
  minWidth: number
}

export type TimeType = {
  timelineWidth: number
  timelineWidthStyle: string
  start: Date
  end: Date
  zoom: number
  toX: (from: Date) => number
  toStyleLeftAndWidth: (from: Date, to?: Date) => { left: string; width?: string }
  fromX: (x: number) => Date
}

export type scaleType = {
  zoom: number
  zoomMin: number
  zoomMax: number
}

export type ElementProps = {
  time: {
    toStyleLeftAndWidth: (
      start: Date,
      end?: Date,
    ) => {
      left: string
      width?: string
    }
  }
  dataSet?: {
    [key: string]: string
  }
  name: string
  dateNewRegistration: Date
  dateNewTypes: Date
  dateEffective?: Date
  dateAllVehicles?: Date
  dateExpiration?: Date
  dateNewRegistrationEnd: Date
  dateNewTypesEnd: Date
  dateEffectiveEnd: Date
  dateAllVehiclesEnd: Date
  dateExpirationEnd: Date
  phaseIn: Date[]
  phaseOut: Date[]
  lineStyle?: LineStyle
}

export type ControlProps = {
  isOpen: boolean
  toggleOpen: () => void
  zoomIn: () => void
  zoomOut: () => void
  zoom: number
  zoomMin: number
  zoomMax: number
  lineStyle?: LineStyle
  timelineViewportWidth: number
  sidebarWidth: number
} & WithTranslation

export type StickyType = {
  isSticky: boolean
  setHeaderHeight?: (headerHeight: number) => void
  handleHeaderScrollY?: (scrollLeft: number) => void
  headerHeight?: number
  scrollLeft?: number
  sidebarWidth: number
  timelineViewportWidth: number
}

export type TimelineProps = {
  now: Date
  time: TimeType
  timebar: TimebarType[]
  tracks: TracksType[]
  sticky: StickyType
  lineStyle?: LineStyle
}

export type LineStyle = {
  newRegistration?: string
  newTypes?: string
  effective?: string
  allVehicles?: string
  expiration?: string
  phaseIn?: string
  phaseOut?: string
}

export type TimelineState = {
  pointerDate: Date | null
  pointerVisible: boolean
  pointerHighlighted: boolean
}

export type NowMarkerProps = {
  now: Date
  visible: boolean
  time: TimeType
} & WithTranslation

export type PointerMarkerProps = {
  time: TimeType
  date: Date
  visible: boolean
  highlighted: boolean
} & WithTranslation

export type MarkerProps = {
  x: number
  modifier: string
  children: React.ReactNode
  visible: boolean
  highlighted?: boolean
}

export type HeaderProps = {
  time: TimeType
  timebar: TimebarType[]
  onMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onEnter: () => void
  onLeave: () => void
  width: string
  sticky: StickyType
}

export type LayoutProps = {
  enableSticky: boolean
  isOpen: boolean
  time: TimeType
  scrollToNow: boolean
  now: Date
  tracks: TracksType[]
  timebar: TimebarType[]
  toggleTrackOpen: (track: TracksType) => void
  timelineViewportWidth: number
  sidebarWidth: number
  lineStyle?: LineStyle
  onLayoutChange: (
    {
      timelineViewportWidth,
      sidebarWidth,
    }: {
      timelineViewportWidth: number
      sidebarWidth: number
    },
    cb?: () => void | undefined,
  ) => void
}

export type LayoutState = {
  isSticky: boolean
  headerHeight: number
  scrollLeft: number
}

export type SidebarProps = {
  timebar: TimebarType[]
  tracks: TracksType[]
  toggleTrackOpen: (track: TracksType) => void
  sticky: StickyType
}

export type TrackKeyProps = {
  track: TracksType
  toggleOpen: (track: TracksType) => void
  clickTrackButton?: (track: TracksType) => void
} & WithTranslation

export type BasicsElementProps = {
  type: string
  name: string
  start: Date
  end: Date
  lineStyle?: {
    [key: string]: number | string
  }
  style?: {
    [key: string]: number | string
  }
  classes: string[]
  dataSet?: {
    [key: string]: string
  }
} & WithTranslation

export type BasisElementType = {
  tooltip: {
    x: number
  }
}
