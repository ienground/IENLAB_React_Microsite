import {Carousel, Ticker, useCarousel, useTickerItem} from "motion-plus/react";
import Sample from "@/assets/brand/Page04_01_white.png"
// import Sample from "@/assets/brand/img_logo_typo.png"
import {motion, MotionConfig, useMotionValue, useScroll, useTransform} from "motion/react";
import {CrossfadeImage} from "@ienlab/react-library";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {RiArrowDropDownLine} from "@remixicon/react";
import * as React from "react";
import {splitText} from "motion-plus";
import {animate, stagger} from "motion";

export default function HomeScreen() {
  const { t } = useTranslation();

  const [activeService, setActiveService] = useState<number | null>(null);
  const services: Service[] = [
    { name: "Branding" },
    { name: "Web Design" },
    { name: "Marketing" },
    { name: "UI/UX Design" },
    { name: "Development" },
    { name: "Motion Design" },
  ]

  const items = [
    {
      id: 1,
      title: "One",
      image: Sample,
    },
    {
      id: 2,
      image: Sample,
      title: "Two",
    },
    {
      id: 3,
      title: "Three",
      image: Sample,
    },
  ];
  const splitTextContainerRef = useRef<HTMLDivElement | null>(null);
  const horizontalScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalScrollContainerRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const items2 = [
    { id: 1, title: "One", color: "bg-orange-300" },
    { id: 2, title: "Two", color: "bg-pink-300" },
    { id: 3, title: "Three", color: "bg-emerald-300" },
    { id: 4, title: "Four", color: "bg-sky-300" },
  ];

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!splitTextContainerRef.current) return;
      splitTextContainerRef.current.style.visibility = "visible";

      const { words } = splitText(splitTextContainerRef.current.querySelector("h1"));

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    })
  }, []);

  return (
    <div className="w-full flex flex-col items-center"
    >
      <Carousel
        align="center"
        gap={16}
        className="w-350 bg-amber-200"
        overflow
        itemSize="fill"
        items={items.map(item => (
          <div
            key={item.id}
            className="w-350 rounded-4xl overflow-hidden"
          >
            <CrossfadeImage
              draggable={false}
              src={item.image}
              alt={item.title}
            />
          </div>
        ))}
      >
        <AutoplayProgress duration={3} />
      </Carousel>
      <section className="bg-red-500 w-full p-8">
        <div className="w-full bg-blue-500">
          <div className="grid grid-cols-12 gap-y-10 xl:gap-x-10">
            <aside className="col-span-12 xl:col-span-2">
              <SectionHeader index={1} label={t("strings:home.header.about")} />
            </aside>

            <div className="col-span-12 xl:col-span-10" ref={splitTextContainerRef}>
              <h1 className="max-w-400 text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] md:text-[88px] lg:text-[112px] xl:text-[92px] 2xl:text-[108px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem consectetur dignissimos, dolores excepturi ipsa iste molestias quis reiciendis sunt.
              </h1>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 xl:mt-24 xl:gap-x-10">
            <div className="col-span-12 xl:col-span-4">
              <div className="w-full max-w-90">
                <div className="aspect-3/4 overflow-hidden rounded-lg bg-black">
                  <img
                    src={Sample}
                    alt="lorem1"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 space-y-0.5">
                  <p className="text-[18px] font-medium tracking-[-0.03em] md:text-[20px]">
                    Lorem.
                  </p>
                  <p className="text-[18px] tracking-[-0.03em] text-black/85 md:text-[20px]">
                    ©2024
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cumque fugiat quo voluptas voluptates. Ab animi at atque, delectus deserunt dolorem dolorum enim eos est fugiat hic id labore libero necessitatibus nostrum omnis perferendis placeat possimus quas quasi, quisquam rem similique tempora, ullam ut vitae voluptas? Dolores eveniet perferendis quis!
                </p>

                <a
                  href="#"
                  className="mt-14 inline-flex items-center gap-3 bg-black px-3 py-1.5 text-[16px] font-medium tracking-[-0.03em] text-white transition hover:bg-black/85 md:text-[18px]"
                >
                  <span>Lorem.</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae blanditiis cum deleniti dolores doloribus dolorum, earum facere fugit hic impedit in libero maxime molestiae molestias nulla perspiciatis placeat quibusdam quisquam recusandae suscipit tempora tenetur ullam voluptatibus voluptatum. Adipisci beatae et facilis quidem reiciendis? Ab aut dolorum harum molestiae perferendis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-yellow-200 w-full p-8">
        <SectionHeader index={2} label={t("strings:home.header.project")} />
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          <article className="rounded-2xl bg-neutral-100 p-6">
            <h3 className="text-xl font-semibold">제목 1</h3>
            <p className="mt-3 text-sm text-neutral-600">
              설명 텍스트입니다.
            </p>
          </article>

          <article className="rounded-2xl bg-neutral-100 p-6">
            <h3 className="text-xl font-semibold">제목 2</h3>
            <p className="mt-3 text-sm text-neutral-600">
              설명 텍스트입니다.
            </p>
          </article>

          <article className="rounded-2xl bg-neutral-100 p-6">
            <h3 className="text-xl font-semibold">제목 3</h3>
            <p className="mt-3 text-sm text-neutral-600">
              설명 텍스트입니다.
            </p>
          </article>
        </div>
      </section>
      <section className="bg-green-500 w-full p-8">
        <SectionHeader index={3} label={t("strings:home.header.skills")} />
        <div ref={horizontalScrollContainerRef} className="h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center">
            <motion.div style={{ x }} className="flex gap-6 px-6">
              {items2.map((item) => (
                <article
                  key={item.id}
                  className={`flex h-[calc(100vh-48px)] w-[50vw] shrink-0 items-end rounded-3xl p-8 text-4xl font-semibold text-black ${item.color}`}
                >
                  {item.title}
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-cyan-200 w-full p-8">
        <SectionHeader index={4} label={t("strings:home.header.services")} />
        <div className="flex">
          <ul className="m-0 flex flex-col gap-5 p-0 list-none">
            {services.map((service, index) => (
              <ScrollHighlightItem
                key={service.name}
                service={service}
                index={index}
                isHighlighted={activeService === index}
                onHighlight={() => setActiveService(index)}
              />
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-pink-200 w-full p-8">
        <SectionHeader index={5} label={t("strings:home.header.feedback")} />
        <div>
          <Ticker
            hoverFactor={0}
            overflow
            gap={16}
            items={items.map((item) => (
              <div
                key={item.id}
                className="w-350 rounded-4xl overflow-hidden"
              >
                <CrossfadeImage
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                />
              </div>
            ))}
          />
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ index, label }: { index: number, label: string }) {
  const indexFormatted = String(index).padStart(2, '0');
  const labelFormatted = label.toUpperCase();
  return (
    <p className="text-xl font-medium tracking-tight md:text-2xl">({indexFormatted}) {labelFormatted}</p>
  )
}

interface Service {
  name: string
}

function ScrollHighlightItem({service, index, isHighlighted, onHighlight}: { service: Service, index: number, isHighlighted: boolean, onHighlight: (index: number) => void }) {
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

function SkillItem({ header, children }: { header: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <MotionConfig transition={{ duration: 0.3 }}>
      <motion.section
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <h3>
          <motion.button
            // id={id + "-button"}
            aria-expanded={isOpen}
            // aria-controls={id}
            onClick={() => setIsOpen(!isOpen)}
            onFocus={onlyKeyboardFocus(() => setHasFocus(true))}
            onBlur={() => setHasFocus(false)}
          >
            <span>{header}</span> <RiArrowDropDownLine />
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
        <hr />
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

function AutoplayProgress({ duration }: { duration: number }) {
  const { currentPage, nextPage } = useCarousel()
  const progress = useMotionValue(0)

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: nextPage,
    })

    return () => animation.stop()
  }, [duration, nextPage, progress, currentPage]);

  console.log(progress.get());

  return (
    <div className="w-30 h-1.5 bg-pink-400 rounded-4xl z-50 ">
      <motion.div
        className="w-full h-full bg-white origin-left rounded-4xl"
        style={{ scaleX: progress, willChange: "transform" }}
      />
    </div>
  )
}