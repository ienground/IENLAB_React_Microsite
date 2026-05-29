import {generatePath} from "react-router"

export const ProjectDestination = {
  root: "/project" as const,
  detail: "/project/:id" as const,

  path: {
    detail: (id: string) => generatePath(ProjectDestination.detail, { id })
  }
} as const