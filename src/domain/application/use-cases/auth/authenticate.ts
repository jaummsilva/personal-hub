import type { HashComparer } from '@/core/cryptography/hash-comparer'
import { type Either, left, right } from '@/core/either'
import { UnauthorizedError } from '@/core/errors/unauthorized'
import type { UsersRepository } from '@/domain/application/repositories/users-repository'
import type { User } from '@/domain/enterprise/user'
import { UserNotExistsError } from '../../errors/user/user-not-exists'


interface AuthenticateUseCaseRequest {
  password: string
  cpf: string
}

type AuthenticateUseCaseResponse = Either<
  UserNotExistsError | UnauthorizedError,
  { user: User }
>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashComparer,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return left(new UserNotExistsError())
    }

    const doesPasswordMatches = await this.hashCompare.compare(
      password,
      user.passwordHash,
    )

    if (!doesPasswordMatches) {
      return left(new UserNotExistsError())
    }


    return right({ user })
  }
}
