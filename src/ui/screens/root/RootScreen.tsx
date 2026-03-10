import {ScrambleText, Typewriter} from "motion-plus/react";
import {RootLayout} from "@/ui/layout/RootLayout.tsx";

export default function RootScreen() {
  return (
    <RootLayout>
      <div className="flex flex-col">
        <div>Title</div>
        <div>Portfolio</div>
      </div>
    </RootLayout>
  );
}