import type { Metadata } from "next";
import {
  colorGroups,
  spacingTokens,
  radiusTokens,
  typographyGroups,
  typographyTokens,
  groupBySizeRole,
  weightLabel,
} from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "Design Tokens",
  description: "Visual reference for all design tokens: colors, spacing, radius, and typography.",
};

function ColorSwatch({
  name,
  value,
  cssVar,
}: {
  name: string;
  value: string;
  cssVar: string;
}) {
  const isTransparent = name.startsWith("t-");
  const isLight =
    value.toLowerCase().startsWith("#f") ||
    value.toLowerCase().startsWith("#e") ||
    value.toLowerCase().startsWith("#d") ||
    value.toLowerCase().startsWith("#c") ||
    value.toLowerCase().startsWith("#ffffff");

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "h-12 w-full rounded-[6px] border border-grey-20",
          isTransparent && "bg-[repeating-conic-gradient(#e5e5e5_0%_25%,transparent_0%_50%)] bg-[size:12px_12px]"
        )}
      >
        <div
          className="h-full w-full rounded-[6px]"
          style={{ backgroundColor: value }}
        />
      </div>
      <div className="flex flex-col">
        <span className="ds-text-body-sm font-medium text-grey-80">
          {name}
        </span>
        <span className="font-mono text-[11px] text-grey-50">{value}</span>
      </div>
    </div>
  );
}

function SpacingBar({
  name,
  value,
  px,
}: {
  name: string;
  value: string;
  px: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 shrink-0">
        <span className="ds-text-body-sm font-medium text-grey-80">
          {name}
        </span>
      </div>
      <div className="flex-1">
        <div
          className="h-4 rounded-[2px] bg-purple-50"
          style={{ width: `${Math.min(px, 300)}px` }}
        />
      </div>
      <div className="w-12 shrink-0 text-right">
        <span className="font-mono text-[11px] text-grey-50">{value}</span>
      </div>
    </div>
  );
}

function RadiusPreview({
  name,
  value,
  px,
}: {
  name: string;
  value: string;
  px: number | string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="size-16 border-2 border-purple-50 bg-purple-10"
        style={{ borderRadius: value }}
      />
      <div className="flex flex-col items-center">
        <span className="ds-text-body-sm font-medium text-grey-80">
          {name}
        </span>
        <span className="font-mono text-[11px] text-grey-50">{value}</span>
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="border-b border-grey-10 pb-6">
        <Tag className="mb-2 inline-flex" color="orange">Tokens</Tag>
        <h1 className="ds-text-heading-xl font-semibold text-grey-100 mb-2">Design Tokens</h1>
        <p className="ds-text-body-lg font-regular text-grey-60">
          Visual reference for all design tokens. These values are the single
          source of truth defined in <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">globals.css</code> and <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">lib/tokens.ts</code>.
        </p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-6">Colors</h2>
        <div className="flex flex-col gap-8">
          {colorGroups.map((group) => (
            <div key={group.name}>
              <h3 className="ds-text-heading-xs font-semibold text-grey-80 mb-3">
                {group.name}
              </h3>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11">
                {group.colors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-6">
          Spacing
        </h2>
        <div className="flex flex-col gap-2 rounded-[12px] border border-grey-20 p-4">
          {spacingTokens
            .filter((t) => t.px > 0 && t.px <= 128)
            .map((token) => (
              <SpacingBar key={token.name} {...token} />
            ))}
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-6">
          Border Radius
        </h2>
        <div className="flex flex-wrap gap-6 rounded-[12px] border border-grey-20 p-6">
          {radiusTokens.map((token) => (
            <RadiusPreview key={token.name} {...token} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-2">
          Typography
        </h2>
        <p className="ds-text-body-lg font-regular text-grey-60 mb-6">
          Each text style combines a size role (<code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">ds-text-*</code>)
          with a weight utility (<code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">font-*</code>).
        </p>

        <div className="flex flex-col gap-8">
          {typographyGroups.map((group) => {
            const roles = groupBySizeRole(group);
            return (
              <div key={group.name}>
                <h3 className="ds-text-heading-xs font-semibold text-grey-80 mb-3">
                  {group.name}
                </h3>
                <div className="overflow-x-auto rounded-[12px] border border-grey-20">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-grey-20 bg-grey-5">
                        <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">Role</th>
                        <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">Class</th>
                        <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">Preview</th>
                        <th className="hidden px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70 sm:table-cell">Size</th>
                        <th className="hidden px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70 md:table-cell">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-grey-10">
                      {roles.map((role) =>
                        role.variants.map((token, vi) => (
                          <tr key={token.className} className="hover:bg-grey-5 transition-colors">
                            {/* Role name: only show for first variant in group */}
                            {vi === 0 ? (
                              <td
                                className="px-4 py-3 ds-text-body-sm font-medium text-grey-80 align-top"
                                rowSpan={role.variants.length}
                              >
                                {role.label}
                              </td>
                            ) : null}
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] font-medium text-purple-70">
                                  {token.sizeClass}
                                </code>
                                <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[11px] font-medium text-grey-60">
                                  {token.weightClass}
                                </code>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={cn(token.sizeClass, token.weightClass, "text-grey-100")}>
                                {role.label}
                              </span>
                            </td>
                            <td className="hidden px-4 py-3 sm:table-cell">
                              <span className="font-mono text-[11px] text-grey-50">
                                {token.fontSize} / {token.lineHeight}
                              </span>
                            </td>
                            <td className="hidden px-4 py-3 md:table-cell">
                              <span className="font-mono text-[11px] text-grey-50">
                                {weightLabel(token.fontWeight)}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legacy Mapping */}
      <section>
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-2">
          Legacy Mapping
        </h2>
        <p className="ds-text-body-md font-regular text-grey-50 mb-4">
          Old <code className="rounded bg-grey-10 px-1 py-0.5 text-[11px] font-medium text-grey-60">typo-desktop-*</code> classes
          are deprecated. They still work as aliases but should be replaced with the new system.
        </p>
        <div className="overflow-x-auto rounded-[12px] border border-grey-20">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-grey-20 bg-grey-5">
                <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">Old Class</th>
                <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">New Classes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-10">
              {typographyTokens.map((token) => (
                <tr key={token.legacyClass} className="hover:bg-grey-5 transition-colors">
                  <td className="px-4 py-2.5">
                    <code className="rounded bg-red-10 px-1.5 py-0.5 text-[11px] font-medium text-red-70 line-through">
                      {token.legacyClass}
                    </code>
                  </td>
                  <td className="px-4 py-2.5">
                    <code className="rounded bg-green-10 px-1.5 py-0.5 text-[11px] font-medium text-green-70">
                      {token.sizeClass} {token.weightClass}
                    </code>
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
