import { CreateTimeType, TimeType } from '../type'

const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000

const create = ({ start, end, zoom, viewportWidth = 0, minWidth = 0 }: CreateTimeType): TimeType => {
  const duration = end.getTime() - start.getTime()

  const days = duration / MILLIS_IN_A_DAY
  const daysZoomWidth = days * zoom

  let timelineWidth: number

  if (daysZoomWidth > viewportWidth) {
    timelineWidth = daysZoomWidth
  } else {
    timelineWidth = viewportWidth
  }

  if (timelineWidth < minWidth) {
    timelineWidth = minWidth
  }

  const timelineWidthStyle = `${timelineWidth}px`

  const toX = (from: Date) => {
    const value = (from.getTime() - start.getTime()) / duration
    return Math.round(value * timelineWidth)
  }

  const toStyleLeftAndWidth = (from: Date, to?: Date) => {
    const left = toX(from)
    if (to) {
      return {
        left: `${left}px`,
        width: `${toX(to) - left}px`,
      }
    } else {
      return {
        left: `${left}px`,
      }
    }
  }

  const fromX = (x: number) => new Date(start.getTime() + (x / timelineWidth) * duration)

  return {
    timelineWidth,
    timelineWidthStyle,
    start,
    end,
    zoom,
    toX,
    toStyleLeftAndWidth,
    fromX,
  }
}

export default create
