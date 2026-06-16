import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu, SidebarMenuAction, SidebarMenuButton,
  SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar,
} from "@/components/ui/sidebar"
import type {User} from "@/domain/model/User"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useTranslation} from "react-i18next"
import {
  RiArrowRightSLine,
  RiArrowUpSLine, RiErrorWarningFill,
  RiMoonFill,
  RiSunFill, RiTaskFill
} from "@remixicon/react"
import imgLogoColor from "@/assets/brand/logo512.png"
import {CrossfadeImage, useTheme} from "@ienlab/react-library"
import {type ReactNode, useMemo, useState} from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import {toast} from "sonner"
import {Link, useNavigate} from "react-router"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx"
import {Swap, SwapOff, SwapOn } from "@/components/ui/swap"
import {MagneticButton} from "@/components/motion/components.tsx"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {ClientUserDestination} from "@/ui/client/user/ClientUserDestination.ts"

interface AppSidebarProps {
  user: User | null
  email?: string
  signOut: () => Promise<void>
}

type SidebarDataGroup = {
  title: string
  items: SidebarData[]
}

type SidebarData = {
  title: string
  url: string
  icon: ReactNode,
  items?: SidebarDataItem[]
}

type SidebarDataItem = {
  title: string
  url: string
}

export function AppSidebar(props: AppSidebarProps) {
  const {t} = useTranslation()
  const {resolvedTheme, setTheme} = useTheme()
  const navigate = useNavigate()
  const {isMobile, setOpenMobile} = useSidebar()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const data: SidebarDataGroup[] = useMemo(() => [
    {
      title: t("strings:outsource_manage.label"),
      items: [
        // {
        //   title: t("strings:outsource_manage.budget.label"),
        //   url: BudgetDestination.root,
        //   icon: <RiWallet3Fill />
        // },
        // {
        //   title: t("strings:outsource_manage.company.label"),
        //   url: CompanyDestination.root,
        //   icon: <RiBuildingFill />
        // },
        {
          title: t("strings:outsource_manage.outsource.label"),
          url: ClientOutsourceDestination.root,
          icon: <RiTaskFill />
        }
      ]
    }
  ], [t])

  return (
    <>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="w-full flex flex-row p-4">
                <Link to={"/"} onClick={() => isMobile && setOpenMobile(false)}>
                  <CrossfadeImage src={imgLogoColor} className="size-8"/>
                </Link>
                <div className="grow"/>
                <MagneticButton
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                >
                  <Swap swapped={resolvedTheme === "light"} animation="rotate">
                    <SwapOn><RiSunFill/></SwapOn>
                    <SwapOff><RiMoonFill/></SwapOff>
                  </Swap>
                  <span className="sr-only">{t("strings:settings.toggle_theme")}</span>
                </MagneticButton>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {
            data.map(group => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarMenu>
                  {
                    group.items.map(item => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.items ? (
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuAction className="data-[state=open]:rotate-90">
                                <RiArrowRightSLine />
                              </SidebarMenuAction>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="CollapsibleContent">
                              <SidebarMenuSub>
                                {item.items.map(subItem => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link to={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : null}
                      </SidebarMenuItem>
                    ))
                  }
                </SidebarMenu>
              </SidebarGroup>
            ))
          }
          <SidebarGroup/>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <div className="w-full flex flex-row items-center">
                      <Avatar>
                        <AvatarImage src={props.user?.profileUrl} />
                        <AvatarFallback>{props.user?.name?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-2 mr-4 grow overflow-hidden">
                        <div className="text-sm truncate">{props.user?.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{props.email}</div>
                      </div>
                      <RiArrowUpSLine/>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="end"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem onClick={() => navigate(ClientUserDestination.root)}><span>{t("strings:console.user_edit.label")}</span></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}><span>{t("strings:signout.label")}</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("strings:signout.dialog_title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("strings:signout.dialog_desc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>{t("strings:cancel")}</Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await props.signOut()
                } catch (e) {
                  toast.error(t("libs:unknown_error_occurred"), {icon: <RiErrorWarningFill size={18}/>})
                }
              }}
            >{t("strings:confirm")}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  )
}
