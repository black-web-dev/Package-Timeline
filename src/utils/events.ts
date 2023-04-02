export const addListener = (e: string, t: () => void) => window.addEventListener(e, t)
export const removeListener = (e: string, t: () => void) => window.removeEventListener(e, t)
