import { FilterButton } from "@/components/ui/filter-button";

const sampleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
];

type StateRow = {
  label: string;
  previewState: "enabled" | "hover" | "pressed" | "disabled";
  previewFilled?: boolean;
  previewCount?: number;
};

const stateRows: StateRow[] = [
  { label: "Filter", previewState: "enabled" },
  { label: "Filter", previewState: "hover" },
  { label: "Filter", previewState: "pressed" },
  { label: "Filter", previewState: "disabled" },
  { label: "Filter", previewState: "enabled", previewFilled: true, previewCount: 1 },
  { label: "Filter", previewState: "hover",   previewFilled: true, previewCount: 1 },
  { label: "Filter", previewState: "pressed", previewFilled: true, previewCount: 1 },
  { label: "Filter", previewState: "disabled", previewFilled: true, previewCount: 1 },
  { label: "Category", previewState: "enabled", previewFilled: true, previewCount: 3 },
  { label: "Category", previewState: "hover",   previewFilled: true, previewCount: 3 },
  { label: "Category", previewState: "pressed", previewFilled: true, previewCount: 3 },
  { label: "Category", previewState: "disabled", previewFilled: true, previewCount: 3 },
];

export default function FiltersVisualQaPage() {
  return (
    <div className="flex flex-col gap-sp-32 p-sp-32">
      <header className="flex flex-col gap-sp-8">
        <h1 className="ds-text-heading-lg font-semibold text-grey-100">Filter Button QA</h1>
        <p className="ds-text-body-lg font-regular text-grey-70">
          Visual regression for all Filter Button states and variants.
        </p>
      </header>

      {/* State matrix */}
      <section className="flex flex-col gap-sp-12">
        <h2 className="ds-text-heading-sm font-semibold text-grey-100">All states</h2>
        <div className="rounded-[12px] border border-grey-20 bg-white p-sp-24">
          <div className="grid grid-cols-[1fr_auto] items-center gap-x-sp-32 gap-y-sp-16">
            {stateRows.map((row, i) => (
              <>
                <span key={`label-${i}`} className="ds-text-body-lg font-regular text-grey-60">
                  {row.previewFilled
                    ? `Filled${row.previewCount && row.previewCount > 1 ? ` (+1)` : ""} / ${row.previewState}`
                    : `Empty / ${row.previewState}`}
                </span>
                <FilterButton
                  key={`btn-${i}`}
                  label={row.label}
                  options={sampleOptions}
                  previewState={row.previewState}
                  previewFilled={row.previewFilled}
                  previewCount={row.previewCount}
                />
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="flex flex-col gap-sp-12">
        <h2 className="ds-text-heading-sm font-semibold text-grey-100">Interactive demo</h2>
        <p className="ds-text-body-lg font-regular text-grey-60">
          Click to open dropdown, select options, then clear with the ✕ / badge.
        </p>
        <div className="rounded-[12px] border border-grey-20 bg-white p-sp-24 pb-[320px]">
          <div className="flex flex-wrap gap-sp-8">
            <FilterButton label="Category" options={sampleOptions} />
            <FilterButton label="Type" options={sampleOptions} />
            <FilterButton label="Status" options={sampleOptions} showSearch={false} />
          </div>
        </div>
      </section>
    </div>
  );
}
