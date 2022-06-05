const formatter = Intl.NumberFormat('pt-BR')

function helpersFormatNumber(value: number) {
  return formatter.format(value)
}

export { helpersFormatNumber }
