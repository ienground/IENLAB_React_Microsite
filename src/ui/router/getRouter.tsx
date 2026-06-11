import RouteErrorScreen from "@/ui/shared/error/RouteErrorScreen.tsx"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import HomeScreen from "@/ui/public/home/HomeScreen.tsx"
import PublicLayout from "@/ui/shared/layout/PublicLayout.tsx"
import {createBrowserRouter, Outlet} from "react-router"
import type {TFunction} from "i18next"
import {AboutDestination} from "@/ui/public/about/AboutDestination.ts"
import AboutScreen from "@/ui/public/about/AboutScreen.tsx"
import {BrandDestination} from "@/ui/public/brand/BrandDestination.ts"
import BrandScreen from "@/ui/public/brand/BrandScreen.tsx"
import {NoticeDestination} from "@/ui/public/notice/NoticeDestination.ts"
import NoticeListScreen from "@/ui/public/notice/list/NoticeListScreen.tsx"
import NoticeDetailScreen from "@/ui/public/notice/detail/NoticeDetailScreen.tsx"
import {ProjectDestination} from "@/ui/public/project/ProjectDestination.ts"
import ProjectListScreen from "@/ui/public/project/list/ProjectListScreen.tsx"
import ProjectDetailScreen from "@/ui/public/project/detail/ProjectDetailScreen.tsx"
import {PrivacyDestination} from "@/ui/public/privacy/PrivacyDestination.ts"
import PrivacyScreen from "@/ui/public/privacy/PrivacyScreen.tsx"
import {ClientProtectedRoute} from "@/ui/router/ClientProtectedRoute.tsx"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import { AuthSessionViewModel } from "../shared/auth/useAuthSession"
import AuthSessionInitializer from "@/ui/shared/auth/AuthSessionInitializer.tsx"
import {userRepository} from "@/di/container.ts"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"
import LoginScreen from "@/ui/public/login/LoginScreen.tsx"

export function getRouter(t: TFunction) {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthSessionViewModel.Provider userRepository={userRepository}>
          <AuthSessionInitializer />
          <Outlet />
        </AuthSessionViewModel.Provider>
      ),
      errorElement: <RouteErrorScreen />,
      children: [
        {
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: <HomeScreen />
            },
            {
              path: AboutDestination.root,
              element: <AboutScreen />
            },
            {
              path: BrandDestination.root,
              element: <BrandScreen />
            },
            {
              path: NoticeDestination.root,
              element: <NoticeListScreen />
            },
            {
              path: NoticeDestination.detail,
              element: <NoticeDetailScreen />
            },
            {
              path: PrivacyDestination.root,
              element: <PrivacyScreen />
            },
            {
              path: ProjectDestination.root,
              element: <ProjectListScreen />
            },
            {
              path: ProjectDestination.detail,
              element: <ProjectDetailScreen />
            },
            {
              path: LoginDestination.root,
              element: <LoginScreen />
            },
            {
              path: "*",
              element: <NotFoundScreen />
            }
          ]
        },
        {
          element: <ClientProtectedRoute />,
          children: [
            {
              path: ClientHomeDestination.root,
              element: <></>
            }
          ]
        }
      ]
    }
  ])
}