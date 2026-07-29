import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type UserProps = {
  name: string
  passwordHash: string
  createdAt?: Date
  updatedAt?: Date
  cpf: string
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  set passwordHash(passwordHash: string) {
    this.props.passwordHash = passwordHash
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }
}
