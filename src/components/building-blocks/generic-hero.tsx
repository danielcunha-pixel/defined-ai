import Image from "next/image"
import { Button } from "@/components/ui/button"
import heroBackground from "../../../public/images/pattern-bg.png"

type GenericHeroProps = {
  subHeadingText?: string
  headingText?: string
  descriptionText?: string
  buttonLabel?: string
  buttonHref?: string
  onButtonClick?: () => void
  illustration?: React.ReactNode
}

export function GenericHero({
  subHeadingText = "Sub-heading",
  headingText = "This is the heading",
  descriptionText = "This is the description",
  buttonLabel = "Button",
  buttonHref,
  onButtonClick,
  illustration,
}: GenericHeroProps) {
  return (
    <section className="relative w-full bg-white">
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[384px] md:h-[490px]" aria-hidden>
        <Image
          src={heroBackground}
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-[294px] bg-gradient-to-b from-grey-5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-sp-40 pb-sp-28 pt-sp-40 md:flex-row md:items-center md:gap-sp-64 md:px-sp-128 md:pb-sp-56 md:pt-sp-112">
        {/* Copy + CTA */}
        <div className="flex w-full flex-col items-center gap-sp-32 px-sp-16 text-center md:flex-1 md:px-0 md:items-start md:text-left">
          {/* Sub-heading + Heading */}
          <div className="flex w-full flex-col gap-sp-24 items-center text-center md:gap-sp-12 md:items-start md:text-left">
            <p className="ds-text-heading-xs font-semibold text-grey-80">
              {subHeadingText}
            </p>
            <h1 className="ds-text-display-xl font-semibold text-grey-100">
              {headingText}
            </h1>
          </div>

          {/* Description + CTA
              Mobile: description and button wrapped together with gap-sp-40
              Desktop: description sits in the copy block (gap-sp-32 above handled by parent),
                       button sits below with gap-sp-32 from parent */}
          <div className="flex w-full flex-col items-center gap-sp-40 md:contents">
            <p className="ds-text-heading-sm font-regular text-grey-80 text-center md:text-left md:w-full">
              {descriptionText}
            </p>
            {buttonHref ? (
              <Button variant="primary" size="lg" asChild className="self-center md:self-start">
                <a href={buttonHref}>{buttonLabel}</a>
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={onButtonClick} className="self-center md:self-start">
                {buttonLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative h-[316px] w-[375px] shrink-0 overflow-hidden md:h-[386px] md:w-[560px]">
          {illustration ?? (
            <div className="h-full w-full bg-grey-40" aria-hidden />
          )}
        </div>
      </div>
    </section>
  )
}
