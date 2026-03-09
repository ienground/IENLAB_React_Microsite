import {ScrambleText, Typewriter} from "motion-plus/react";
import {RootLayout} from "@/ui/layout/RootLayout.tsx";

export default function RootScreen() {
  return (
    <RootLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">홈</h1>
        <p className="text-muted-foreground">본문 내용입니다.</p>
      </div>
    </RootLayout>
  );
}