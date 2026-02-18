"use client";

import { useState } from "react";

import { Dropdown } from "@/components/ui/dropdown";
import { Table } from "@/components/table";

type RowState = "default" | "hover" | "selected";
type SortState = "none" | "asc" | "desc";

const rowStateOptions = [
  { label: "Default", value: "default" },
  { label: "Hover", value: "hover" },
  { label: "Selected", value: "selected" },
];

const sortOptions = [
  { label: "None", value: "none" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export function TablePlaygroundWrapper() {
  const [rowState, setRowState] = useState<RowState>("default");
  const [sort, setSort] = useState<SortState>("none");
  const [numericSemiBold, setNumericSemiBold] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-grey-20 bg-white">
      <div className="border-b border-grey-20 px-6 py-4">
        <h2 className="mb-1 ds-text-heading-md font-semibold text-grey-100">Interactive Playground</h2>
        <p className="text-xs text-grey-60">Adjust controls to test the Table component live</p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="text-xs font-medium text-grey-60">PREVIEW</div>
          <div className="flex min-h-64 items-start justify-center rounded-[8px] border border-grey-20 bg-gradient-to-br from-grey-5 to-grey-10 p-6">
            <div className="w-full max-w-[960px]">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Head sortable sort={sort}>Cell header</Table.Head>
                    <Table.Head sortable sort="none">Cell header</Table.Head>
                    <Table.Head sortable sort="none" align="right">Cell header</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row state={rowState}>
                    <Table.Cell>Cell content</Table.Cell>
                    <Table.Cell semiBold>Cell content</Table.Cell>
                    <Table.Cell align="right" numeric semiBold={numericSemiBold}>123</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Cell content</Table.Cell>
                    <Table.Cell>Cell content</Table.Cell>
                    <Table.Cell align="right" numeric>123</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Cell content</Table.Cell>
                    <Table.Cell>Cell content</Table.Cell>
                    <Table.Cell align="right" numeric>123</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Dropdown
            size="medium"
            style="default"
            label="Row state"
            value={rowState}
            onValueChange={(value) => setRowState(value as RowState)}
            options={rowStateOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full max-w-[320px]"
          />

          <Dropdown
            size="medium"
            style="default"
            label="Sort"
            value={sort}
            onValueChange={(value) => setSort(value as SortState)}
            options={sortOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full max-w-[320px]"
          />

          <label className="flex items-center gap-2 text-sm font-medium text-grey-80">
            <input
              type="checkbox"
              checked={numericSemiBold}
              onChange={(event) => setNumericSemiBold(event.target.checked)}
              className="size-4 rounded border border-grey-40"
            />
            Numeric semi-bold
          </label>
        </div>
      </div>
    </div>
  );
}
