export function convertToCurrency(value) {
  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  let formattedValue = currencyFormat.format(value)

  if (value < 0) {
    formattedValue = formattedValue.replace('-R$', 'R$ -')
  }

  return formattedValue
}
