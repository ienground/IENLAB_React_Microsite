import RouteErrorScreen from "@/ui/shared/error/RouteErrorScreen.tsx"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import HomeScreen from "@/ui/public/home/HomeScreen.tsx"
import PublicLayout from "@/ui/shared/layout/PublicLayout.tsx"
import {createBrowserRouter} from "react-router"
import {HomeViewModel} from "@/ui/public/home/HomeViewModel.ts";
import {portfolioRepository} from "@/di/container.ts";
import type {TFunction} from "i18next"

export function getRouter(t: TFunction) {
  return createBrowserRouter([
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
        },
        {
          path: "*",
          element: <NotFoundScreen />
        }
      ]
    }
  ])
}