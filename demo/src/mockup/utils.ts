import { MONTHS_PER_YEAR } from './constants'

export const fill = (index: number) => {
  const arr = []
  for (let i = 0; i < index; i += 1) {
    arr.push(i)
  }
  return arr
}

export const randomColor = () => {
  const LETTERS = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i += 1) {
    color += LETTERS[Math.floor(Math.random() * 16)]
  }
  return color
}

export const hexToRgb = (hex: string) => {
  const v: number = parseInt(hex, 16)
  const r: number = (v >> 16) & 255
  const g: number = (v >> 8) & 255
  const b: number = v & 255
  return [r, g, b]
}

export const colourIsLight = (r: number, g: number, b: number) => {
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return a < 0.5
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

export const randomMonth = (min = 1, max = 12) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomDay = (min = 1, max = 30) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const addMonthsAndDaysToYear = (year: number, monthsToAdd: number) => {
  let y = year
  let m = monthsToAdd
  const d = randomDay()

  while (m >= MONTHS_PER_YEAR) {
    m -= MONTHS_PER_YEAR
    y += 1
  }
  return { year: y, month: m + 1, day: d }
}

export const addMonthsToYearAsDate = (year: number, monthsToAdd: number) => {
  const r = addMonthsToYear(year, monthsToAdd)
  return new Date(`${r.year}-${r.month}`)
}

export const addMonthsAndDaysToYearAsDate = (year: number, monthsToAdd: number) => {
  const r = addMonthsAndDaysToYear(year, monthsToAdd)
  return new Date(`${r.year}-${r.month}-${r.day}`)
}
