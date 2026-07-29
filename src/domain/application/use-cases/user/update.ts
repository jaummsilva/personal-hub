
import { Either, left, right } from '@/core/either'
import type { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/user'
import { UserNotExistsError } from '../../errors/user/user-not-exists'
import type { HashGenerator } from '@/core/cryptography/hash-generator'


interface UpdateUserUseCaseRequest {
  userId: string
  name: string
  password?: string
}

type UpdateUserUseCaseResponse = Either<
 UserNotExistsError,
  { user: User }
>

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    name,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotExistsError())
    }

    if (password !== undefined && password !== null && password !== '') {
      const passwordHash = await this.hashGenerator.hash(password)
      user.passwordHash = passwordHash
    }

    user.name = name

    await this.usersRepository.update(user)

    return right({ user })
  }
}
