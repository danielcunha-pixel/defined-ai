"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  IconAlertCircle,
  IconArrowRight,
  IconBarChart,
  IconCaseStudy,
  IconCode,
  IconDatabase,
  IconFileText,
  IconGenAI,
  IconGlobe,
  IconMessageSquare,
  IconRobot,
  IconRobotChat,
  IconSearch,
  IconInfoFilled,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type Entry = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

function PanelShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] bg-white",
        "shadow-[0px_1px_5px_-3px_var(--color-t-grey-30),0px_4px_20px_-10px_var(--color-t-grey-40)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_var(--color-grey-20)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.48px] text-grey-60">
      {children}
    </p>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,var(--color-white)_0%,var(--color-purple-10)_100%)] p-sp-8 shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-15),0px_0px_1px_0px_var(--color-t-grey-15)]">
      <span className="pointer-events-none absolute -inset-[4px] rounded-[12px] bg-[rgba(230,229,235,0.4)]" />
      <span className="relative inline-flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}

function EntryContent({ entry }: { entry: Entry }) {
  return (
    <Link
      href={entry.href}
      className="group flex w-full items-start gap-sp-16 rounded-[8px] bg-white p-sp-12 hover:bg-grey-5 active:bg-grey-10"
    >
      <IconBadge>{entry.icon}</IconBadge>
      <span className="flex min-w-0 flex-1 flex-col gap-sp-12 pt-[3px]">
        <span className="text-[15px] font-semibold text-grey-100">{entry.title}</span>
        <span className="text-[14px] font-normal text-grey-80">{entry.description}</span>
      </span>
      <span className="inline-flex self-stretch items-center">
        <IconArrowRight
          size="sm"
          className="text-grey-80 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100"
        />
      </span>
    </Link>
  );
}

const solutionsEntries: Entry[] = [
  {
    title: "Data Annotation",
    description: "Human-led labeling for text, audio, image, and video",
    href: "#",
    icon: <IconDatabase size="lg" className="text-purple-80" />,
  },
  {
    title: "Data Collection",
    description: "Global, diverse datasets for AI training at scale",
    href: "#",
    icon: <IconGlobe size="lg" className="text-purple-80" />,
  },
  {
    title: "Data & Model Evaluation",
    description: "Rigorous testing to ensure accuracy, fairness, and quality",
    href: "#",
    icon: <IconBarChart size="lg" className="text-purple-80" />,
  },
  {
    title: "Machine Translation",
    description: "High-quality multilingual content for global AI systems",
    href: "#",
    icon: <IconGenAI size="lg" className="text-purple-80" />,
  },
  {
    title: "Conversational AI",
    description: "Natural, bias-free voice and chat experiences worldwide",
    href: "#",
    icon: <IconMessageSquare size="lg" className="text-purple-80" />,
  },
  {
    title: "Accelerat",
    description: "Smarter multilingual AI agent support for global businesses",
    href: "#",
    icon: <IconRobot size="lg" className="text-purple-80" />,
  },
];

const resourcesEntries: Entry[] = [
  { title: "API documentation", description: "Start building app with defined.ai", href: "#", icon: <IconCode size="lg" className="text-purple-80" /> },
  { title: "Blog", description: "Your go-to blog for the latest in conversational AI, generative tech, and speech recognition", href: "#", icon: <IconMessageSquare size="lg" className="text-purple-80" /> },
  { title: "Case studies", description: "Explore our AI and ML case studies to see how we’ve helped Fortune 500 companies reach their goals", href: "#", icon: <IconCaseStudy size="lg" className="text-purple-80" /> },
  { title: "Use Cases", description: "Detailed use cases for a wide range of AI solutions", href: "#", icon: <IconSearch size="lg" className="text-purple-80" /> },
  { title: "White papers", description: "See how our AI and ML case studies helped companies achieve their goals", href: "#", icon: <IconFileText size="lg" className="text-purple-80" /> },
  { title: "AI Avatars & Voice Bots", description: "Discover how AI-powered avatars are transforming digital connections worldwide", href: "#", icon: <IconRobotChat size="lg" className="text-purple-80" /> },
  { title: "FAQ", description: "Answers to common questions about our AI data and solutions", href: "#", icon: <IconAlertCircle size="lg" className="text-purple-80" /> },
];

const industries = ["Financial Services", "Healthcare", "Automotive", "Retail", "Telecommunications"];
const useCases = ["Content Moderation", "Crowd-as-a-Service", "Speech Recognition"];

