export function isValidCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const sanitizedCPF = cpf.replace(/\D/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (sanitizedCPF.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(sanitizedCPF)) {
    return false
  }

  // Validação dos dígitos verificadores
  let sum = 0
  let rest

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(sanitizedCPF.substring(i - 1, i)) * (11 - i)
  }

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== parseInt(sanitizedCPF.substring(9, 10))) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(sanitizedCPF.substring(i - 1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) {
    rest = 0
  }

  return rest === parseInt(sanitizedCPF.substring(10, 11))
}
