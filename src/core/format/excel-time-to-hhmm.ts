export function excelTimeToHHMM(time: number | string): string {
  if (typeof time === 'number') {
    const totalMinutes = Math.round(time * 24 * 60) // Converte dias para minutos
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }
  return time // Retorna como está se não for numérico
}
