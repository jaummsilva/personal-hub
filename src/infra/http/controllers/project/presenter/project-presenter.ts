import type { Project } from "@/domain/enterprise/project";

export class ProjectsPresenter {
  static toHttp(project: Project) {
    return {
      id: project.id.toString(),
      name: project.name,
      icon: project.icon,
      color: project.color,
      description: project.description,
      userId: project.userId.toString(),
      user: project.user
        ? {
            id: project.userId.toString(),
            name: project.user.name,
            cpf: project.user.cpf,
          }
        : null,
    };
  }
}
