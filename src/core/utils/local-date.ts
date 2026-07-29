export function localDate(dateString: string) {
  const utcDate = new Date(dateString)

  const localYear = utcDate.getUTCFullYear()
  const localMonth = utcDate.getUTCMonth()
  const localDay = utcDate.getUTCDate()
  const localHours = utcDate.getUTCHours()
  const localMinutes = utcDate.getUTCMinutes()
  const localSeconds = utcDate.getUTCSeconds()

  const localDate = new Date(
    localYear,
    localMonth,
    localDay,
    localHours,
    localMinutes,
    localSeconds,
  )

  return localDate
}

export function localDateSetHours(dateString: string) {
  const utcDate = new Date(dateString)

  const localYear = utcDate.getUTCFullYear()
  const localMonth = utcDate.getUTCMonth()
  const localDay = utcDate.getUTCDate()
  const localHours = utcDate.getUTCHours()
  const localMinutes = utcDate.getUTCMinutes()
  const localSeconds = utcDate.getUTCSeconds()

  const localDate = new Date(
    localYear,
    localMonth,
    localDay,
    localHours,
    localMinutes,
    localSeconds,
  ).setHours(0, 0, 0, 0)

  return localDate
}

export function localDateFromDDMMYYYY(dateString: string) {
  // Dividir a string no formato DD/MM/YYYY em partes
  const [day, month, year] = dateString.split('/').map(Number)

  if (!day || !month || !year) {
    throw new Error(
      'Data inválida. Certifique-se de usar o formato DD/MM/YYYY.',
    )
  }

  // O mês no construtor de `Date` é baseado em zero, então subtraímos 1 de `month`
  const utcDate = new Date(Date.UTC(year, month - 1, day))

  const localYear = utcDate.getUTCFullYear()
  const localMonth = utcDate.getUTCMonth()
  const localDay = utcDate.getUTCDate()
  const localHours = utcDate.getUTCHours()
  const localMinutes = utcDate.getUTCMinutes()
  const localSeconds = utcDate.getUTCSeconds()

  const localDate = new Date(
    localYear,
    localMonth,
    localDay,
    localHours,
    localMinutes,
    localSeconds,
  )

  return localDate
}

export function excelSerialToLocalDate(serial: number): Date {
  // Data base do Excel: 01/01/1900
  const excelBaseDate = new Date(Date.UTC(1900, 0, 1)) // Usando UTC para evitar problemas de fuso horário

  // Corrigir o bug do Excel que considera 1900 como ano bissexto
  const daysOffset = serial - 2 // Subtraímos 2 (1 pelo ajuste base e 1 pelo "bug")

  // Criar a nova data adicionando os dias ao baseDate
  const resultDate = new Date(
    excelBaseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000,
  ) // Converter dias para milissegundos

  return resultDate
}
