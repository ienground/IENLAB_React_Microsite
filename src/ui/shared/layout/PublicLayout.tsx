import {Outlet} from "react-router";
import PublicHeader from "@/components/custom/PublicHeader.tsx";
import PublicFooter from "@/components/custom/PublicFooter.tsx";

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      <PublicFooter />
      {/*public footer*/}
    </div>
  );
}