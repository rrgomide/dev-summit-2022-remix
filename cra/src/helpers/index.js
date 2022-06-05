const formatter = Intl.NumberFormat('pt-BR')

function helpersFormatNumber(value) {
  return formatter.format(value)
}

export { helpersFormatNumber }
