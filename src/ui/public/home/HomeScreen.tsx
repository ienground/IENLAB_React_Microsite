import {Carousel, Ticker, useTickerItem} from "motion-plus/react";
import Sample from "@/assets/brand/Page04_01_white.png"
// import Sample from "@/assets/brand/img_logo_typo.png"
import {motion, useTransform } from "motion/react";
import {CrossfadeImage} from "@ienlab/react-library";

export default function HomeScreen() {
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
  ]

  return (
    <div className="w-full flex flex-col items-center overflow-hidden"
    >
      <Carousel
        align="center"
        gap={16}
        className="w-350"
        safeMargin={200}
        overflow

        items={items.map((item) => (
          <div
            key={item.id}
            className="w-350"
          >
            <CrossfadeImage
              src={item.image}
              alt={item.title}
              className="rounded-4xl"
            />
          </div>
        ))}
      />
      <section className="bg-red-500 w-full p-8">
        <div className="w-full bg-blue-500">
          <div className="grid grid-cols-12 gap-y-10 xl:gap-x-10">
            <aside className="col-span-12 xl:col-span-2">
              <p className="text-[18px] font-medium tracking-[-0.03em] md:text-[22px]">
                (01) LAB
              </p>
            </aside>

            <div className="col-span-12 xl:col-span-10">
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
              <div className="max-w-[520px]">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae blanditiis cum deleniti dolores doloribus dolorum, earum facere fugit hic impedit in libero maxime molestiae molestias nulla perspiciatis placeat quibusdam quisquam recusandae suscipit tempora tenetur ullam voluptatibus voluptatum. Adipisci beatae et facilis quidem reiciendis? Ab aut dolorum harum molestiae perferendis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-yellow-200 w-full p-8">
        <p className="text-[18px] font-medium tracking-[-0.03em] md:text-[22px]">
          (02) PROJECT
        </p>
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
        <p className="text-[18px] font-medium tracking-[-0.03em] md:text-[22px]">
          (03) SKILLS
        </p>
        <div>
          <Ticker
            hoverFactor={0}
            overflow
            items={items.map((item) => (
              <div
                key={item.id}
                className="w-350"
              >
                <CrossfadeImage
                  src={item.image}
                  alt={item.title}
                  className="rounded-4xl"
                />
              </div>
            ))}
          />
        </div>
      </section>
    </div>
  );
}