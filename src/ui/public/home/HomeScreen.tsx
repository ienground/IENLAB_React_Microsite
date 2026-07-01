import {Ticker, Typewriter, useCarousel} from "motion-plus/react"
import {AnimatePresence, motion, MotionConfig, useMotionValue, useScroll, useSpring, useTransform} from "motion/react"
import {CrossfadeImage, formatBaseDateTime, Localized, Seo, useTheme} from "@ienlab/react-library"
import {Trans, useTranslation} from "react-i18next"
import * as React from "react"
import {useEffect, useMemo, useRef, useState} from "react"
import {
  RiArrowDropDownLine,
  RiArrowRightUpLine,
  RiCloseLargeFill,
  RiGithubFill,
  RiPagesFill,
  RiPauseMiniFill,
  RiPlayFill
} from "@remixicon/react"
import {splitText} from "motion-plus"
import {animate, delay, stagger, wrap} from "motion"
import {cn} from "@/lib/utils.ts"
import {HomeViewModel, type PortfolioInfoStateList} from "@/ui/public/home/HomeViewModel.ts"
import {Portfolio} from "@/domain/model/Portfolio.ts"
import {Badge} from "@/components/ui/badge.tsx"
import {Button} from "@/components/ui/button.tsx"
import IcAppStore from "@/assets/icon/app_store.svg?react"
import IcGooglePlay from "@/assets/icon/google_play.svg?react"
import {useNavigate} from "react-router"
import {Field, FieldDescription, FieldTitle} from "@/components/ui/field"
import ImgProfile from "@/assets/image/ienground_profile_2024.jpg"
import ImgFront01 from "@/assets/image/front_01.png"
import ImgFront02 from "@/assets/image/front_02.png"
import ImgFront03 from "@/assets/image/front_03.png"
import ImgFrontMobile01 from "@/assets/image/front_mobile_01.png"
import ImgFrontMobile02 from "@/assets/image/front_mobile_02.png"
import ImgFrontMobile03 from "@/assets/image/front_mobile_03.png"
import ImgFrontForward from "@/assets/image/front_forward.png"
import ImgFrontForwardMobile from "@/assets/image/front_forward_mobile.png"
import ImgMobileGraphic from "@/assets/image/img_mobile_graphic.png"
import ImgIllustGraphic from "@/assets/image/img_illust_graphic.png"
import ImgWebGraphic from "@/assets/image/img_web_graphic.png"
import ImgFirebaseGraphic from "@/assets/image/img_firebase_graphic.png"
import ImgProfileSample01 from "@/assets/image/img_profile_sample_01.png"
import ImgProfileSample02 from "@/assets/image/img_profile_sample_02.png"
import ImgProfileSample03 from "@/assets/image/img_profile_sample_03.png"
import ImgProfileSample04 from "@/assets/image/img_profile_sample_04.png"
import ImgProfileSample05 from "@/assets/image/img_profile_sample_05.png"
import ImgProfileSample06 from "@/assets/image/img_profile_sample_06.png"
import ImgProfileSample07 from "@/assets/image/img_profile_sample_07.png"
import ImgProfileSample08 from "@/assets/image/img_profile_sample_08.png"
import ImgProfileSample09 from "@/assets/image/img_profile_sample_09.png"
import ImgProfileSample10 from "@/assets/image/img_profile_sample_10.png"
import ImgProfileSample11 from "@/assets/image/img_profile_sample_11.png"
import ImgProfileSample12 from "@/assets/image/img_profile_sample_12.png"
import ImgBgColor from "@/assets/brand/img_background_color.png"
import ImgBgDark from "@/assets/brand/img_background_dark.png"
import {Separator} from "@/components/ui/separator.tsx"
import {AboutDestination} from "@/ui/public/about/AboutDestination.ts"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {getAppStoreLink, getGooglePlayLink} from "@/ui/utils/LinkHelper.ts"
import {MagneticButton} from "@/components/motion/components.tsx"
import {PortfolioX} from "@/domain/model/PortfolioX.tsx"
import {useIsMobile} from "@/hooks/use-mobile.ts"

type CarouselItem = {
  id: string
  title: string
  image: string
  url?: string
}

type SkillItem = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
}

type ServiceItem = {}

