import {Route, Routes} from "react-router";
import RootScreen from "../screens/root/RootScreen.tsx";
import {RootDestination} from "../screens/root/RootDestination.ts";
import {IntroDestination} from "../screens/root/intro/IntroDestination.ts";
import IntroScreen from "../screens/root/intro/IntroScreen.tsx";
import {NoticeDestination} from "../screens/root/notice/NoticeDestination.ts";
import NoticeListScreen from "../screens/root/notice/list/NoticeListScreen.tsx";
import {BrandDestination} from "../screens/root/brand/BrandDestination.ts";
import BrandScreen from "../screens/root/brand/BrandScreen.tsx";
import {PrivacyDestination} from "../screens/root/privacy/PrivacyDestination.ts";
import PrivacyScreen from "../screens/root/privacy/my_service/PrivacyScreen.tsx";
import {EstimateDestination} from "../screens/root/estimate/EstimateDestination.ts";
import EstimateSearchScreen from "../screens/root/estimate/search/EstimateSearchScreen.tsx";
import EstimateDetailScreen from "../screens/root/estimate/detail/EstimateDetailScreen.tsx";
import {DevDestination} from "../screens/root/dev/DevDestination.ts";
import DevListScreen from "../screens/root/dev/list/DevListScreen.tsx";
import DevDetailScreen from "../screens/root/dev/detail/DevDetailScreen.tsx";
import NoticeDetailScreen from "../screens/root/notice/detail/NoticeDetailScreen.tsx";
import TestScreen from "../screens/root/test/TestScreen.tsx";

export default function RootRouter() {
  return (
    <Routes>
      <Route path={RootDestination.route} element={<RootScreen />} />

      <Route path={IntroDestination.route} element={<IntroScreen />} />

      <Route path={NoticeDestination.route} element={<NoticeListScreen />} />
      <Route path={NoticeDestination.routeDetail} element={<NoticeDetailScreen />} />

      <Route path={BrandDestination.route} element={<BrandScreen />} />
      <Route path={PrivacyDestination.route} element={<PrivacyScreen />} />

      <Route path={EstimateDestination.route} element={<EstimateSearchScreen />} />
      <Route path={EstimateDestination.routeDetail} element={<EstimateDetailScreen />} />

      <Route path={DevDestination.route} element={<DevListScreen />} />
      <Route path={DevDestination.routeDetail} element={<DevDetailScreen />} />

      <Route path={PrivacyDestination.route} element={<PrivacyScreen />} />

      <Route path={"/test"} element={<TestScreen />} />
    </Routes>
  );
}