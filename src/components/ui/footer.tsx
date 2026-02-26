"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Link as DSLink } from "@/components/ui/link";
import { IconGlobe } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterColumnItem {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSocialItem {
  label: string;
  href: string;
  iconSrc?: string;
  iconAlt?: string;
}

export interface FooterAwardItem {
  label: string;
  src?: string;
  width?: number;
  height?: number;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  companyDescription?: string;
  columns?: FooterColumnItem[];
  legalLinks?: FooterLinkItem[];
  socialLinks?: FooterSocialItem[];
  awards?: FooterAwardItem[];
  copyright?: string;
  patternSrc?: string;
}

type FooterContextValue = Required<
  Pick<
    FooterProps,
    | "logoSrc"
    | "logoAlt"
    | "logoHref"
    | "title"
    | "subtitle"
    | "ctaLabel"
    | "ctaHref"
    | "companyDescription"
    | "columns"
    | "legalLinks"
    | "socialLinks"
    | "awards"
    | "copyright"
    | "patternSrc"
  >
>;

const defaultColumns: FooterColumnItem[] = [
  {
    title: "Datasets",
    links: [{ label: "Marketplace", href: "#" }],
  },
  {
    title: "Solutions",
    links: [
      { label: "Gen AI", href: "#" },
      { label: "Speech recognition", href: "#" },
      { label: "Natural language processing", href: "#" },
      { label: "Crowd-as-a-service", href: "#" },
      { label: "Evaluation of experience", href: "#" },
      { label: "Computer vision", href: "#" },
      { label: "Machine Translation", href: "#" },
      { label: "LLM fine-tuning", href: "#" },
      { label: "Accelerat", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case studies", href: "#" },
      { label: "White papers", href: "#" },
      { label: "Events", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "About us",
    links: [
      { label: "Company", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Ethical AI", href: "#" },
      { label: "Press Room", href: "#" },
    ],
  },
];

const defaultLegalLinks: FooterLinkItem[] = [
  { label: "Privacy and Cookie Policy", href: "#" },
  { label: "Terms and Conditions", href: "#" },
  { label: "Data License Agreement", href: "#" },
  { label: "Supplier Program", href: "#" },
  { label: "CCPA Privacy Statement", href: "#" },
  { label: "Whistleblowing Channel", href: "#" },
  { label: "Candidate Privacy Statement", href: "#" },
];

const defaultSocialLinks: FooterSocialItem[] = [
  {
    label: "YouTube",
    href: "#",
    iconSrc: "/svg/Footer/Social links/Desktop.svg",
    iconAlt: "YouTube",
  },
  {
    label: "LinkedIn",
    href: "#",
    iconSrc: "/svg/Footer/Social links/Desktop-1.svg",
    iconAlt: "LinkedIn",
  },
];

const defaultAwards: FooterAwardItem[] = [
  { label: "Inc 5000", src: "/images/Inc 5000.png", width: 82, height: 54 },
  { label: "Forbes", src: "/images/Forbes.png", width: 107, height: 54 },
  { label: "Wired", src: "/images/Wired.png", width: 90, height: 54 },
  { label: "AI 100", src: "/images/AI 100.png", width: 68, height: 54 },
  { label: "Forbes AI 50", src: "/images/Forbes AI 50.png", width: 64, height: 64 },
  { label: "Union", src: "/images/Union.png", width: 54, height: 64 },
];

const FooterContext = React.createContext<FooterContextValue | null>(null);

function useFooterContext() {
  const context = React.useContext(FooterContext);
  if (!context) {
    throw new Error("Footer compound components must be used inside <Footer>.");
  }
  return context;
}

function FooterBanner({ className }: { className?: string }) {
  const { title, subtitle, ctaHref, ctaLabel } = useFooterContext();

  return (
    <div className={cn("flex flex-col items-center gap-sp-32 text-center md:px-sp-48 lg:px-0", className)}>
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-sp-12">
        <h3 className="whitespace-pre-line ds-text-display-lg font-semibold text-white">
          {title}
        </h3>
        {subtitle ? <p className="mx-auto max-w-[740px] ds-text-body-lg text-grey-40">{subtitle}</p> : null}
      </div>
      <Button asChild variant="primary-footer" size="md" responsive className="w-fit">
        <NextLink href={ctaHref}>
          {ctaLabel}
        </NextLink>
      </Button>
    </div>
  );
}

function FooterColumn({ title, links, className }: FooterColumnItem & { className?: string }) {
  const isSolutions = title.toLowerCase() === "solutions";
  const primarySolutions = isSolutions ? links.slice(0, 5) : links;
  const secondarySolutions = isSolutions ? links.slice(5) : [];
  const mainLinkClassName =
    "whitespace-nowrap focus-visible:ring-offset-grey-100 md:[&_[data-slot='link-label']]:text-[14px] md:[&_[data-slot='link-label']]:leading-[15px] md:[&_[data-slot='link-label']]:tracking-[0] lg:[&_[data-slot='link-label']]:text-[15px] lg:[&_[data-slot='link-label']]:leading-[15px] lg:[&_[data-slot='link-label']]:tracking-[0.02em]";
  const solutionsLinkClassName =
    "h-auto w-full items-start whitespace-normal focus-visible:ring-offset-grey-100 [&_[data-slot='link-label']]:h-auto [&_[data-slot='link-label']]:w-full [&_[data-slot='link-label']]:justify-start [&_[data-slot='link-label']]:whitespace-normal [&_[data-slot='link-label']]:break-words md:w-fit md:whitespace-nowrap md:[&_[data-slot='link-label']]:w-auto md:[&_[data-slot='link-label']]:whitespace-nowrap md:[&_[data-slot='link-label']]:break-normal md:[&_[data-slot='link-label']]:text-[14px] md:[&_[data-slot='link-label']]:leading-[15px] md:[&_[data-slot='link-label']]:tracking-[0] lg:[&_[data-slot='link-label']]:text-[15px] lg:[&_[data-slot='link-label']]:leading-[15px] lg:[&_[data-slot='link-label']]:tracking-[0.02em]";

  return (
    <div className={cn("flex flex-col gap-sp-16", className)}>
      <p className="ds-text-body-md font-regular text-grey-40">{title}</p>
      {isSolutions ? (
        <>
          <ul className="flex min-w-0 flex-col gap-sp-16 md:hidden">
            {links.map((link) => (
              <li key={`${title}-${link.label}`} className="leading-none">
                <DSLink
                  href={link.href}
                  style="white"
                  size="medium"
                  className={solutionsLinkClassName}
                >
                  {link.label}
                </DSLink>
              </li>
            ))}
          </ul>
          <div className="hidden items-start gap-sp-32 md:flex">
            <ul className="flex shrink-0 flex-col gap-sp-16 lg:w-[202px]">
              {primarySolutions.map((link) => (
                <li key={`${title}-${link.label}`} className="leading-none">
                  <DSLink
                    href={link.href}
                    style="white"
                    size="medium"
                    className={solutionsLinkClassName}
                  >
                    {link.label}
                  </DSLink>
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 flex-col gap-sp-16 lg:w-[138px]">
              {secondarySolutions.map((link) => (
                <li key={`${title}-${link.label}`} className="leading-none">
                  <DSLink
                    href={link.href}
                    style="white"
                    size="medium"
                    className={solutionsLinkClassName}
                  >
                    {link.label}
                  </DSLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <ul className="flex flex-col gap-sp-16">
          {links.map((link) => (
            <li key={`${title}-${link.label}`} className="whitespace-nowrap leading-none">
              <DSLink
                href={link.href}
                style="white"
                size="medium"
                className={mainLinkClassName}
              >
                {link.label}
              </DSLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FooterCompany({ className }: { className?: string }) {
  const { logoSrc, logoAlt, logoHref, companyDescription, awards, copyright } = useFooterContext();

  return (
    <div className={cn("flex min-w-0 flex-col gap-sp-24", className)}>
      <div className="flex flex-col gap-sp-16">
        <NextLink href={logoHref} aria-label="Go to homepage" className="inline-flex w-fit items-center">
          <Image src={logoSrc} alt={logoAlt} width={120} height={20} className="h-5 w-auto" />
        </NextLink>
        {companyDescription ? <p className="max-w-[340px] ds-text-body-sm text-grey-40">{companyDescription}</p> : null}
        <p className="ds-text-body-md font-regular text-grey-40">{copyright}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-sp-16 gap-y-sp-12">
        {awards.map((award) => (
          <span key={award.label} className="inline-flex items-center">
            {award.src ? (
              <Image
                src={award.src}
                alt={award.label}
                width={award.width ?? 72}
                height={award.height ?? 20}
                className="h-auto w-auto"
              />
            ) : (
              <span className="ds-text-body-sm font-regular text-grey-40">{award.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function FooterColumns({ className }: { className?: string }) {
  const { columns } = useFooterContext();
  const columnClassByTitle: Record<string, string> = {
    Datasets: "lg:w-[87px] lg:pt-[8px]",
    Solutions: "lg:w-[368px] lg:pt-[8px]",
    Resources: "lg:w-[161px] lg:pt-[8px]",
    "About us": "lg:w-fit lg:pt-[8px]",
  };
  const datasetsColumn = columns.find((column) => column.title === "Datasets");
  const solutionsColumn = columns.find((column) => column.title === "Solutions");
  const resourcesColumn = columns.find((column) => column.title === "Resources");
  const aboutUsColumn = columns.find((column) => column.title === "About us");

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex min-w-0 flex-col gap-sp-32 md:hidden">
        {datasetsColumn ? (
          <FooterColumn title={datasetsColumn.title} links={datasetsColumn.links} />
        ) : null}

        <div className="grid min-w-0 grid-cols-2 items-start gap-x-sp-20">
          {solutionsColumn ? (
            <FooterColumn title={solutionsColumn.title} links={solutionsColumn.links} />
          ) : null}

          <div className="flex min-w-0 flex-col gap-sp-32">
            {resourcesColumn ? (
              <FooterColumn title={resourcesColumn.title} links={resourcesColumn.links} />
            ) : null}
            {aboutUsColumn ? (
              <FooterColumn title={aboutUsColumn.title} links={aboutUsColumn.links} />
            ) : null}
          </div>
        </div>
      </div>

      <div className="hidden min-w-0 md:flex md:flex-row md:items-start md:gap-sp-40 lg:justify-between lg:gap-sp-64">
        {columns.map((column) => (
          <FooterColumn
            key={column.title}
            title={column.title}
            links={column.links}
            className={columnClassByTitle[column.title]}
          />
        ))}
      </div>
    </div>
  );
}

function FooterLegal({ className }: { className?: string }) {
  const { legalLinks, socialLinks } = useFooterContext();
  const legalMobileColumns = [legalLinks.slice(0, 4), legalLinks.slice(4)];
  const legalTabletColumns = [legalLinks.slice(0, 3), legalLinks.slice(3, 5), legalLinks.slice(5)];
  const legalLinkClassName =
    "h-auto items-start focus-visible:ring-offset-grey-100 [&_[data-slot='link-label']]:h-auto [&_[data-slot='link-label']]:whitespace-normal [&_[data-slot='link-label']]:text-left";

  return (
    <div className={cn("flex min-w-0 flex-col gap-sp-24 md:flex-row md:items-start md:justify-between", className)}>
      <div className="grid min-w-0 grid-cols-2 gap-x-sp-20 gap-y-sp-16 md:hidden">
        {legalMobileColumns.map((linksGroup, index) => (
          <ul key={`legal-group-${index}`} className="flex shrink-0 flex-col gap-sp-16">
            {linksGroup.map((link) => (
              <li key={link.label} className="leading-none">
                <DSLink
                  href={link.href}
                  style="medium-grey"
                  size="small"
                  className={legalLinkClassName}
                >
                  {link.label}
                </DSLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="hidden min-w-0 flex-col gap-sp-16 md:flex md:flex-row md:items-start md:gap-sp-40 lg:hidden">
        {legalTabletColumns.map((linksGroup, index) => (
          <ul key={`legal-tablet-group-${index}`} className="flex shrink-0 flex-col gap-sp-16">
            {linksGroup.map((link) => (
              <li key={link.label} className="leading-none">
                <DSLink
                  href={link.href}
                  style="medium-grey"
                  size="small"
                  className={legalLinkClassName}
                >
                  {link.label}
                </DSLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <ul className="hidden min-w-0 flex-wrap items-center gap-x-sp-16 gap-y-sp-8 lg:flex">
        {legalLinks.map((link) => (
          <li key={link.label} className="leading-none">
            <DSLink
              href={link.href}
              style="medium-grey"
              size="small"
              className={legalLinkClassName}
            >
              {link.label}
            </DSLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-sp-24 md:shrink-0 lg:gap-sp-12">
        {socialLinks.map((link) => (
          <NextLink
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className="inline-flex size-5 items-center justify-center text-grey-40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-50 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-100"
          >
            {link.iconSrc ? (
              <Image src={link.iconSrc} alt={link.iconAlt ?? link.label} width={20} height={20} className="size-5" />
            ) : (
              <IconGlobe size="sm" />
            )}
          </NextLink>
        ))}
      </div>
    </div>
  );
}

function FooterCompanyRow({ className }: { className?: string }) {
  const { logoAlt, logoHref, awards, copyright } = useFooterContext();

  return (
    <div className={cn("flex min-w-0 flex-col gap-sp-24 md:flex-row md:items-center md:justify-between", className)}>
      <div className="flex min-w-0 items-center gap-sp-18">
        <NextLink href={logoHref} aria-label="Go to homepage" className="inline-flex h-5 w-9 items-center overflow-hidden">
          <Image src="/svg/logo-mini.svg" alt={logoAlt} width={36} height={20} className="h-5 w-9" />
        </NextLink>
        <p className="ds-text-body-md font-regular text-grey-40">{copyright}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-sp-16 gap-y-sp-12 md:justify-end">
        {awards.map((award) => (
          <span key={award.label} className="inline-flex items-center">
            {award.src ? (
              <Image
                src={award.src}
                alt={award.label}
                width={award.width ?? 72}
                height={award.height ?? 20}
                className="h-auto w-auto"
              />
            ) : (
              <span className="ds-text-body-sm font-regular text-grey-40">{award.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function FooterRoot({
  className,
  logoSrc = "/svg/logo.svg",
  logoAlt = "Defined.ai",
  logoHref = "/",
  title = "Couldn't find the right\ndataset for you?",
  subtitle = "",
  ctaLabel = "Get in touch",
  ctaHref = "#",
  companyDescription = "",
  columns = defaultColumns,
  legalLinks = defaultLegalLinks,
  socialLinks = defaultSocialLinks,
  awards = defaultAwards,
  copyright = "© 2025 DefinedCrowd. All rights reserved.",
  patternSrc = "/images/pattern-footer.png",
  children,
  ...props
}: FooterProps) {
  const contextValue: FooterContextValue = {
    logoSrc,
    logoAlt,
    logoHref,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    companyDescription,
    columns,
    legalLinks,
    socialLinks,
    awards,
    copyright,
    patternSrc,
  };

  return (
    <FooterContext.Provider value={contextValue}>
      <footer
        data-slot="footer"
        className={cn(
          "relative w-full min-w-[360px] overflow-hidden bg-grey-100 text-white",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute left-sp-16 right-sp-16 top-0 h-[284px] overflow-hidden bg-no-repeat md:left-sp-24 md:right-sp-24 md:h-[288px] lg:left-sp-48 lg:right-sp-48 lg:h-full"
          style={{ backgroundImage: `url(${patternSrc})`, backgroundPosition: "center top", backgroundSize: "1344px auto" }}
        />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-sp-48 px-sp-16 pb-sp-24 pt-sp-48 md:px-sp-24 lg:gap-sp-104 lg:px-sp-48 lg:pt-sp-104">
          {children ?? (
            <>
              <FooterBanner />
              <div className="flex min-w-0 flex-col gap-sp-40 lg:hidden">
                <FooterColumns />
                <FooterLegal />
                <FooterCompanyRow />
              </div>
              <div className="hidden min-w-0 lg:flex lg:flex-col lg:gap-sp-40">
                <div className="flex min-w-0 items-start justify-between gap-sp-64">
                  <FooterCompany className="shrink-0" />
                  <FooterColumns className="flex-1" />
                </div>
                <FooterLegal />
              </div>
            </>
          )}
        </div>
      </footer>
    </FooterContext.Provider>
  );
}

type FooterCompound = ((props: FooterProps) => React.JSX.Element) & {
  Root: typeof FooterRoot;
  Banner: typeof FooterBanner;
  Columns: typeof FooterColumns;
  Column: typeof FooterColumn;
  Legal: typeof FooterLegal;
};

const Footer = FooterRoot as FooterCompound;

Footer.Root = FooterRoot;
Footer.Banner = FooterBanner;
Footer.Columns = FooterColumns;
Footer.Column = FooterColumn;
Footer.Legal = FooterLegal;

export { Footer, FooterRoot, FooterBanner, FooterColumns, FooterColumn, FooterLegal };
