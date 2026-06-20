import RouteErrorScreen from "@/ui/shared/error/RouteErrorScreen.tsx"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import HomeScreen from "@/ui/public/home/HomeScreen.tsx"
import PublicLayout from "@/ui/shared/layout/PublicLayout.tsx"
import {createBrowserRouter, type LoaderFunctionArgs, Outlet} from "react-router"
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
import {AuthSessionViewModel} from "../shared/auth/useAuthSession"
import AuthSessionInitializer from "@/ui/shared/auth/AuthSessionInitializer.tsx"
import {outsourceRepository, userRepository} from "@/di/container.ts"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"
import LoginScreen from "@/ui/public/login/LoginScreen.tsx"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {ClientUserDestination} from "@/ui/client/user/ClientUserDestination.ts"
import ClientUserScreen from "@/ui/client/user/ClientUserScreen.tsx"
import OutsourceListScreen from "@/ui/client/outsource/list/OutsourceListScreen.tsx"
import OutsourceDetailScreen from "@/ui/client/outsource/detail/OutsourceDetailScreen.tsx"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {type AppMatch, Localized} from "@ienlab/react-library"
import OutsourceLogListScreen from "@/ui/client/outsource/log/list/OutsourceLogListScreen.tsx"
import OutsourceRequestListScreen from "@/ui/client/outsource/request/list/OutsourceRequestListScreen.tsx"
import OutsourceRequestEditScreen from "@/ui/client/outsource/request/edit/OutsourceRequestEditScreen.tsx"
import OutsourceRevisionListScreen from "@/ui/client/outsource/revision/list/OutsourceRevisionListScreen.tsx"
import OutsourceRevisionDetailScreen from "@/ui/client/outsource/revision/detail/OutsourceRevisionDetailScreen.tsx"
import OutsourceLogDetailScreen from "@/ui/client/outsource/log/detail/OutsourceLogDetailScreen.tsx"
import OutsourceRevisionEditScreen from "@/ui/client/outsource/revision/edit/OutsourceRevisionEditScreen.tsx"
import {GuestRoute} from "@/ui/router/GuestRoute.tsx"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import SignupScreen from "@/ui/public/signup/SignupScreen.tsx"

export function getRouter(t: TFunction) {
  const outsourceLoader = async ({params}: LoaderFunctionArgs) => {
    if (!params.itemId) {
      throw new Error("itemId is required")
    }
    return await outsourceRepository.get(params.itemId)
  }

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
              element: <GuestRoute />,
              children: [
                {
                  path: LoginDestination.root,
                  element: <LoginScreen />
                },
                {
                  path: SignupDestination.root,
                  element: <SignupScreen />
                },
              ]
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
            },
            {
              path: ClientUserDestination.root,
              element: <ClientUserScreen />,
              handle: [
                { title: t("strings:outsource_manage.user.edit"), path: ClientUserDestination.root },
              ],
            },
            {
              path: ClientOutsourceDestination.root,
              element: <OutsourceListScreen />,
              handle: [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root }
              ]
            },
            {
              path: ClientOutsourceDestination.detail,
              element: <OutsourceDetailScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: "" },
              ],
            },

            {
              path: ClientOutsourceDestination.request.list,
              element: <OutsourceRequestListScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.info_request.label"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.request.edit,
              element: <OutsourceRequestEditScreen mode="edit" />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.info_request.label"), path: ClientOutsourceDestination.path.request.list(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.info_request.edit"), path: "" }
              ]
            },
            {
              path: ClientOutsourceDestination.revision.list,
              element: <OutsourceRevisionListScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.revision_request.label"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.revision.new,
              element: <OutsourceRevisionEditScreen mode="create" />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.revision_request.label"), path: "" },
                { title: t("strings:outsource_manage.outsource.revision_request.new"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.revision.detail,
              element: <OutsourceRevisionDetailScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.revision_request.label"), path: "" },
                { title: t("strings:outsource_manage.outsource.revision_request.detail"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.revision.edit,
              element: <OutsourceRevisionEditScreen mode="edit" />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.revision_request.label"), path: "" },
                { title: t("strings:outsource_manage.outsource.revision_request.edit"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.log.list,
              element: <OutsourceLogListScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.work_logs.label"), path: "" }
              ],
            },
            {
              path: ClientOutsourceDestination.log.detail,
              element: <OutsourceLogDetailScreen />,
              loader: outsourceLoader,
              handle: (match: AppMatch<Outsource>) => [
                { title: t("strings:outsource_manage.outsource.label"), path: ClientOutsourceDestination.root },
                { title: match.loaderData?.title ? Localized.get(match.loaderData.title) : match.params.itemId, path: ClientOutsourceDestination.path.detail(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.work_logs.label"), path: ClientOutsourceDestination.path.log.list(match.params.itemId ?? "") },
                { title: t("strings:outsource_manage.outsource.work_logs.detail"), path: "" },
              ],
            },
          ]
        }
      ]
    }
  ])
}