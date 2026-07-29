export interface CustomError extends Error {
  errors?: { message: string }[]
}
