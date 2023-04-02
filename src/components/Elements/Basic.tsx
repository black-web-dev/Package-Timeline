import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { getDayMonth } from '../../utils/formatDate'
import createClasses from '../../utils/classes'
import { BasicsElementProps, BasisElementType } from '../../type'

type ValueType<T extends string | number | symbol> = {
  [key in T]: string
}

const buildDataAttributes = (
  attributes: {
    [key: string]: string
  } = {},
) => {
  const value: ValueType<string> = {}
  Object.keys(attributes).forEach((name: string) => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

class Basic extends PureComponent<BasicsElementProps, BasisElementType> {
  constructor(props: BasicsElementProps) {
    super(props)
    this.state = {
      tooltip: {
        x: 0,
      },
    }
  }

  handleMouseMove = (event: React.MouseEvent) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    this.setState({
      tooltip: {
        x,
      },
    })
  }

  render() {
    const { t, i18n, type, name, start, end, style, lineStyle, classes, dataSet }: BasicsElementProps = this.props
    const {
      tooltip: { x },
    }: BasisElementType = this.state

    return (
      <div
        className={createClasses('rt-element', classes)}
        style={{ ...style, ...lineStyle }}
        {...buildDataAttributes(dataSet)}
        onMouseMove={this.handleMouseMove}
      >
        {type === 'phase-in' || type === 'phase-out' ? (
          <>
            <div className={createClasses('phase', type)} style={{ ...lineStyle }} />
            <div className='rt-element__tooltip' style={{ left: x }}>
              <div className='tooltip-phase'>
                <div>{`${name} ( ${t(type === 'phase-in' ? 'phaseIn' : 'phaseOut')} )`}</div>
                <div className='rt-element__tooltip__date'>
                  <div>{getDayMonth(start, i18n.language)}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='rt-element__tooltip' style={{ left: x }}>
            <div>
              <div>{`${name} ( ${t(type)} )`}</div>
              <div className='rt-element__tooltip__date'>
                <div>{getDayMonth(start, i18n.language)}</div>
                <div> - </div>
                <div>{getDayMonth(end, i18n.language)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withTranslation()(Basic)
