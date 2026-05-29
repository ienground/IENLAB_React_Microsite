import ImgUnderConstruction from "@/assets/image/img_under_construction.png"
import {RiArrowLeftLine} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {useNavigate} from "react-router"
import {useTranslation} from "react-i18next"

export default function ConstructionScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <main
      className="grow flex flex-col justify-center px-margin-page max-w-360 mx-auto w-full py-section-gap"
    >
      <div className="grid-12 w-full">
        <div className="col-span-12 md:col-span-6 flex flex-col gap-stack-lg">
          <div className="flex flex-col gap-stack-sm">
            <h1 className="font-bold md:text-headline-lg uppercase">
              PREPARING FOR EXCELLENCE
            </h1>
            <h2 className="text">
              UNDER CONSTRUCTION
            </h2>
          </div>
          <div className="editorial-line w-full opacity-30"></div>
          <p className="font-body-lg text-body-lg text-secondary max-w-xl">
            We are meticulously refining our digital infrastructure to ensure it meets the exacting standards
            required for top-tier legal service. Our online presence is currently undergoing a comprehensive
            structural update to provide an uncompromising, highly secure, and efficient client experience.
          </p>
          <div className="mt-4">
            <Button
              onClick={() => navigate("/")}
            >
              <RiArrowLeftLine />
              {t("strings:back_to_home")}
            </Button>
          </div>
        </div>
        <div
          className="col-span-12 md:col-span-5 flex items-center justify-center relative min-h-75 md:min-h-full">
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              alt="Under Construction Character"
              className="max-w-full h-auto object-contain mix-blend-multiply opacity-90"
              src={ImgUnderConstruction}
            />
          </div>
        </div>
      </div>
    </main>
  )
}