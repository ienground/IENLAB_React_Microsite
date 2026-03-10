import {createBrowserRouter} from "react-router";
import Error404Screen from "@/ui/screens/error/Error404Screen.tsx";
import {RootDestination} from "@/ui/screens/root/RootDestination.ts";
import RootScreen from "@/ui/screens/root/RootScreen.tsx";
import {MyDestination} from "@/ui/screens/root/my/MyDestination.ts";
import MyScreen from "@/ui/screens/root/my/MyScreen.tsx";
import {NoticeDestination} from "@/ui/screens/root/notice/NoticeDestination.ts";
import NoticeScreen from "@/ui/screens/root/notice/NoticeScreen.tsx";
import {PrivacyDestination} from "@/ui/screens/root/privacy/PrivacyDestination.ts";
import PrivacyScreen from "@/ui/screens/root/privacy/PrivacyScreen.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404Screen />,
    children: [
      {
        path: RootDestination.route,
        element: <RootScreen />
      },
      {
        path: MyDestination.route,
        element: <MyScreen />
      },
      {
        path: NoticeDestination.route,
        element: <NoticeScreen />
      },
      {
        path: PrivacyDestination.route,
        element: <PrivacyScreen />
      }
    ]
  }
])