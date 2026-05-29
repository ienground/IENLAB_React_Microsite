import {Outlet} from "react-router"
import PublicHeader from "@/components/custom/PublicHeader.tsx"
import PublicFooter from "@/components/custom/PublicFooter.tsx"

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="pt-16 md:pt-24 grow">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}