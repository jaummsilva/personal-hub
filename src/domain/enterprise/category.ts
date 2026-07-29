import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { User } from './user'

type CategoryProps = {
  name: string
  icon: string
  color: string
  userId: UniqueEntityID
  user?: User
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: UniqueEntityID): Category {
    const category = new Category(
      {
        ...props,
      },
      id,
    )

    return category
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get icon() {
    return this.props.icon
  }

  set icon(icon: string) {
    this.props.icon = icon
  }

  get color() {
    return this.props.color
  }

  set color(color: string) {
    this.props.color = color
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  get user() {
    return this.props.user
  }
}
