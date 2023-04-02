import { TimebarType } from '../type'

const getGrid = (timebar: TimebarType[]) => (timebar.find((row: TimebarType) => row.useAsGrid) || {}).cells

export default getGrid
