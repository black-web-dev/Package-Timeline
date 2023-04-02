import React from 'react'
import { ElementProps } from '../../../type'
import BasicElement from '../../Elements/Basic'

const Element = (props: ElementProps): JSX.Element => {
  const {
    time,
    name,
    dateNewRegistration,
    dateNewTypes,
    dateEffective,
    dateAllVehicles,
    dateExpiration,
    dateNewRegistrationEnd,
    dateNewTypesEnd,
    dateEffectiveEnd,
    dateAllVehiclesEnd,
    dateExpirationEnd,
    phaseIn,
    phaseOut,
    dataSet,
    lineStyle,
  } = props

  const elementStyle = (from: Date, end: Date) => ({
    ...time.toStyleLeftAndWidth(from, end),
  })

  return (
    <>
      <div className='rt-track__element'>
        <div className='rt-track__element__grid'>
          <div className='rt-track__element__grid__line'></div>
        </div>
        <BasicElement
          type='registration'
          name={name}
          start={dateNewRegistration}
          end={dateNewRegistrationEnd}
          style={elementStyle(dateNewRegistration, dateNewRegistrationEnd)}
          lineStyle={lineStyle?.newRegistration ? { backgroundColor: lineStyle?.newRegistration } : {}}
          classes={['registration']}
          dataSet={dataSet}
        />
      </div>
      <div className='rt-track__element'>
        <div className='rt-track__element__grid'>
          <div className='rt-track__element__grid__line'></div>
        </div>
        <BasicElement
          type='types'
          name={name}
          start={dateNewTypes}
          end={dateNewTypesEnd}
          style={elementStyle(dateNewTypes, dateNewTypesEnd)}
          lineStyle={lineStyle?.newTypes ? { backgroundColor: lineStyle?.newTypes } : {}}
          classes={['types']}
          dataSet={dataSet}
        />
      </div>
      {dateEffective && (
        <div className='rt-track__element'>
          <div className='rt-track__element__grid'>
            <div className='rt-track__element__grid__line'></div>
          </div>
          <BasicElement
            type='effective'
            name={name}
            start={dateEffective}
            end={dateEffectiveEnd}
            style={elementStyle(dateEffective, dateEffectiveEnd)}
            lineStyle={lineStyle?.effective ? { backgroundColor: lineStyle?.effective } : {}}
            classes={['effective']}
            dataSet={dataSet}
          />
        </div>
      )}
      {dateAllVehicles && (
        <div className='rt-track__element'>
          <div className='rt-track__element__grid'>
            <div className='rt-track__element__grid__line'></div>
          </div>
          <BasicElement
            type='vehicles'
            name={name}
            start={dateAllVehicles}
            end={dateAllVehiclesEnd}
            style={elementStyle(dateAllVehicles, dateAllVehiclesEnd)}
            lineStyle={lineStyle?.allVehicles ? { backgroundColor: lineStyle?.allVehicles } : {}}
            classes={['vehicles']}
            dataSet={dataSet}
          />
        </div>
      )}
      {dateExpiration && (
        <div className='rt-track__element'>
          <div className='rt-track__element__grid'>
            <div className='rt-track__element__grid__line'></div>
          </div>
          <BasicElement
            type='expiration'
            name={name}
            start={dateExpiration}
            end={dateExpirationEnd}
            style={elementStyle(dateExpiration, dateExpirationEnd)}
            lineStyle={lineStyle?.expiration ? { backgroundColor: lineStyle?.expiration } : {}}
            classes={['expiration']}
            dataSet={dataSet}
          />
        </div>
      )}
      <div className='rt-track__element'>
        <div className='rt-track__element__grid'>
          <div className='rt-track__element__grid__line'></div>
        </div>
        {phaseIn.map((date: Date, index: number) => (
          <BasicElement
            key={index}
            type='phase-in'
            name={name}
            start={date}
            end={date}
            style={elementStyle(date, date)}
            lineStyle={lineStyle?.phaseIn ? { backgroundColor: lineStyle?.phaseIn } : {}}
            classes={['phase-in-out']}
            dataSet={dataSet}
          />
        ))}
        {phaseOut.map((date: Date, index: number) => (
          <BasicElement
            key={index}
            type='phase-out'
            name={name}
            start={date}
            end={date}
            style={elementStyle(date, date)}
            lineStyle={lineStyle?.phaseOut ? { backgroundColor: lineStyle?.phaseOut } : {}}
            classes={['phase-in-out']}
            dataSet={dataSet}
          />
        ))}
      </div>
    </>
  )
}

export default Element
