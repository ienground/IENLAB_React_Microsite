export const BrandDestination = {
  root: "/brand" as const,

  archive: {
    list: "/archive" as const,
    v2023: "/archive/2023" as const
  }
} as const