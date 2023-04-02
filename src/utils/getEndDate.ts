import { TrackType } from '../type'

const getEndDate = (tracks: TrackType[], index: number, type: keyof TrackType, date: Date) => {
  const track = tracks.slice(index).find((item) => !!item[type])
  return (track && track[type] && track[type]) || date
}

export default getEndDate
