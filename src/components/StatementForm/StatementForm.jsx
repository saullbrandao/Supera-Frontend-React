import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import ptBR from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'
import './StatementForm.css'
import { apiURL } from '../../utils/constants'

export function StatementForm({ updateStatement }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [operatorName, setOperatorName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const momentStartDate = moment(startDate)
    const momentEndDate = moment(endDate)

    const data = {
      startDate: momentStartDate.isValid()
        ? momentStartDate.format('yyyy-MM-DD')
        : '',
      endDate: momentEndDate.isValid()
        ? momentEndDate.format('yyyy-MM-DD')
        : '',
      operatorName,
    }

    const url = `${apiURL}?startDate=${data.startDate}&endDate=${data.endDate}&operatorName=${data.operatorName}`

    fetch(url)
      .then(res => res.json())
      .then(res => updateStatement(res))
  }

  return (
    <form className="statement-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="startDate">Data inicial: </label>
        <ReactDatePicker
          selected={startDate}
          id="startDate"
          name="startDate"
          value={startDate}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          isClearable
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          onChange={date => setStartDate(date)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="endDate">Data final: </label>
        <ReactDatePicker
          selected={endDate}
          id="endDate"
          name="endDate"
          value={endDate}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          isClearable
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={date => setEndDate(date)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="operatorName">Nome do operador: </label>
        <input
          type="text"
          id="operatorName"
          name="operatorName"
          value={operatorName}
          onChange={e => setOperatorName(e.target.value)}
        />
      </div>
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  )
}
