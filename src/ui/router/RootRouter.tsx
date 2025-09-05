import {Route, Routes} from "react-router";
import RootScreen from "../screens/root/RootScreen.tsx";
import {RootDestination} from "../screens/root/RootDestination.ts";
import {IntroDestination} from "../screens/root/intro/IntroDestination.ts";
import IntroScreen from "../screens/root/intro/IntroScreen.tsx";
import {NoticeDestination} from "../screens/root/notice/NoticeDestination.ts";
import NoticeScreen from "../screens/root/notice/NoticeScreen.tsx";
import {BrandDestination} from "../screens/root/brand/BrandDestination.ts";
import BrandScreen from "../screens/root/brand/BrandScreen.tsx";

export default function RootRouter() {
  return (
    <Routes>
      <Route path={RootDestination.route} element={<RootScreen />} />

      <Route path={IntroDestination.route} element={<IntroScreen />} />
      <Route path={NoticeDestination.route} element={<NoticeScreen />} />
      <Route path={BrandDestination.route} element={<BrandScreen />} />
    </Routes>
  );
}