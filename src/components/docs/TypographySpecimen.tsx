"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown as ChevronDown } from "@/components/icons";
import {
  typographyGroups,
  groupBySizeRole,
  weightLabel,
  type TypographyToken,
  type TypographyGroup,
  type TypographySizeRole,
} from "@/lib/tokens";

// ============================================
// Helpers
// ============================================

const SAMPLE_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.";
const SAMPLE_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function getSample(fontSize: string): string {
  const px = parseInt(fontSize, 10);
  return px >= 32 ? SAMPLE_SHORT : SAMPLE_LONG;
}

function formatLineHeightPercent(
  fontSize: string,
  lineHeight: string
): string {
  const fs = parseInt(fontSize, 10);
  const lh = parseInt(lineHeight, 10);
  return `${Math.round((lh / fs) * 100)}%`;
}

// ============================================
// Size Role Group (parent row + weight variants)
// ============================================

function SizeRoleGroup({ role }: { role: TypographySizeRole }) {
  const hasMultipleVariants = role.variants.length > 1;

  // Single-variant roles render a simple full-width specimen
  if (!hasMultipleVariants) {
    const token = role.variants[0];
    return (
      <div className="border-b border-grey-10 py-5 last:border-b-0">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr_140px] md:gap-6 md:items-baseline">
          {/* Left: Role label + class info */}
          <div className="flex flex-col gap-1">
            <span className="ds-text-body-md font-medium text-grey-90">
              {role.label}
            </span>
            <code className="text-[11px] font-mono text-purple-70 break-all leading-relaxed">
              {token.sizeClass}
            </code>
            <code className="text-[11px] font-mono text-grey-40 break-all leading-relaxed">
              {token.weightClass}
            </code>
          </div>

          {/* Middle: Live sample */}
          <div className="min-w-0">
            <p
              className={cn(
                token.sizeClass,
                token.weightClass,
                "text-grey-100 break-words"
              )}
            >
              {getSample(token.fontSize)}
            </p>
          </div>

          {/* Right: Meta */}
          <div className="flex flex-row gap-3 text-[11px] font-mono md:flex-col md:items-end md:gap-0.5">
            <span className="text-grey-40">
              {token.fontSize} / {token.lineHeight}
            </span>
            <span className="text-grey-30">
              {formatLineHeightPercent(token.fontSize, token.lineHeight)}
            </span>
            <span className="text-grey-30">
              {weightLabel(token.fontWeight)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Multi-variant roles: parent header + indented weight sub-rows
  return (
    <div className="border-b border-grey-10 last:border-b-0">
      {/* Parent: size role header */}
      <div className="flex items-baseline gap-4 pt-5 pb-2 md:gap-6">
        <div className="w-[200px] shrink-0">
          <span className="ds-text-body-md font-medium text-grey-90">
            {role.label}
          </span>
        </div>
        <div className="flex items-baseline gap-3 text-[11px] font-mono">
          <code className="text-purple-70">{role.sizeClass}</code>
          <span className="text-grey-30">
            {role.fontSize} / {role.lineHeight}
          </span>
          <span className="text-grey-30">
            {formatLineHeightPercent(role.fontSize, role.lineHeight)}
          </span>
        </div>
      </div>

      {/* Weight variant sub-rows */}
      <div className="flex flex-col pb-2">
        {role.variants.map((token) => (
          <div
            key={token.className}
            className="grid grid-cols-1 gap-2 py-2.5 md:grid-cols-[200px_1fr_140px] md:gap-6 md:items-baseline"
          >
            {/* Left: weight pill */}
            <div className="flex items-center gap-2 md:pl-4">
              <div className="hidden md:block h-px w-3 bg-grey-20" />
              <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] font-medium text-grey-60">
                {token.weightClass}
              </code>
              <span className="text-[11px] text-grey-40">
                {token.fontWeight}
              </span>
            </div>

            {/* Middle: Live sample */}
            <div className="min-w-0">
              <p
                className={cn(
                  token.sizeClass,
                  token.weightClass,
                  "text-grey-100 break-words"
                )}
              >
                {getSample(token.fontSize)}
              </p>
            </div>

            {/* Right: weight label */}
            <div className="hidden md:flex md:items-end md:justify-end">
              <span className="text-[11px] font-mono text-grey-30">
                {weightLabel(token.fontWeight)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Details Accordion (collapsible dev reference)
// ============================================

function DetailsAccordion({ groups }: { groups: TypographyGroup[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 rounded-[12px] border border-grey-20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-grey-5"
        aria-expanded={open}
      >
        <span className="ds-text-body-md font-medium text-grey-70">
          Developer Reference
        </span>
        <ChevronDown
          size="sm"
          className={cn(
            "text-grey-40 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-grey-20 px-5 py-4">
          {groups.map((group) => (
            <div key={group.name} className="mb-6 last:mb-0">
              <h4 className="ds-text-body-sm font-semibold uppercase tracking-wider text-grey-50 mb-3">
                {group.name}
              </h4>
              <div className="overflow-x-auto rounded-[8px] border border-grey-20">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-grey-20 bg-grey-5">
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Style
                      </th>
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Size Class
                      </th>
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Weight
                      </th>
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Size
                      </th>
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Line Height
                      </th>
                      <th className="px-3 py-2 ds-text-body-sm font-semibold text-grey-70">
                        Legacy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey-10">
                    {group.tokens.map((t) => (
                      <tr
                        key={t.className}
                        className="hover:bg-grey-5 transition-colors"
                      >
                        <td className="px-3 py-2 ds-text-body-sm font-regular text-grey-80">
                          {t.name}
                        </td>
                        <td className="px-3 py-2">
                          <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] font-medium text-purple-70">
                            {t.sizeClass}
                          </code>
                        </td>
                        <td className="px-3 py-2">
                          <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] font-medium text-grey-60">
                            {t.weightClass}
                          </code>
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-grey-50">
                          {t.fontSize}
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-grey-50">
                          {t.lineHeight}
                        </td>
                        <td className="px-3 py-2">
                          <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] text-grey-40 line-through">
                            {t.legacyClass}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Main export
// ============================================

export function TypographySpecimen() {
  return (
    <div className="flex flex-col gap-10">
      {/* Intro */}
      <div className="rounded-[12px] border border-grey-20 bg-grey-5 px-5 py-4">
        <p className="ds-text-body-md font-regular text-grey-60">
          Typography styles are composed of a{" "}
          <strong className="font-semibold text-grey-80">size role</strong> and a{" "}
          <strong className="font-semibold text-grey-80">weight utility</strong>.
          Choose a size class (<code className="rounded bg-grey-10 px-1 py-0.5 text-[11px] font-medium text-purple-70">ds-text-*</code>)
          for dimensions, then pair it with a weight class
          (<code className="rounded bg-grey-10 px-1 py-0.5 text-[11px] font-medium text-purple-70">font-*</code>)
          to complete the style.
        </p>
      </div>

      {/* Type Scale — grouped by size role */}
      {typographyGroups.map((group) => {
        const roles = groupBySizeRole(group);
        return (
          <section key={group.name}>
            <div className="mb-1 flex items-center gap-3">
              <h3 className="ds-text-body-sm font-semibold uppercase tracking-wider text-grey-50">
                {group.name}
              </h3>
              <div className="h-px flex-1 bg-grey-10" />
            </div>
            <div className="flex flex-col">
              {roles.map((role) => (
                <SizeRoleGroup key={role.sizeClass} role={role} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Collapsible dev reference */}
      <DetailsAccordion groups={typographyGroups} />
    </div>
  );
}
