import {
  START_YEAR,
  NUM_OF_YEARS,
  MONTH_NAMES,
  MONTHS_PER_YEAR,
  NUM_OF_MONTHS,
  MAX_TRACK_START_GAP,
  MAX_MONTH_SPAN,
  MIN_MONTH_SPAN,
} from './constants'

import { addMonthsToYearAsDate, addMonthsAndDaysToYearAsDate, randomMonth, randomColor } from './utils'

export const buildLineStyle = () => {
  const style: { [key: string]: string } = {}

  if (Math.round(Math.random())) style['newRegistration'] = randomColor()
  if (Math.round(Math.random())) style['newTypes'] = randomColor()
  if (Math.round(Math.random())) style['effective'] = randomColor()
  if (Math.round(Math.random())) style['allVehicles'] = randomColor()
  if (Math.round(Math.random())) style['expiration'] = randomColor()
  if (Math.round(Math.random())) style['phaseIn'] = randomColor()
  if (Math.round(Math.random())) style['phaseOut'] = randomColor()

  return style
}

export const buildMonthCells = () => {
  const v = []

  for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
    const startMonth = i
    const start = addMonthsToYearAsDate(START_YEAR, startMonth)
    const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1)

    v.push({
      id: `m${startMonth}`,
      name: `${MONTH_NAMES[i % 12]}, ${i > 12 ? START_YEAR + Math.floor(i / 12) : START_YEAR}`,
      start,
      end,
    })
  }
  return v
}

export const buildSubTrack = ({
  trackId,
  dateNewRegistration,
  dateNewTypes,
  dateEffective,
  dateAllVehicles,
  dateExpiration,
  phaseIn,
  phaseOut,
  i,
}: {
  trackId: number
  dateNewRegistration: Date
  dateNewTypes: Date
  dateEffective?: Date
  dateAllVehicles?: Date
  dateExpiration?: Date
  phaseIn: Date[]
  phaseOut: Date[]
  i: number
}) => {
  return {
    id: `version-${trackId}-${i}`,
    name: `${trackId}.${i}`,
    dateNewRegistration,
    dateNewTypes,
    dateEffective,
    dateAllVehicles,
    dateExpiration,
    phaseIn,
    phaseOut,
  }
}

export const buildTrackStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP)

export const buildSubtracks = (trackId: number) => {
  const v = []
  let i = 0
  let month = randomMonth()

  while (month < NUM_OF_MONTHS) {
    let monthSpan = Math.floor(Math.random() * (MAX_MONTH_SPAN - (MIN_MONTH_SPAN - 1))) + MIN_MONTH_SPAN
    if (month + monthSpan > NUM_OF_MONTHS) {
      monthSpan = NUM_OF_MONTHS - month
    }
    let newTypesSpan = Math.floor(Math.random() * (monthSpan - (MIN_MONTH_SPAN - 1))) + 1
    if (month + newTypesSpan + 1 > NUM_OF_MONTHS) {
      newTypesSpan = NUM_OF_MONTHS - month - 1
    }

    let effectiveSpan = Math.floor(Math.random() * (monthSpan - (MIN_MONTH_SPAN - 1))) + 1
    if (month + effectiveSpan + 1 > NUM_OF_MONTHS) {
      effectiveSpan = NUM_OF_MONTHS - month
    }

    let allVehiclesSpan = Math.floor(Math.random() * (monthSpan - (MIN_MONTH_SPAN - 1))) + 1
    if (month + allVehiclesSpan + 1 > NUM_OF_MONTHS) {
      allVehiclesSpan = NUM_OF_MONTHS - month
    }

    let expirationSpan = Math.floor(Math.random() * (monthSpan - (MIN_MONTH_SPAN - 1))) + 1
    if (month + expirationSpan + 1 > NUM_OF_MONTHS) {
      expirationSpan = NUM_OF_MONTHS - month
    }

    const dateNewRegistration = addMonthsAndDaysToYearAsDate(START_YEAR, month)
    const dateNewTypes = addMonthsAndDaysToYearAsDate(START_YEAR, month + newTypesSpan)

    const dateEffective = Math.round(Math.random())
      ? addMonthsAndDaysToYearAsDate(START_YEAR, month + effectiveSpan)
      : undefined

    const dateAllVehicles = Math.round(Math.random())
      ? addMonthsAndDaysToYearAsDate(START_YEAR, month + allVehiclesSpan)
      : undefined

    const dateExpiration = Math.round(Math.random())
      ? addMonthsAndDaysToYearAsDate(START_YEAR, month + expirationSpan)
      : undefined

    const phaseInCount = Math.floor(Math.random() * 4) + 1
    const phaseOutCount = Math.floor(Math.random() * 4) + 1
    const phaseIn = []
    const phaseOut = []

    for (let j = 0; j < phaseInCount; j++) {
      const phaseInSpan = Math.floor(Math.random() * monthSpan)
      const datePhaseIn = addMonthsAndDaysToYearAsDate(START_YEAR, month + phaseInSpan)
      phaseIn.push(datePhaseIn)
    }

    for (let j = 0; j < phaseOutCount; j++) {
      const phaseOutSpan = Math.floor(Math.random() * monthSpan)
      const datePhaseOut = addMonthsAndDaysToYearAsDate(START_YEAR, month + phaseOutSpan)
      phaseOut.push(datePhaseOut)
    }

    v.push(
      buildSubTrack({
        trackId,
        dateNewRegistration,
        dateNewTypes,
        dateEffective,
        dateAllVehicles,
        dateExpiration,
        phaseIn,
        phaseOut,
        i,
      }),
    )

    month += monthSpan
    i += 1
  }

  return v
}

export const buildTrack = (trackId: number) => {
  return buildSubtracks(trackId)
}
