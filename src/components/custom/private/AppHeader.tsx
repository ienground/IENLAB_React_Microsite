import { Link, useMatches } from "react-router"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {useTranslation} from "react-i18next"
import {Fragment} from "react"
import {Button} from "@/components/ui/button.tsx"
import {RiNotification3Fill} from "@remixicon/react"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"

export interface PathSegment {
  title: string
  path: string
}

export default function AppHeader() {
  const { t } = useTranslation()
  const matches = useMatches()
  const segments: PathSegment[] = matches.flatMap(match => {
    const handle = match.handle
    if (typeof handle === "function") {
      return (handle as (match: unknown) => PathSegment[])(match)
    }
    return (handle as PathSegment[] | undefined) ?? []
  })
  const homePath: PathSegment = { title: t("strings:home.label"), path: ClientHomeDestination.root }

  return (
    <header>
      <div className="flex h-14 items-center gap-3 px-4">
        <SidebarTrigger className="size-9 rounded-xl border" />
        <Breadcrumb className="grow">
          <BreadcrumbList>
            {
              [homePath, ...segments].map((segment, index) => (
                index < segments.length ?
                  <Fragment key={segment.path}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild><Link to={segment.path}>{segment.title}</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment> :
                  <BreadcrumbItem key={segment.path}>
                    <BreadcrumbPage>{segment.title}</BreadcrumbPage>
                  </BreadcrumbItem>
              ))
            }
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="ghost" size="icon">
          <RiNotification3Fill />
        </Button>
      </div>
    </header>
  )
}