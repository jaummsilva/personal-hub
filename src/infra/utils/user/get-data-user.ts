type UserProps = {
  sub: string
  role: string
  companyId?: string
  consultancyId?: string
  branchId?: string
}

export function getDataUser(user: UserProps) {
  const { sub, role, companyId, consultancyId, branchId } = user
  return {
    sub,
    role,
    companyId: companyId?.toString(),
    consultancyId: consultancyId?.toString(),
    branchId: branchId?.toString(),
  }
}
