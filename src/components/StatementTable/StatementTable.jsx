import moment from 'moment'
import { convertToCurrency } from '../../utils/convertToCurrency'
import './StatementTable.css'

export function StatementTable({ statement }) {
  return (
    <table className="responsive-table">
      <caption>Extrato Bancário de {statement.accountOwner}</caption>

      <thead>
        <tr className="balance-row">
          <th colSpan={2}>
            Saldo total: {convertToCurrency(statement?.totalBalance)}{' '}
          </th>
          <th colSpan={2}>
            Saldo no período: {convertToCurrency(statement?.balanceInPeriod)}
          </th>
        </tr>
        <tr className="table-header">
          <th>Data</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Nome do operador</th>
        </tr>
      </thead>
      <tbody>
        {statement?.transfers?.length > 0 ? (
          statement.transfers.map(transfer => (
            <tr key={transfer.id}>
              <td data-label="Data">
                {moment(transfer.transferDate).format('DD/MM/yyyy')}
              </td>
              <td data-label="Valor">{convertToCurrency(transfer.value)}</td>
              <td data-label="Tipo">{transfer.type}</td>
              <td data-label="Nome do operador">
                {transfer.operatorName || '-'}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="empty-message" colSpan={4}>
              Nenhuma transferência no período escolhido
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
