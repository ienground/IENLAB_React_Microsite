import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import imgLogoTypo from "@/assets/brand/img_logo_typo.png";
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import {useState} from "react";

export function AppHeader() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { toggleSidebar } = useSidebar();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 150);
  });

  return (
    <motion.header
      className="w-full flex items-center bg-blue-500 fixed h-16"
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
    >
      <div
        className="flex flex-row items-center max-w-360 w-full h-full mx-auto bg-red-500"
      >
        {/*<button onClick={toggleSidebar} className="mr-2">Toggle</button>*/}
        {/*<SidebarTrigger />*/}
        <nav></nav>
        <div className="flex-1 flex justify-center my-auto">
          <img src={imgLogoTypo} alt="logo" className="h-8" />
        </div>
        <nav></nav>
      </div>
    </motion.header>
  );
}