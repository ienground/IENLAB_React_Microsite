import {generatePath} from "react-router"

export const ClientOutsourceDestination = {
  root: "/client/outsource" as const,
  detail: "/client/outsource/:itemId" as const,

  log: {
    list: "/client/outsource/:itemId/log" as const,
    detail: "/client/outsource/:itemId/log/:logId" as const,
  },

  request: {
    list: "/outsource/:itemId/request" as const,
    detail: "/outsource/:itemId/request/:requestId" as const,
    edit: "/outsource/:itemId/request/:requestId/edit" as const,
  },

  revision: {
    list: "/outsource/:itemId/revision" as const,
    new: "/outsource/:itemId/revision/new" as const,
    detail: "/outsource/:itemId/revision/:revisionId" as const,
    edit: "/outsource/:itemId/revision/:revisionId/edit" as const
  },

  path: {
    detail: (itemId: string) => generatePath(ClientOutsourceDestination.detail, { itemId }),

    log: {
      list: (itemId: string) => generatePath(ClientOutsourceDestination.log.list, { itemId }),
      detail: (itemId: string, logId: string) => generatePath(ClientOutsourceDestination.log.detail, { itemId, logId })
    },

    request: {
      list: (itemId: string) => generatePath(ClientOutsourceDestination.request.list, { itemId }),
      edit: (itemId: string, requestId: string) => generatePath(ClientOutsourceDestination.request.edit, { itemId, requestId }),
    },

    revision: {
      list: (itemId: string) => generatePath(ClientOutsourceDestination.revision.list, { itemId }),
      new: (itemId: string) => generatePath(ClientOutsourceDestination.revision.new, { itemId }),
      detail: (itemId: string, revisionId: string) => generatePath(ClientOutsourceDestination.revision.detail, { itemId, revisionId }),
      edit: (itemId: string, revisionId: string) => generatePath(ClientOutsourceDestination.revision.edit, { itemId, revisionId }),
    }
  }
} as const