type ReviewItem = {
  name: string
  star: number
  review: string
}

const sampleProfiles = [
  ImgProfileSample01,
  ImgProfileSample02,
  ImgProfileSample03,
  ImgProfileSample04,
  ImgProfileSample05,
  ImgProfileSample06,
  ImgProfileSample07,
  ImgProfileSample08,
  ImgProfileSample09,
  ImgProfileSample10,
  ImgProfileSample11,
  ImgProfileSample12,
]

export default function HomeScreen() {
  const {t} = useTranslation()
  return (
    <HomeViewModel.Provider>
      <Seo
        title={t("strings:app_name")}
        description={t("strings:og.description")}
      />
      <ScreenBody/>
    </HomeViewModel.Provider>
  )
}

function ScreenBody() {
  const {t, i18n} = useTranslation()
  const {resolvedTheme} = useTheme()
  const isMobile = useIsMobile()
  const init = HomeViewModel.use.init()
  const portfolioInfoStateList = HomeViewModel.use.portfolioInfoStateList()
  const navigate = useNavigate()
  const {scrollY} = useScroll()
  const heroFloatProgress = useSpring(useTransform(scrollY, [0, 120], [0, 1]), {
    stiffness: 180,
    damping: 28,
    mass: 0.35,
  })
  const heroPaddingX = useTransform(heroFloatProgress, [0, 1], ["0px", isMobile ? "16px" : "32px"])
  const heroPaddingY = useTransform(heroFloatProgress, [0, 1], ["0px", isMobile ? "16px" : "24px"])
  const heroRadius = useTransform(heroFloatProgress, [0, 1], ["0px", isMobile ? "28px" : "36px"])
  const heroShadow = useTransform(
    heroFloatProgress,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 24px 80px rgba(0,0,0,0.20)"]
  )

  useEffect(() => {
    init()
  }, [])

  // Section 1. Carousel
  const carouselItems: CarouselItem[] = useMemo(() => [
    {
      id: "one",
      title: "One",
      image: resolvedTheme === "light" ? ImgBgColor : ImgBgDark,
      url: "",
    },
  ], [t, resolvedTheme])

  // Section 2. About
  const splitTextContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!splitTextContainerRef.current) return
      splitTextContainerRef.current.style.visibility = "visible"

      const {words} = splitText(splitTextContainerRef.current.querySelector("h1"))

      animate(
        words,
        {opacity: [0, 1], y: [10, 0]},
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      )
    })
  }, [])

  // Section 3. Project

  // Section 4. Skills
  const skillsHorizontalScrollContainerRef = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress} = useScroll({
    target: skillsHorizontalScrollContainerRef,
    offset: ["start start", "end end"]
  })
  const skillsX = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-64%" : "-48%"])
  const skillItems: SkillItem[] = [
    {
      id: "mobile",
      title: t('strings:home.skills.mobile.label'),
      description: t('strings:home.skills.mobile.desc'),
      tags: ["Kotlin", "Compose Multiplatform", "Android", "iOS"],
      image: ImgMobileGraphic
    },
    {
      id: "web",
      title: t('strings:home.skills.frontend.title'),
      description: t("strings:home.skills.frontend.desc"),
      tags: ["React", "Typescript", "Motion+", "shadcn.io"],
      image: ImgWebGraphic
    },
    {
      id: "design",
      title: t('strings:home.skills.design.label'),
      description: t('strings:home.skills.design.desc'),
      tags: ["Photoshop", "Illustrator", "Stitch", "Figma"],
      image: ImgIllustGraphic
    },
    {
      id: "firebase",
      title: t('strings:home.skills.firebase.label'),
      description: t('strings:home.skills.firebase.desc'),
      tags: ["Authentication", "Firestore", "Storage", "Cloud Messaging", "Hosting"],
      image: ImgFirebaseGraphic
    },
  ]

  // Section 5. Services
  const [activeService, setActiveService] = useState<number | null>(null)
  const services: Service[] = [
    {name: "Branding"},
    {name: "Web Design"},
    {name: "Marketing"},
    {name: "UI/UX Design"},
    {name: "Development"},
    {name: "Motion Design"},
  ]

  // Section 6. Feedback
  const [index, setIndex] = useState(0)
  const roleTexts = [t('strings:home.intro.mobile_dev'), t('strings:home.intro.web_dev'), t('strings:home.intro.designer')]
  const isNameFirst = i18n.resolvedLanguage === "en"
  const reviews: ReviewItem[] = [
    {name: "도*****", review: "친절하게 상담해주시고 꼼꼼하게 작업해주십니다.", star: 5},
    {
      name: "드*****",
      review: "제가 생각했던 앱을 그대로 실현시켜서 만들어주셨습니다. 매우 빠르셔서 기한보다 더 빨리 완성이 되었으며, 답장도 빠르게 해주셔서 소통도 정말 잘되었고 너무 만족합니다. 앞으로 앱 만들 일 있으면 계속 부탁드릴 예정입니다.",
      star: 5
    },
    {
      name: "전*****",
      review: "막연하고 어려운 아이디어를 다른 분들보다 합리적인 가격에 제공해주셔서 정말 감사했습니다 ㅠㅠ  API 연결이 어려워 문의드렸는데, 데이터 통신 하셔서 바로 해결해주시는 모습 보면서 정말 놀랐습니다. 그리고 무엇보다도 이러한 극악조건 속에서도 작업속도가 5일 밖에 안걸리시는 유능한 개발자십니다!!",
      star: 5
    },
    {
      name: "날*****",
      review: "합리적인 가격으로 빠른 시간 내에 좋은 결과물을 얻었습니다. 늦은 시간까지 작업하시고, 소통이 잘 이뤄져서 좋았습니다. 다음에도 작업 맡길 수 있을 것 같습니다! 감사합니다.",
      star: 5
    },
    {
      name: "리*****", review: "최고에요~~!!^^ 개발자님 천재이시고 인품도 최고세요. 열정적으로 정말 책임감있게 작업해주세요!!! \n" +
        "다음에도 또 작업 부탁드리고 싶어요", star: 5
    },
    {name: "Ins*****", review: "원했던대로 잘만들어졌네요. 고급스러움보단 심플함", star: 5},
    {name: "태*****", review: "요청드린대로 구현해주셨습니다~ 수정 사항이나 변경도 상황에 맞게 잘 설명해주셔서 좋은 작업물 받아볼 수 있었습니다!", star: 5},
    {name: "달*****", review: "고생 많으셨습니다.", star: 5},
  ]

  return (
    <div
      className="w-full flex flex-col items-center overflow-x-clip"
    >
      <motion.section
        className="w-full"
        style={{
          paddingInline: heroPaddingX,
          paddingBlock: heroPaddingY,
        }}
      >
        <motion.div
          key="extra-layered-slide"
          className={cn(
            "w-full overflow-hidden border border-border bg-muted flex flex-col",
            "md:relative md:h-auto md:aspect-video xl:aspect-21/9 md:block"
          )}
          style={{
            borderRadius: heroRadius,
            boxShadow: heroShadow,
          }}
        >
          <div className={cn(
            "w-full h-[60svh]",
            "md:h-full"
          )}>
            <LayeredSlides />
          </div>

          <h2
            className={cn(
              "flex flex-col items-start p-6 text-4xl font-medium leading-[0.96] tracking-tighter",
              "sm:p-8",
              "lg:text-5xl",
              "xl:text-6xl",
              "md:absolute md:left-2/5 md:top-1/2 md:-translate-1/2 md:px-0",
            )}
          >
            <span>{t('strings:home.intro.hello')}</span>

            {isNameFirst && <span className="mt-4">{t('strings:home.intro.ienground')}</span>}
            <div className="relative">
              <span className="invisible block">{roleTexts.reduce((a, b) => (a.length > b.length ? a : b))} ㅤ</span>
              <Typewriter
                as="div"
                className="absolute inset-0"
                cursorStyle={{
                  background: "var(--cursor-text)",
                  width: "4px",
                  borderRadius: "10px"
                }}
                onComplete={() => {
                  delay(() => setIndex(wrap(0, roleTexts.length, index + 1)), 1)
                }}
              >{roleTexts[index]}</Typewriter>
            </div>

            {!isNameFirst && <span className="mt-4">{t('strings:home.intro.ienground')}</span>}
          </h2>
        </motion.div>
      </motion.section>
      <section className="w-full px-4 py-8 sm:px-6 md:px-8 md:py-10 xl:py-12">
        <div className="w-full">
          <div className="site-grid">
            <aside className="col-span-12 xl:col-span-2">
              <SectionHeader index={1} label={t("strings:home.about.header")}/>
            </aside>

            <div className="col-span-12 xl:col-span-10" ref={splitTextContainerRef}>
              <h1
                className="max-w-400 large-text-title"
              >{t("strings:home.about.leading_message")}</h1>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-y-6 xl:mt-10 xl:gap-x-6">
            <div className="col-span-12 xl:col-span-4">
              <div className="w-full max-w-90">
                <div className="aspect-3/4 overflow-hidden rounded-4xl">
                  <CrossfadeImage
                    src={ImgProfile}
                    alt={t("strings:home.about.name")}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 space-y-0.5">
                  <p
                    className="text-[18px] font-bold tracking-normal md:text-[24px]">{t("strings:home.about.name")}</p>
                  <p className="text-[16px] tracking-normal text-foreground/75">©2024</p>
                </div>
              </div>
            </div>

            <div className={cn(
              "col-span-12 flex flex-col gap-y-4",
              "xl:col-span-8"
            )}>
              <div className={cn(
                "flex flex-col gap-y-4",
                "xl:flex-row xl:gap-x-4"
              )}>
                <div className="col-span-12 xl:grow">
                  <div className="max-w-130">
                    <p className="text-[22px] leading-[1.3] tracking-tighter md:text-[28px] xl:text-[30px] font-flowerisland"><Trans
                      i18nKey="strings:home.about.p1" components={{br: <br/>}}/></p>
                  </div>
                </div>
                <Separator className="xl:hidden"/>
                <Separator className="max-xl:hidden" orientation="vertical"/>
                <div className="col-span-12 xl:grow">
                  <div className="max-w-130">
                    <p className="text-[22px] leading-[1.3] tracking-tighter md:text-[28px] xl:text-[30px] font-flowerisland"><Trans
                      i18nKey="strings:home.about.p2" components={{br: <br/>}}/></p>
                  </div>
                </div>
              </div>
              <MagneticButton
                className="mt-6 w-fit font-medium"
                variant="outline"
                onClick={() => navigate(AboutDestination.root)}
              >
                {t("strings:home.about.see_more")}
                <RiArrowRightUpLine/>
              </MagneticButton>
            </div>
          </div>

        </div>
      </section>
      <section className="flex w-full flex-col gap-y-5 px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <SectionHeader index={2} label={t("strings:home.project.header")}/>
        <PortfolioSection infoStateList={portfolioInfoStateList}/>
      </section>
      <section className="w-full px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <SectionHeader index={3} label={t("strings:home.skills.header")}/>
        <div ref={skillsHorizontalScrollContainerRef} className="h-[220vh]">
          <div className="sticky top-0 flex h-screen items-center">
            <motion.div style={{x: skillsX}} className="flex gap-4 md:gap-6 xl:gap-8">
              {skillItems.map((item, index) => (
                <SkillCardItem index={index} item={item}/>
              ))}
              <div
                className="relative flex min-w-60 w-[20vw] h-[calc(100vh-32px)] shrink-0 rounded-4xl overflow-hidden"/>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col gap-y-5 px-4 py-8 sm:px-6 md:px-8 md:py-10 xl:py-12">
        <SectionHeader index={4} label={t("strings:home.feedback.header")}/>
        <div>
          <Ticker
            align="stretch"
            className="home-review-ticker"
            hoverFactor={0}
            overflow
            gap={16}
            items={reviews.map((item, index) => (
              <ReviewCardItem index={index} item={item}/>
            ))}
          />
        </div>
      </section>
    </div>
  )
}