export function SubNavigationSolutionsDesktop({ className }: { className?: string }) {
  return (
    <PanelShell className={cn("w-[920px]", className)}>
      <div className="flex items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-sp-24 px-sp-24 py-sp-32">
          <div className="flex flex-col gap-sp-16">
            <div className="w-full pl-sp-12">
              <SectionLabel>Solutions</SectionLabel>
            </div>
            <div className="grid w-full grid-cols-2 gap-sp-16">
              <div className="flex flex-col gap-sp-8">
                {solutionsEntries.slice(0, 3).map((entry) => (
                  <EntryContent key={entry.title} entry={entry} />
                ))}
              </div>
              <div className="flex flex-col gap-sp-8">
                {solutionsEntries.slice(3).map((entry) => (
                  <EntryContent key={entry.title} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="my-sp-32 self-stretch w-px bg-grey-20" />
        <div className="flex flex-col gap-sp-32 py-sp-32">
          <div className="flex w-[280px] flex-col gap-sp-24 px-sp-32">
            <SectionLabel>Industries</SectionLabel>
            <div className="flex flex-col gap-sp-16">
              {industries.map((item) => (
                <Link key={item} href="#" className="inline-flex w-fit rounded-[2px] text-[15px] font-medium leading-[15px] tracking-[0.3px] text-purple-70 hover:text-purple-80">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-[280px] flex-col gap-sp-24 px-sp-32">
            <SectionLabel>Use cases</SectionLabel>
            <div className="flex flex-col gap-sp-16">
              {useCases.map((item) => (
                <Link key={item} href="#" className="inline-flex w-fit rounded-[2px] text-[15px] font-medium leading-[15px] tracking-[0.3px] text-purple-70 hover:text-purple-80">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export function SubNavigationResourcesDesktop({ className }: { className?: string }) {
  const caseStudyImage = "http://localhost:3845/assets/43201652fcd0ade23fd463fa8837f63c08b03b90.png";

  return (
    <PanelShell className={cn("h-[630px] w-[920px]", className)}>
      <div className="flex h-full items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-sp-16 px-sp-24 py-sp-32">
          <div className="w-full pl-sp-12">
            <SectionLabel>Resources</SectionLabel>
          </div>
          <div className="flex flex-col gap-sp-8">
            {resourcesEntries.map((entry) => (
              <EntryContent key={entry.title} entry={entry} />
            ))}
          </div>
        </div>

        <div className="self-stretch w-px bg-grey-20" />

        <div className="flex w-[304px] flex-col self-stretch">
          <div className="flex flex-col gap-sp-32 p-sp-32">
            <SectionLabel>Case study</SectionLabel>
            <div className="flex flex-col gap-sp-20">
              <div className="flex flex-col gap-sp-20">
                <p className="text-[16px] font-semibold text-grey-100">
                  Using High-Quality, Ethical Speech Data to train ASR Models
                </p>
                <div className="relative h-[140px] w-[224px]">
                  <div className="absolute -inset-[6px] rounded-[12px] bg-[rgba(18,15,25,0.03)]" />
                  <div className="relative h-full w-full overflow-hidden rounded-[8px] border border-grey-20 bg-white p-sp-8 shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-15),0px_0px_1px_0px_var(--color-t-grey-80)]">
                    <img
                      src={caseStudyImage}
                      alt="Case study preview"
                      className="h-full w-full rounded-[2px] object-cover"
                    />
                  </div>
                </div>
              </div>
              <Link href="#" className="inline-flex items-center gap-sp-4 text-purple-70">
                <span className="text-[15px] font-medium leading-[15px] tracking-[0.3px]">Read more</span>
                <IconArrowRight size="sm" />
              </Link>
            </div>
          </div>

          <div className="h-px bg-grey-20" />

          <div className="flex flex-col gap-sp-24 p-sp-32">
            <SectionLabel>Other</SectionLabel>
            <div className="flex flex-col gap-sp-16">
              {["Ethical AI", "Events", "Press room"].map((item) => (
                <Link key={item} href="#" className="inline-flex w-fit rounded-[2px] text-[15px] font-medium leading-[15px] tracking-[0.3px] text-purple-70 hover:text-purple-80">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export function SubNavigationAboutDesktop({ className }: { className?: string }) {
  const aboutEntries: Entry[] = [
    {
      title: "Who we are",
      description: "Meet Defined.ai — shaping the future of AI together",
      href: "#",
      icon: <IconInfoFilled size="lg" className="text-purple-80" />,
    },
    {
      title: "Careers",
      description: "Shape tomorrow’s AI — your journey starts here",
      href: "#",
      icon: <IconCaseStudy size="lg" className="text-purple-80" />,
    },
  ];

  return (
    <PanelShell className={cn("w-[920px]", className)}>
      <div className="flex min-h-[560px] flex-col gap-sp-24 px-sp-24 py-sp-32">
        <div className="w-full pl-sp-12">
          <SectionLabel>About</SectionLabel>
        </div>
        <div className="flex flex-col gap-sp-16">
          {aboutEntries.map((entry) => (
            <EntryContent key={entry.title} entry={entry} />
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
