"use client";

import * as React from "react";
import { ICON_SIZES, type IconSizeToken } from "@/components/icons/icon-tokens";

// ── Stroked icons ────────────────────────────
import { IconPlaceholder } from "@/components/icons/stroked/Placeholder";
import { IconChevronUp } from "@/components/icons/stroked/ChevronUp";
import { IconChevronDown } from "@/components/icons/stroked/ChevronDown";
import { IconChevronLeft } from "@/components/icons/stroked/ChevronLeft";
import { IconChevronRight } from "@/components/icons/stroked/ChevronRight";
import { IconSearch } from "@/components/icons/stroked/Search";
import { IconMinus } from "@/components/icons/stroked/Minus";
import { IconList } from "@/components/icons/stroked/List";
import { IconCheck } from "@/components/icons/stroked/Check";
import { IconGrid } from "@/components/icons/stroked/Grid";
import { IconMicrophone } from "@/components/icons/stroked/Microphone";
import { IconImage } from "@/components/icons/stroked/ImageIcon";
import { IconVideo } from "@/components/icons/stroked/Video";
import { IconText } from "@/components/icons/stroked/Text";
import { IconSend } from "@/components/icons/stroked/Send";
import { IconDownloadCloud } from "@/components/icons/stroked/DownloadCloud";
import { IconX } from "@/components/icons/stroked/X";
import { IconGlobe } from "@/components/icons/stroked/Globe";
import { IconPackage } from "@/components/icons/stroked/Package";
import { IconVoice } from "@/components/icons/stroked/Voice";
import { IconArrowUpRight } from "@/components/icons/stroked/ArrowUpRight";
import { IconCornerDownRight } from "@/components/icons/stroked/CornerDownRight";
import { IconAlertCircle } from "@/components/icons/stroked/AlertCircle";
import { IconArrowLeft } from "@/components/icons/stroked/ArrowLeft";
import { IconMenu } from "@/components/icons/stroked/Menu";
import { IconSliders } from "@/components/icons/stroked/Sliders";
import { IconHome } from "@/components/icons/stroked/Home";
import { IconArrowRight } from "@/components/icons/stroked/ArrowRight";
import { IconDatabase } from "@/components/icons/stroked/Database";
import { IconGenAI } from "@/components/icons/stroked/GenAI";
import { IconChip } from "@/components/icons/stroked/Chip";
import { IconGroup } from "@/components/icons/stroked/Group";
import { IconBarChart } from "@/components/icons/stroked/BarChart";
import { IconMonitor } from "@/components/icons/stroked/Monitor";
import { IconTool } from "@/components/icons/stroked/Tool";
import { IconRobot } from "@/components/icons/stroked/Robot";
import { IconCode } from "@/components/icons/stroked/Code";
import { IconMessageSquare } from "@/components/icons/stroked/MessageSquare";
import { IconCaseStudy } from "@/components/icons/stroked/CaseStudy";
import { IconFileText } from "@/components/icons/stroked/FileText";
import { IconRobotChat } from "@/components/icons/stroked/RobotChat";
import { IconFilter } from "@/components/icons/stroked/Filter";
import { IconZap } from "@/components/icons/stroked/Zap";
import { IconHand } from "@/components/icons/stroked/Hand";
import { IconDollarSign } from "@/components/icons/stroked/DollarSign";
import { IconIman } from "@/components/icons/stroked/Iman";
import { IconTarget } from "@/components/icons/stroked/Target";

// ── Filled icons ─────────────────────────────
import { IconXMarkFilled } from "@/components/icons/filled/XMarkFilled";
import { IconAlertCircleFilled } from "@/components/icons/filled/AlertCircleFilled";
import { IconCheckCircleFilled } from "@/components/icons/filled/CheckCircleFilled";
import { IconInfoFilled } from "@/components/icons/filled/InfoFilled";

// ── Icon registry ────────────────────────────

interface IconEntry {
  name: string;
  component: React.ComponentType<{ size?: IconSizeToken | number; className?: string }>;
  category: "stroked" | "filled";
}

