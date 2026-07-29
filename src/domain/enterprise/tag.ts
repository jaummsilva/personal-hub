import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { User } from "./user";

type TagProps = {
  name: string;
  color: string;
  userId: UniqueEntityID;
  user?: User;
};

export class Tag extends Entity<TagProps> {
  private constructor(props: TagProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: TagProps, id?: UniqueEntityID): Tag {
    const tag = new Tag(
      {
        ...props,
      },
      id,
    );

    return tag;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get color() {
    return this.props.color;
  }

  set color(color: string) {
    this.props.color = color;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId;
  }

  get user() {
    return this.props.user;
  }
}
