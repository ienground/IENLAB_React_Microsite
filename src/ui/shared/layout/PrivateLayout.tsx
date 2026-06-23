import {Outlet} from "react-router"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {useState} from "react"
import {SidebarProvider} from "@/components/ui/sidebar.tsx"
import {AppSidebar} from "@/components/custom/private/AppSidebar.tsx"
import AppHeader from "@/components/custom/private/AppHeader.tsx"

export default function PrivateLayout() {
  const [open, setOpen] = useState(true)
  const user = AuthSessionViewModel.use.user()
  const fbUser = AuthSessionViewModel.use.fbUser()
  const signOut = AuthSessionViewModel.use.signOut()

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar user={user} email={fbUser?.email ?? ""} signOut={signOut} />
      <main className="flex h-screen w-full flex-col overflow-x-hidden">
        <AppHeader />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
