import {generatePath} from "react-router"

export const NoticeDestination = {
  root: "/notice" as const,
  detail: "/notice/:id" as const,

  path: {
    detail: (id: string) => generatePath(NoticeDestination.detail, { id })
  }
} as const