import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { User } from "./user";

type ProjectProps = {
  name: string;
  icon: string;
  color: string;
  description: string;
  userId: UniqueEntityID;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Project extends Entity<ProjectProps> {
  private constructor(props: ProjectProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ProjectProps, id?: UniqueEntityID): Project {
    const project = new Project(
      {
        ...props,
      },
      id,
    );

    return project;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get icon() {
    return this.props.icon;
  }

  set icon(icon: string) {
    this.props.icon = icon;
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

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
