import RouteErrorScreen from "@/ui/shared/error/RouteErrorScreen.tsx"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import HomeScreen from "@/ui/public/home/HomeScreen.tsx"
import PublicLayout from "@/ui/shared/layout/PublicLayout.tsx"
import {createBrowserRouter} from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorScreen />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <HomeScreen />
          }
        ]
      },
      {
        path: "",
        element: <></>,
        children: [

        ]
      },
      {
        path: "*",
        element: <NotFoundScreen />
      }
    ]
  }
])