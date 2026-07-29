export function isValidCNPJ(cnpj: string): boolean {
  // Remove caracteres não alfanuméricos
  const sanitizedCNPJ = cnpj.replace(/[^a-zA-Z0-9]/g, '')

  // Verifica se o CNPJ é válido no formato atual
  const isValidCurrentFormat = /^\d{14}$/.test(sanitizedCNPJ)

  // Verifica se o CNPJ é válido no novo formato alfanumérico - a partir de 2026
  const isValidNewFormat = /^[A-Za-z0-9]{8}[A-Za-z0-9]{4}\d{2}$/.test(
    sanitizedCNPJ,
  )

  return isValidCurrentFormat || isValidNewFormat
}
