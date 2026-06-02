import {type ElementType, useEffect, useMemo, useRef, useState} from "react"
import {CrossfadeImage, useTheme} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"

import imgLogoFull from "@/assets/brand/img_logo_full.png"
import imgLogoFullWhite from "@/assets/brand/img_logo_full_white.png"
import imgLogoShort from "@/assets/brand/img_logo_short.png"
import imgLogoShortWhite from "@/assets/brand/img_logo_short_white.png"
import LogoSolid from "@/assets/brand/logo_solid.svg?react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  RiArrowDownSLine,
  RiFileCodeFill, RiMenu2Fill,
  RiMenuUnfold4Line,
  RiMoonFill,
  RiPaletteFill,
  RiSunFill,
} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {AnimatePresence, motion, type Variants} from "motion/react"
import {cn} from "@/lib/utils.ts"
import {Link} from "react-router"
import {AboutDestination} from "@/ui/public/about/AboutDestination.ts"
import {BrandDestination} from "@/ui/public/brand/BrandDestination.ts"
import {ProjectDestination} from "@/ui/public/project/ProjectDestination.ts"
import {NoticeDestination} from "@/ui/public/notice/NoticeDestination.ts"
import {MagneticBaseButton, MagneticLink, MagneticButton} from "@/components/motion/components.tsx"

type NavLeaf = {
  icon: ElementType
  title: string
  url: string
  description?: string
}

