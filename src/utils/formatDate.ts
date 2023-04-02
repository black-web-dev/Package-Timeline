import { MONTH_NAMES } from './getTimebar'

export const getMonth = (date: Date, lng: string) => MONTH_NAMES[lng][date.getMonth()]

export const getDayMonth = (date: Date, lng: string) => {
  return `${date.getDate()} ${getMonth(date, lng)} ${date.getFullYear()}`
}
