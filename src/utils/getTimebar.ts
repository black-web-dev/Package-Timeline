import { TrackType } from '../type'

type MonthNames = {
  [key: string]: string[]
}

export const MONTHS_PER_YEAR = 12

export const MONTH_NAMES: MonthNames = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
}

export const addMonthsToYear = (year: number, monthsToAdd: number) => {
  let y = year
  let m = monthsToAdd
  while (m >= MONTHS_PER_YEAR) {
    m -= MONTHS_PER_YEAR
    y += 1
  }
  return { year: y, month: m + 1 }
}

export const addMonthsToYearAsDate = (year: number, monthsToAdd: number) => {
  const r = addMonthsToYear(year, monthsToAdd)
  return new Date(`${r.year}-${r.month}`)
}

export const buildMonthCells = (start: Date, end: Date, lng: string) => {
  const v = []
  const start_year = start.getFullYear()
  const start_month = start.getMonth()
  const months = Math.abs(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()))

  for (let i = 0; i < months; i += 1) {
    const startMonth = i + start_month
    const start = addMonthsToYearAsDate(start_year, startMonth)
    const end = addMonthsToYearAsDate(start_year, startMonth + 1)

    v.push({
      id: `m${startMonth}`,
      name: `${MONTH_NAMES[lng][startMonth % MONTHS_PER_YEAR]}, ${
        startMonth > MONTHS_PER_YEAR ? start_year + Math.floor(startMonth / MONTHS_PER_YEAR) : start_year
      }`,
      start,
      end,
    })
  }
  return v
}

const buildTimebar = (tracks: TrackType[][], lng: string) => {
  const sortTracks = [...tracks]
  sortTracks.sort((a, b) => new Date(a[0].dateNewRegistration).getTime() - new Date(b[0].dateNewRegistration).getTime())
  const marginDate = 1000 * 60 * 60 * 24 * 10
  const startDate = sortTracks[0][0].dateNewRegistration
  const endDate = new Date(
    sortTracks[sortTracks.length - 1][sortTracks[sortTracks.length - 1].length - 1].dateNewRegistration.getTime() +
      1000 * 60 * 60 * 24 * 30 * 12, // set end timeline to dateRegistration of last track + 12 months
  )

  const start = new Date(startDate.getTime() - marginDate)
  const end = new Date(endDate.getTime() + marginDate)
  const timebar = [
    {
      id: 'months',
      name: '',
      cells: buildMonthCells(start, end, lng),
      useAsGrid: true,
    },
  ]
  const dateTimebarEnd = timebar[0].cells[timebar[0].cells.length - 1].end
  return {
    start,
    end,
    dateTimebarEnd,
    timebar,
  }
}

export default buildTimebar