type NavItem = {
  title: string
  url?: string
  items?: NavLeaf[]
}

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  const closeTimerRef = useRef<number | null>(null)

  const {resolvedTheme, setTheme} = useTheme()
  const {t, i18n} = useTranslation()

  const navItems: NavItem[] = useMemo(
    () => [
      {
        title: t("strings:about.label"),
        items: [
          {
            title: t('strings:about.ienground.label'),
            url: AboutDestination.root,
            description: t('strings:about.ienground.description'),
            icon: LogoSolid,
          },
          {
            title: t("strings:about.branding.label"),
            url: BrandDestination.root,
            description: t('strings:about.branding.desc'),
            icon: RiPaletteFill,
          },
          {
            title: t("strings:home.project.header"),
            url: ProjectDestination.root,
            description: t('strings:about.project.desc'),
            icon: RiFileCodeFill,
          },
        ],
      },
      {
        title: t("strings:notice.label"),
        url: NoticeDestination.root,
      },
      // {
      //   title: t("strings:console.label"),
      //   url: "#",
      // },
    ],
    [t],
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, {passive: true})

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }
  const scheduleClose = () => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setDirection(0)
      setActiveMenu(null)
    }, 120)
  }
  const contentVariants: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d ? d * 24 : 0,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d ? d * -24 : 0,
    }),
  }
  const handleHover = (title: string) => {
    clearCloseTimer()

    if (activeMenu !== null && activeMenu !== title) {
      const oldIdx = navItems.findIndex((n) => n.title === activeMenu)
      const newIdx = navItems.findIndex((n) => n.title === title)
      setDirection(newIdx > oldIdx ? 1 : -1)
    } else {
      setDirection(0)
    }

    setActiveMenu(title)
  }
  const handleLeave = () => scheduleClose()

  return (
    <header className="fixed inset-x-0 top-0 z-999 pointer-events-none">
      <div
        className={cn(
          "mx-auto pointer-events-auto transition-all duration-300 ease-in-out",
          scrolled
            ? "mt-3 h-16 w-[min(960px,calc(100%-24px))] rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] dark:border-white/10 dark:bg-white/5"
            : "mt-0 h-16 md:h-20 w-full rounded-none border-b border-white/10 bg-white/8 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] dark:border-white/10 dark:bg-white/5",
        )}
      >
        <div
          className={cn(
            "grid h-full grid-cols-[1fr_auto_1fr] items-center transition-all duration-300",
            scrolled ? "px-4" : "px-8",
          )}
        >
          <div className="flex min-w-0 items-center justify-self-start">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <MagneticButton
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-10 items-center justify-center rounded-full text-foreground/85 transition-all duration-300 md:hidden"
                  size="icon"
                  variant="ghost"
                >
                  {mobileMenuOpen ? <RiMenuUnfold4Line/> : <RiMenu2Fill/>}
                </MagneticButton>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-full border-white/10 bg-background/95 p-0 backdrop-blur-xl sm:max-w-none"
              >
                <div className={scrolled ? "h-23" : "h-28"}></div>
                <div className="flex h-full flex-col overflow-y-auto px-5 pb-6 pt-4">
                  <nav className="flex flex-col gap-2">
                    {navItems.map(item => item.items ? (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-border/60 bg-background/40"
                        >
                          <div className="px-4 py-3 text-sm font-medium text-foreground">
                            {item.title}
                          </div>

                          <div className="border-t border-border/60 px-2 py-2">
                            {item.items.map(subItem => {
                              const Icon = subItem.icon
                              return <SheetClose asChild key={subItem.title}>
                                <Link
                                  to={subItem.url}
                                  className="flex items-center justify-between gap-3 rounded-xl p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                  <div className="min-w-0">
                                    <div className="text-sm font-medium text-foreground">
                                      {subItem.title}
                                    </div>
                                    {subItem.description ? (
                                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    ) : null}
                                  </div>
                                  <Icon className="shrink-0 size-6"/>
                                </Link>
                              </SheetClose>
                            })}
                          </div>
                        </div>
                      ) : (<SheetClose asChild key={item.title}>
                        <Link
                          to={item.url ? item.url : ""}
                          className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >{item.title}</Link>
                      </SheetClose>)
                    )}
                  </nav>

                  <div className="mt-6 border-t border-border/60 pt-6">
                    <Button
                      type="button"
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center rounded-full",
                        "border border-black/10 bg-white/10 px-4 text-sm",
                        "text-foreground/85 transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "dark:border-white/10 dark:bg-white/5"
                      )}
                      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                    >
                      <AnimatePresence mode="popLayout">
                        {resolvedTheme === "light" ? (
                          <motion.div
                            key="theme-light"
                            className="w-full flex flex-row items-center justify-center gap-x-2"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                          >
                            <RiSunFill/>
                            <span>{t("strings:settings.light_mode")}</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="theme-dark"
                            className="w-full flex flex-row items-center justify-center gap-x-2"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                          >
                            <RiMoonFill/>
                            <span>{t("strings:settings.dark_mode")}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div
              className="relative hidden md:flex"
              onMouseEnter={clearCloseTimer}
              onMouseLeave={handleLeave}
            >
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => item.items && handleHover(item.title)}
                  >
                    {item.items ? (
                      <MagneticBaseButton
                        type="button"
                        onFocus={() => handleHover(item.title)}
                        className={cn(
                          "relative inline-flex items-center rounded-full bg-transparent text-foreground/75 transition-all duration-300",
                          "hover:bg-white/10 hover:text-foreground dark:hover:bg-white/10",
                          activeMenu === item.title && "text-foreground",
                          scrolled ? "h-9 px-3 text-sm" : "h-10 px-3 text-sm",
                        )}
                      >
                        {activeMenu === item.title && (
                          <motion.div
                            layoutId="header-nav-indicator"
                            className="absolute inset-0 rounded-full bg-white/10"
                            transition={{type: "spring", stiffness: 500, damping: 35}}
                          />
                        )}

                        <span className="relative z-1 inline-flex items-center">
                          {item.title}
                          <motion.span
                            className="ml-1"
                            animate={{rotate: activeMenu === item.title ? 180 : 0}}
                            transition={{type: "spring", stiffness: 500, damping: 30}}
                          >
                            <RiArrowDownSLine className="size-4"/>
                          </motion.span>
                        </span>
                      </MagneticBaseButton>
                    ) : (
                      <MagneticLink
                        to={item.url ? item.url : ""}
                        className={cn(
                          "inline-flex items-center rounded-full text-foreground/75 transition-all duration-300 hover:bg-white/10 hover:text-foreground focus:bg-white/10 focus:text-foreground dark:hover:bg-white/10",
                          scrolled ? "h-9 px-3 text-sm" : "h-10 px-3 text-sm",
                        )}
                      >
                        {item.title}
                      </MagneticLink>
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {activeMenu && (
                  <motion.div
                    key="panel"
                    initial={{opacity: 0, y: -8}}
                    animate={{
                      opacity: 1,
                      y: 8,
                      transition: {type: "spring", stiffness: 500, damping: 35},
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      transition: {duration: 0.15, ease: "easeOut"},
                    }}
                    className="absolute left-0 top-[calc(100%+8px)] z-50"
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={handleLeave}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-3xl border p-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)]",
                        "border-white/20 bg-white/92 dark:border-white/10 dark:bg-zinc-900/92",
                      )}
                    >
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.ul
                          key={activeMenu}
                          custom={direction}
                          variants={contentVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{type: "spring", stiffness: 300, damping: 30}}
                          className="grid w-90 gap-2"
                        >
                          {navItems
                            .find((item) => item.title === activeMenu)
                            ?.items?.map((subItem, i) => {
                              const Icon = subItem.icon

                              return (
                                <motion.li
                                  key={subItem.title}
                                  initial={{opacity: 0, y: direction ? 0 : 8}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                    delay: i * 0.04,
                                  }}
                                >
                                  <Link
                                    to={subItem.url}
                                    className="flex flex-row items-center justify-between rounded-2xl p-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                  >
                                    <div className="flex min-w-0 flex-col items-start">
                                      <div className="text-sm font-medium leading-none text-foreground">
                                        {subItem.title}
                                      </div>
                                      {subItem.description ? (
                                        <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      ) : null}
                                    </div>

                                    <div className="flex size-10 shrink-0 items-center justify-center">
                                      <Icon className="size-6"/>
                                    </div>
                                  </Link>
                                </motion.li>
                              )
                            })}
                        </motion.ul>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <MagneticLink
            to="/"
            className="justify-self-center transition-all duration-300"
            aria-label="Home"
          >
            <CrossfadeImage
              src={resolvedTheme === "dark" ? imgLogoShortWhite : imgLogoShort}
              alt="Logo"
              className={cn(
                "block object-contain transition-all duration-300 md:hidden h-12"
              )}
            />

            <CrossfadeImage
              src={resolvedTheme === "dark" ? imgLogoFullWhite : imgLogoFull}
              alt="Logo"
              className={cn(
                "hidden object-contain transition-all duration-300 md:block h-8",
              )}
            />
          </MagneticLink>

          <div className="flex min-w-0 items-center justify-self-end">
            <div
              className={cn(
                "flex items-center transition-all duration-300",
                scrolled ? "gap-2" : "gap-3",
              )}
            >
              <MagneticButton
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "hidden rounded-full border text-foreground/85 shadow-none transition-all duration-300 hover:bg-white/15 hover:text-foreground md:inline-flex md:items-center md:justify-center dark:hover:bg-white/10",
                  scrolled
                    ? "border-white/15 bg-white/10 px-3 py-1.5 text-sm dark:border-white/10 dark:bg-white/5"
                    : "border-white/15 bg-white/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5",
                )}
                onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              >
                <AnimatePresence mode="popLayout">
                  {resolvedTheme === "light" ? (
                    <motion.div
                      key="theme-light"
                      initial={{opacity: 0, width: 0}}
                      animate={{opacity: 1, width: 16}}
                      exit={{opacity: 0, width: 0}}
                    ><RiSunFill/></motion.div>
                  ) : (
                    <motion.div
                      key="theme-dark"
                      initial={{opacity: 0, width: 0}}
                      animate={{opacity: 1, width: 16}}
                      exit={{opacity: 0, width: 0}}
                    ><RiMoonFill/></motion.div>
                  )}
                </AnimatePresence>

                <span className="sr-only">{t("strings:settings.toggle_theme")}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}