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
import {MotionButton} from "@/ui/components/MotionComponent.tsx";
import {RiArrowDownLine, RiArrowDownSLine} from "@remixicon/react";
import {useTranslation} from "react-i18next";


export function AppHeader() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 150);
  });

  const buttonProps = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

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
        <nav className="flex flex-row items-center">
          <MotionButton
            size="icon-lg"
            variant="ghost"
            variants={buttonProps}
            whileHover="hover"
            whileTap="tap"
          ><RiArrowDownSLine /></MotionButton>
          <MotionButton
            size="lg"
            variant="ghost"
            variants={buttonProps}
            whileHover="hover"
            whileTap="tap"
          >{t("strings:header.work")}</MotionButton>
          <MotionButton
            size="lg"
            variant="ghost"
            variants={buttonProps}
            whileHover="hover"
            whileTap="tap"
          >{t("strings:header.console")}</MotionButton>
        </nav>

        {/*<button onClick={toggleSidebar} className="mr-2">Toggle</button>*/}
        {/*<SidebarTrigger />*/}

        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={imgLogoTypo} alt="logo" className="h-8" />
        </div>
        <div className="flex flex-1"></div>
        <nav className="flex flex-row items-center">
          <MotionButton
            size="lg"
            variant="ghost"
            variants={buttonProps}
            whileHover="hover"
            whileTap="tap"
          >{t("strings:header.work")}</MotionButton>
          <MotionButton
            size="lg"
            variant="ghost"
            variants={buttonProps}
            whileHover="hover"
            whileTap="tap"
          >{t("strings:header.resume")}</MotionButton>
        </nav>
      </div>
    </motion.header>
  );
}