const STROKED_ICONS: IconEntry[] = [
  { name: "Placeholder", component: IconPlaceholder, category: "stroked" },
  { name: "ChevronUp", component: IconChevronUp, category: "stroked" },
  { name: "ChevronDown", component: IconChevronDown, category: "stroked" },
  { name: "ChevronLeft", component: IconChevronLeft, category: "stroked" },
  { name: "ChevronRight", component: IconChevronRight, category: "stroked" },
  { name: "Search", component: IconSearch, category: "stroked" },
  { name: "Minus", component: IconMinus, category: "stroked" },
  { name: "List", component: IconList, category: "stroked" },
  { name: "Check", component: IconCheck, category: "stroked" },
  { name: "Grid", component: IconGrid, category: "stroked" },
  { name: "Microphone", component: IconMicrophone, category: "stroked" },
  { name: "Image", component: IconImage, category: "stroked" },
  { name: "Video", component: IconVideo, category: "stroked" },
  { name: "Text", component: IconText, category: "stroked" },
  { name: "Send", component: IconSend, category: "stroked" },
  { name: "DownloadCloud", component: IconDownloadCloud, category: "stroked" },
  { name: "X", component: IconX, category: "stroked" },
  { name: "Globe", component: IconGlobe, category: "stroked" },
  { name: "Package", component: IconPackage, category: "stroked" },
  { name: "Voice", component: IconVoice, category: "stroked" },
  { name: "ArrowUpRight", component: IconArrowUpRight, category: "stroked" },
  { name: "CornerDownRight", component: IconCornerDownRight, category: "stroked" },
  { name: "AlertCircle", component: IconAlertCircle, category: "stroked" },
  { name: "ArrowLeft", component: IconArrowLeft, category: "stroked" },
  { name: "Menu", component: IconMenu, category: "stroked" },
  { name: "Sliders", component: IconSliders, category: "stroked" },
  { name: "Home", component: IconHome, category: "stroked" },
  { name: "ArrowRight", component: IconArrowRight, category: "stroked" },
  { name: "Database", component: IconDatabase, category: "stroked" },
  { name: "GenAI", component: IconGenAI, category: "stroked" },
  { name: "Chip", component: IconChip, category: "stroked" },
  { name: "Group", component: IconGroup, category: "stroked" },
  { name: "BarChart", component: IconBarChart, category: "stroked" },
  { name: "Monitor", component: IconMonitor, category: "stroked" },
  { name: "Tool", component: IconTool, category: "stroked" },
  { name: "Robot", component: IconRobot, category: "stroked" },
  { name: "Code", component: IconCode, category: "stroked" },
  { name: "MessageSquare", component: IconMessageSquare, category: "stroked" },
  { name: "CaseStudy", component: IconCaseStudy, category: "stroked" },
  { name: "FileText", component: IconFileText, category: "stroked" },
  { name: "RobotChat", component: IconRobotChat, category: "stroked" },
  { name: "Filter", component: IconFilter, category: "stroked" },
  { name: "Zap", component: IconZap, category: "stroked" },
  { name: "Hand", component: IconHand, category: "stroked" },
  { name: "DollarSign", component: IconDollarSign, category: "stroked" },
  { name: "Iman", component: IconIman, category: "stroked" },
  { name: "Target", component: IconTarget, category: "stroked" },
];

const FILLED_ICONS: IconEntry[] = [
  { name: "XMarkFilled", component: IconXMarkFilled, category: "filled" },
  { name: "AlertCircleFilled", component: IconAlertCircleFilled, category: "filled" },
  { name: "CheckCircleFilled", component: IconCheckCircleFilled, category: "filled" },
  { name: "InfoFilled", component: IconInfoFilled, category: "filled" },
];

const SIZE_TOKENS: IconSizeToken[] = ["sm", "md", "lg", "xl"];

// ── Components ───────────────────────────────

function IconCell({ entry, activeSize }: { entry: IconEntry; activeSize: IconSizeToken }) {
  const Icon = entry.component;
  return (
    <div className="group flex flex-col items-center gap-sp-8 rounded-[8px] border border-grey-10 bg-white p-sp-16 transition-colors hover:border-grey-20 hover:bg-grey-5">
      <div className="flex items-center justify-center size-[48px]">
        <Icon size={activeSize} className="text-grey-100" />
      </div>
      <span className="ds-text-body-xs font-regular text-grey-60 text-center truncate w-full">
        {entry.name}
      </span>
    </div>
  );
}

