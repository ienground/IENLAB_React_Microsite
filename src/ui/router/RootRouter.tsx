import {createBrowserRouter} from "react-router";
import Error404Screen from "@/ui/screens/error/Error404Screen.tsx";
import {RootDestination} from "@/ui/screens/root/RootDestination.ts";
import RootScreen from "@/ui/screens/root/RootScreen.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404Screen />,
    children: [
      {
        path: RootDestination.route,
        element: <RootScreen />
      }
    ]
  }
])