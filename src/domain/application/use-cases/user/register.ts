import type { HashGenerator } from '@/core/cryptography/hash-generator'
import { type Either, right } from '@/core/either'
import type { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/user'

import type { UserAlreadyExistsError } from '../../errors/user/user-already-exists'

interface RegisterAppUserUseCaseRequest {
  name: string
  password: string
  cpf: string
}

type RegisterAppUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  { user: User }
>

export class RegisterAppUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    password,
    cpf,
  }: RegisterAppUserUseCaseRequest): Promise<RegisterAppUserUseCaseResponse> {
    const passwordHash = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      passwordHash,
      cpf,
    })

    const userCreated = await this.usersRepository.create(user)

    return right({ user: userCreated })
  }
}
