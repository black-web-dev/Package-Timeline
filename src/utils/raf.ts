export default (cb: () => void) => window.requestAnimationFrame(cb)
