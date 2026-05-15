import {Outlet} from "react-router";

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      {/*public header*/}
      <main>
        <Outlet />
      </main>
      {/*public footer*/}
    </div>
  )
}