interface Service {
  name: string
}

function ScrollHighlightItem({service, index, isHighlighted, onHighlight}: {
  service: Service,
  index: number,
  isHighlighted: boolean,
  onHighlight: (index: number) => void
}) {
  return (
    <motion.li
      className="whitespace-nowrap text-[clamp(2rem,8vw,6rem)] leading-[0.9] font-bold uppercase will-change-[opacity]"
      initial={false}
      animate={{
        opacity: isHighlighted ? 1 : 0.3,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
      onViewportEnter={() => onHighlight(index)}
      viewport={{
        margin: "-28% 0px -68% 0px",
        amount: "some",
      }}
    >
      {service.name}
    </motion.li>
  )
}

function SkillItem({header, children}: { header: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  return (
    <MotionConfig transition={{duration: 0.3}}>
      <motion.section
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <h3>
          <motion.button
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            onFocus={onlyKeyboardFocus(() => setHasFocus(true))}
            onBlur={() => setHasFocus(false)}
          >
            <span>{header}</span> <RiArrowDropDownLine/>
            {hasFocus && (
              <motion.div
                layoutId="focus-ring"
                className="focus-ring"
              />
            )}
          </motion.button>
        </h3>
        <motion.div
          variants={{
            open: {
              height: "auto",
              maskImage:
                "linear-gradient(to bottom, black 100%, transparent 100%)",
            },
            closed: {
              height: 0,
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
            },
          }}
          className="accordion-content"
        >
          <motion.div
            variants={{
              open: {
                filter: "blur(0px)",
                opacity: 1,
              },
              closed: {
                filter: "blur(2px)",
                opacity: 0,
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
        <hr/>
      </motion.section>
    </MotionConfig>
  )
}

function onlyKeyboardFocus(callback: () => void) {
  return (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.type === "focus" && e.target.matches(":focus-visible")) {
      callback()
    }
  }
}

function AutoplayProgress({
                            duration,
                            className = "",
                          }: {
  duration: number
  className?: string
}) {
  const {currentPage, nextPage} = useCarousel()

  const progress = useMotionValue(0)
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"])

  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const nextPageRef = useRef(nextPage)

  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)

  const isPaused = manuallyPaused || hoverPaused

  useEffect(() => {
    nextPageRef.current = nextPage
  }, [nextPage])

  useEffect(() => {
    progress.set(0)

    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: () => {
        nextPageRef.current()
      },
    })

    animationRef.current = animation

    if (isPaused) {
      animation.pause()
    }

    return () => {
      animation.stop()
      animationRef.current = null
    }
  }, [currentPage, duration])

  useEffect(() => {
    const animation = animationRef.current
    if (!animation) return

    if (isPaused) {
      animation.pause()
    } else {
      animation.play()
    }
  }, [isPaused])

  const togglePaused = () => {
    setManuallyPaused((prev) => !prev)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="h-2 w-30 overflow-hidden rounded-4xl border border-light-muted bg-light-muted"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <motion.div
          className="h-full rounded-4xl bg-light-muted-foreground"
          style={{width: progressWidth, willChange: "width"}}
        />
      </div>

      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        onClick={togglePaused}
        className="shrink-0 rounded-full text-muted-foreground hover:text-foreground"
        aria-label={isPaused ? "자동재생 다시 시작" : "자동재생 일시정지"}
      >
        {isPaused ? <RiPlayFill size={16}/> : <RiPauseMiniFill size={16}/>}
      </Button>
    </div>
  )
}

function PortfolioSection(props: { infoStateList: PortfolioInfoStateList }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = () => setOpenId(null)

  return (
    <>
      <ul className="m-0 flex list-none flex-wrap content-start gap-4 p-0">
        {props.infoStateList.itemList.map((item) => (
          <PortfolioItem
            key={item.id}
            id={item.id}
            item={item}
            setOpen={() => setOpenId(item.id)}
            isHidden={openId === item.id}
          />
        ))}
      </ul>

      <AnimatePresence initial={false} mode="wait">
        {openId ? (
          <FloatingPortfolioItem
            key={openId}
            items={props.infoStateList.itemList}
            close={close}
            id={openId}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function PortfolioItemContent({
                                id,
                                item,
                                setOpen,
                                isOpen = false,
                                children = <></>,
                              }: PortfolioItemProps & {
  isOpen?: boolean
  children?: React.ReactNode
}) {
  const {t} = useTranslation()
  const navigate = useNavigate()

  return (
    <motion.div
      className={cn(
        "relative mx-auto overflow-hidden rounded-4xl bg-muted",
        isOpen
          ? "pointer-events-auto w-auto max-w-175"
          : "pointer-events-auto h-full w-full",
      )}
      layoutId={`card-container-${id}`}
    >
      <motion.div
        className={cn(
          "relative z-10 overflow-hidden",
          isOpen ? "h-80" : "h-full",
        )}
        layoutId={`card-image-container-${id}`}
      >
        <div className="relative h-full w-full">
          <motion.img
            className={cn(
              "block h-full w-full object-cover",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
            )}
            src={Localized.get(item.thumbnail)}
            alt=""
            layoutId={`card-image-${id}`}
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 dark:bg-black/15",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
            )}
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 dark:bg-black/15",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
            )}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/45 via-black/15 to-transparent"/>

        <motion.div
          className="absolute left-4 top-4 z-10 h-[calc(100%-32px)] w-[calc(100%-32px)] text-white"
          layoutId={`title-container-${id}`}
          layout="position"
        >
          <div className="flex flex-wrap gap-1">
            {item.categories.map((category) => (
              <Badge
                key={category}
                className={Portfolio.Category.getBadgeColor(category)}
              >
                {Portfolio.Category.getLabel(t, category)}
              </Badge>
            ))}
          </div>

          <h2
            className={cn(
              "mt-2 w-[90%] break-keep text-pretty font-bold leading-[1.08] tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
              "text-4xl md:text-4xl",
            )}
          >
            {Localized.get(item.title)}
          </h2>

          <AnimatePresence>
            {!isOpen && (
              <motion.div className="mt-2 flex flex-row items-center gap-1">
                {item.platforms.map((platform) => (
                  <span key={platform}>
                    {PortfolioX.Platform.getIcon(platform, 18)}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div className="absolute right-0 top-0 flex flex-col">
                <MagneticButton onClick={setOpen} size="icon-lg" variant="ghost">
                  <RiCloseLargeFill/>
                </MagneticButton>

                <MagneticButton
                  onClick={() => navigate("")}
                  size="icon-lg"
                  className={cn(
                    "bg-background/90 text-foreground hover:bg-background",
                    "dark:bg-background/85 dark:text-foreground dark:hover:bg-background",
                  )}
                >
                  <RiArrowRightUpLine/>
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div className="absolute bottom-0 right-0 flex flex-row items-end justify-between gap-x-2">
                <div className="flex flex-row items-center gap-x-2">
                  {item.googlePlayLink && (
                    <MagneticButton className="google-play-button" size="icon-lg" asChild>
                      <a
                        href={getGooglePlayLink(item.googlePlayLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IcGooglePlay/>
                      </a>
                    </MagneticButton>
                  )}

                  {item.appStoreLink && (
                    <MagneticButton className="app-store-button" size="icon-lg" asChild>
                      <a
                        href={getAppStoreLink(item.appStoreLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IcAppStore/>
                      </a>
                    </MagneticButton>
                  )}

                  {item.webLink && (
                    <Button className="website-button" size="icon-lg" asChild>
                      <a href={item.webLink} target="_blank" rel="noopener noreferrer">
                        <RiPagesFill size={60}/>
                      </a>
                    </Button>
                  )}

                  {item.githubLink && (
                    <Button className="github-button" size="icon-lg" asChild>
                      <a
                        href={`https://github.com/${item.githubLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiGithubFill size={60}/>
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className="relative z-0">{children}</motion.div>
    </motion.div>
  )
}

function PortfolioItem({
                         id,
                         item,
                         setOpen,
                         width = "100%",
                         theme,
                         isHidden = false,
                       }: PortfolioItemProps) {
  const maxTilt = 15
  const cardRef = useRef<HTMLLIElement>(null)
  const z = useSpring(0)
  const rotateX = useSpring(0)
  const rotateY = useSpring(0)

  const calculateTilt = (event: React.PointerEvent<HTMLLIElement>) => {
    if (!cardRef.current) return {rotateX: 0, rotateY: 0}

    const rect = cardRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const xPercent = x / rect.width
    const yPercent = y / rect.height

    return {
      rotateX: maxTilt * (0.5 - yPercent),
      rotateY: maxTilt * (xPercent - 0.5),
    }
  }

  const handleOpen = () => {
    rotateX.set(0)
    rotateY.set(0)
    z.set(0)
    setOpen()
  }

  return (
    <motion.li
      onClick={handleOpen}
      className={cn(
        "relative box-border h-88 list-none p-0 md:h-100",
        "flex-[1_1_100%]",
        "md:flex-[0_0_40%]",
        "md:nth-[4n+1]:flex-[0_1_calc(60%-16px)]",
        "md:nth-[4n+4]:flex-[0_1_calc(60%-16px)]",
        "cursor-pointer transition-opacity duration-200",
        isHidden && "pointer-events-none opacity-0",
      )}
      ref={cardRef}
      style={{
        z,
        rotateX,
        rotateY,
      }}
      transition={{type: "spring", stiffness: 200, damping: 20}}
      onPointerMove={(e) => {
        if (isHidden) return
        const tilt = calculateTilt(e)
        rotateX.set(tilt.rotateX)
        rotateY.set(tilt.rotateY)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        z.set(0)
      }}
      onPointerEnter={() => {
        if (isHidden) return
        z.set(-10)
      }}
    >
      <PortfolioItemContent
        id={id}
        item={item}
        setOpen={handleOpen}
        width={width}
        theme={theme}
        isHidden={isHidden}
      />
    </motion.li>
  )
}

function FloatingPortfolioItem({id, items, close}: { id: string, items: Portfolio[], close: VoidFunction }) {
  const {t} = useTranslation()
  const item = items.find((item) => item.id === id)!

  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.2, delay: 0.1}}
        className="fixed inset-0 z-10000 bg-black/80"
        onClick={close}
      />

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-10001 flex h-full w-full flex-col justify-center overflow-hidden py-10",
          "max-[990px]:py-0",
        )}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-200">
          <PortfolioItemContent id={id} item={item} setOpen={close} isOpen>
            <div
              className={cn(
                "grid w-full grid-cols-[25%_35%_40%] p-4",
                "max-md:grid-cols-1 max-md:gap-y-4",
              )}
            >
              <Field
                className={cn(
                  "h-full md:border-r md:pr-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr]",
                )}
              >
                <FieldTitle>
                  <Badge variant="secondary" className="border border-border">
                    {formatBaseDateTime(item.startAt.toDate(), t("strings:datetime.month_year"))} -{" "}
                    {item.endAt
                      ? formatBaseDateTime(item.endAt.toDate(), t("strings:datetime.month_year"))
                      : ""}
                  </Badge>
                </FieldTitle>

                <FieldDescription>
                  <Badge variant={Portfolio.State.getBadgeColor(item.state)}>
                    {Portfolio.State.getLabel(t, item.state)}
                  </Badge>
                </FieldDescription>
              </Field>

              <Field
                className={cn(
                  "h-full md:border-r md:px-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start",
                )}
              >
                <FieldTitle>{t("strings:home.project.role.label")}</FieldTitle>
                <FieldDescription className="break-keep text-pretty">{Localized.get(item.role)}</FieldDescription>
              </Field>

              <Field
                className={cn(
                  "flex h-full flex-col gap-y-2 md:pl-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start",
                )}
              >
                <FieldTitle>
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map(platform => (
                      <Badge key={platform} className={Portfolio.Platform.getBadgeColor(platform)}>
                        <div data-icon="inline-start" className="mr-1">
                          {PortfolioX.Platform.getIcon(platform, 12)}
                        </div>
                        <div>{Portfolio.Platform.getLabel(t, platform)}</div>
                      </Badge>
                    ))}
                  </div>
                </FieldTitle>

                <FieldDescription className="break-keep text-pretty">
                  {Localized.get(item.summary)}
                </FieldDescription>
              </Field>
            </div>
          </PortfolioItemContent>
        </div>
      </div>
    </>
  )
}

interface PortfolioItemProps {
  id: string
  item: Portfolio
  setOpen: VoidFunction
  top?: number
  bottom?: number
  width?: string
  left?: number
  theme?: "dark" | "light"
  isHidden?: boolean
}

type LayeredSlidesProps = {
  interval?: number
  onReady?: () => void
}

function LayeredSlides({
                         interval = 300,
                         onReady,
                       }: LayeredSlidesProps) {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const bgs = [ImgFront01, ImgFront02, ImgFront03]
  const bgsMobile = [ImgFrontMobile01, ImgFrontMobile02, ImgFrontMobile03]
  const fg= ImgFrontForward
  const fgMobile = ImgFrontForwardMobile

  useEffect(() => {
    let cancelled = false

    Promise.all(
      bgs.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve()
            img.onerror = () => resolve()
          })
      )
    ).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [bgs])

  useEffect(() => {
    if (!ready) return
    onReady?.()
  }, [ready, onReady])

  useEffect(() => {
    if (!ready || bgs.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % bgs.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [ready, bgs.length, interval])

  if (!ready) {
    return <div className="relative h-full w-full"/>
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.7}}
      className="relative w-full h-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={bgs[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-contain md:object-cover max-md:hidden"
          draggable={false}
        />
        <img
          src={bgsMobile[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom md:hidden"
          draggable={false}
        />
      </div>

      <div className={cn(
        "pointer-events-none absolute inset-0 z-10 max-md:hidden",
      )}>
        <CrossfadeImage
          src={fg}
          alt=""
          className="h-full w-full object-contain md:object-cover"
          draggable={false}
        />
      </div>
      <CrossfadeImage
        src={fgMobile}
        alt=""
        className="w-[70%] object-contain md:object-cover md:hidden z-10 absolute left-1/2 -translate-x-1/2 bottom-0"
        draggable={false}
      />

    </motion.div>
  )
}

function SkillCardItem(props: { index: number, item: SkillItem }) {
  return (
    <article
      className={cn(
        "relative flex h-[calc(100vh-48px)] min-w-80 w-[78vw] shrink-0 overflow-hidden rounded-4xl md:min-w-120 md:w-[50vw]",
      )}
    >
      <CrossfadeImage
        src={props.item.image}
        className="absolute left-0 top-0 w-full h-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 45%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-lg"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 20%, black 38%, transparent 60%)",
            maskImage:
              "linear-gradient(to bottom, transparent 20%, black 38%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 45%, black 60%, transparent 72%)",
            maskImage:
              "linear-gradient(to bottom, transparent 45%, black 60%, transparent 72%)",
          }}
        />
      </div>
      {/* light / dark tint overlay */}
      <div className="absolute inset-0 bg-white/8 dark:bg-black/24"/>

      {/* text readability gradient */}
      <div
        className="absolute inset-0 bg-linear-to-b from-white/12 via-transparent to-black/10 dark:from-black/38 dark:via-black/18 dark:to-black/42"/>

      <div
        className="absolute flex h-full w-full flex-col gap-y-8 p-6 sm:p-8 md:gap-y-12 lg:p-12 xl:p-16"
      >
        <div className="flex flex-row gap-x-4 items-center text-foreground/50">
          <div className="w-1/16 h-0.5 bg-foreground/50"/>
          <span className="font-medium tracking-wider">{(props.index + 1).toString().padStart(2, '0')}</span>
        </div>
        <h1
          className="break-keep text-pretty text-4xl font-black leading-none tracking-normal text-foreground md:text-5xl xl:text-6xl">{props.item.title}</h1>
        <p className="text-lg font-medium leading-relaxed text-accent-foreground/65 md:text-xl xl:text-2xl">{props.item.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 md:gap-3 xl:gap-4">
          {props.item.tags.map(tag => (
            <div
              className="rounded-2xl bg-background/25 px-3 py-1.5 font-mona text-sm font-extrabold backdrop-blur-md md:px-4 md:py-2 md:text-base lg:text-lg"
              style={{
                fontVariationSettings: '"wdth" 125, "opsz" 100',
              }}
            >{tag}</div>
          ))}
        </div>
      </div>
    </article>
  )
}

function ReviewCardItem(props: { index: number, item: ReviewItem }) {
  return (
    <div
      className="flex h-full w-[min(25rem,calc(100vw-2rem))] flex-col rounded-3xl border border-border bg-card p-5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] md:p-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-muted-foreground">
          <img
            src={sampleProfiles[props.index % sampleProfiles.length]}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[24px] font-semibold tracking-normal text-card-foreground md:text-[28px]">{props.item.name}</span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[#62d26f]">★</span>
            <span className="text-[20px] font-bold text-card-foreground">{props.item.star.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <p
        className="mt-6 text-base font-medium leading-relaxed tracking-normal text-card-foreground md:text-lg">{props.item.review}</p>
    </div>
  )
}