function SizeSelector({
  activeSize,
  onChange,
}: {
  activeSize: IconSizeToken;
  onChange: (s: IconSizeToken) => void;
}) {
  return (
    <div className="flex items-center gap-sp-4 rounded-[8px] border border-grey-20 bg-grey-5 p-sp-4">
      {SIZE_TOKENS.map((token) => (
        <button
          key={token}
          onClick={() => onChange(token)}
          className={`
            flex items-center gap-sp-4 rounded-[4px] px-sp-10 py-sp-4
            ds-text-body-sm font-medium transition-colors
            ${
              activeSize === token
                ? "bg-white text-grey-100 shadow-[0px_1px_2px_0px_rgba(18,15,25,0.1),0px_0px_1px_0px_rgba(18,15,25,0.2)]"
                : "text-grey-60 hover:text-grey-100"
            }
          `}
        >
          {token}
          <span className="text-grey-40 ds-text-body-xs font-regular">
            {ICON_SIZES[token]}px
          </span>
        </button>
      ))}
    </div>
  );
}

export function IconGallery() {
  const [activeSize, setActiveSize] = React.useState<IconSizeToken>("lg");
  const [search, setSearch] = React.useState("");

  const filteredStroked = STROKED_ICONS.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFilled = FILLED_ICONS.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-sp-32">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-sp-16">
        <SizeSelector activeSize={activeSize} onChange={setActiveSize} />
        <div className="relative w-full sm:w-auto">
          <IconSearch size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-40" />
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[240px] h-9 rounded-[8px] border border-grey-20 bg-white pl-9 pr-3 ds-text-body-sm font-regular text-grey-100 placeholder:text-grey-40 outline-none focus:border-purple-70 transition-colors"
          />
        </div>
      </div>

      {/* Stroked section */}
      <section>
        <div className="flex items-center gap-sp-8 mb-sp-16">
          <h3 className="ds-text-heading-sm font-semibold text-grey-100">
            Stroked
          </h3>
          <span className="ds-text-body-sm font-regular text-grey-50">
            {filteredStroked.length} icons
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-sp-8">
          {filteredStroked.map((entry) => (
            <IconCell key={entry.name} entry={entry} activeSize={activeSize} />
          ))}
        </div>
        {filteredStroked.length === 0 && (
          <p className="ds-text-body-sm font-regular text-grey-40 py-sp-24 text-center">
            No stroked icons match &ldquo;{search}&rdquo;
          </p>
        )}
      </section>

      {/* Filled section */}
      <section>
        <div className="flex items-center gap-sp-8 mb-sp-16">
          <h3 className="ds-text-heading-sm font-semibold text-grey-100">
            Filled
          </h3>
          <span className="ds-text-body-sm font-regular text-grey-50">
            {filteredFilled.length} icons
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-sp-8">
          {filteredFilled.map((entry) => (
            <IconCell key={entry.name} entry={entry} activeSize={activeSize} />
          ))}
        </div>
        {filteredFilled.length === 0 && (
          <p className="ds-text-body-sm font-regular text-grey-40 py-sp-24 text-center">
            No filled icons match &ldquo;{search}&rdquo;
          </p>
        )}
      </section>

      {/* Size reference table */}
      <section>
        <h3 className="ds-text-heading-sm font-semibold text-grey-100 mb-sp-16">
          Size & Stroke Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full ds-text-body-sm font-regular text-grey-100">
            <thead>
              <tr className="border-b border-grey-20 text-left">
                <th className="py-sp-8 pr-sp-16 font-semibold">Token</th>
                <th className="py-sp-8 pr-sp-16 font-semibold">Size (px)</th>
                <th className="py-sp-8 pr-sp-16 font-semibold">Default Stroke</th>
                <th className="py-sp-8 font-semibold">Preview</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TOKENS.map((token) => (
                <tr key={token} className="border-b border-grey-10">
                  <td className="py-sp-12 pr-sp-16">
                    <code className="text-purple-70 bg-purple-5 px-sp-4 py-sp-2 rounded-[4px] ds-text-body-xs font-medium">
                      {token}
                    </code>
                  </td>
                  <td className="py-sp-12 pr-sp-16">{ICON_SIZES[token]}</td>
                  <td className="py-sp-12 pr-sp-16">
                    {token === "sm" ? "1.5" : token === "md" ? "1.75" : token === "lg" ? "2" : "2.25"}
                  </td>
                  <td className="py-sp-12">
                    <div className="flex items-center gap-sp-12">
                      <IconSearch size={token} className="text-grey-100" />
                      <IconCheck size={token} className="text-grey-100" />
                      <IconHome size={token} className="text-grey-100" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
