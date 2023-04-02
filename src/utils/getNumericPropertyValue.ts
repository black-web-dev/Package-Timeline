import computedStyle from './computedStyle'

export default (node: Element, prop: string) => parseInt(computedStyle(node, '').getPropertyValue(prop), 10)
