"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SortState = "none" | "asc" | "desc";
type RowState = "default" | "hover" | "selected";
type CellAlign = "left" | "right";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  responsive?: boolean;
}

export type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  state?: RowState;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
  sortable?: boolean;
  sort?: SortState;
  disabled?: boolean;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
  semiBold?: boolean;
  numeric?: boolean;
}

export interface TableSortIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  sort?: SortState;
  disabled?: boolean;
}

function TableRoot({ className, responsive = true, ...props }: TableProps) {
  return (
    <div className={cn("w-full", responsive ? "overflow-x-hidden min-w-0" : "overflow-x-auto")}>
      <table
        data-slot="table"
        className={cn(
          "w-full border-separate border-spacing-y-0 border-spacing-x-0",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: TableSectionProps) {
  return <thead data-slot="table-header" className={cn("bg-grey-10", className)} {...props} />;
}

function TableBody({ className, ...props }: TableSectionProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("bg-white [&>tr:last-child>td]:border-b-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, state = "default", ...props }: TableRowProps) {
  const stateClasses =
    state === "selected"
      ? "bg-grey-10"
      : state === "hover"
        ? "bg-grey-5"
        : "bg-transparent";

  const stateCursor = state === "hover" ? "cursor-pointer" : "cursor-pointer md:cursor-default";

  return (
    <tr
      data-slot="table-row"
      data-state={state}
      className={cn(
        "h-[39px] md:h-[44px]",
        stateClasses,
        stateCursor,
        className
      )}
      {...props}
    />
  );
}

function TableSortIndicator({ className, sort = "none", disabled = false, ...props }: TableSortIndicatorProps) {
  const upColor = disabled
    ? "border-b-[var(--color-text-disabled,#ccc9d6)]"
    : sort === "asc"
      ? "border-b-grey-100"
      : "border-b-grey-50";

  const downColor = disabled
    ? "border-t-[var(--color-text-disabled,#ccc9d6)]"
    : sort === "desc"
      ? "border-t-grey-100"
      : "border-t-grey-50";

  return (
    <span
      data-slot="table-sort-indicator"
      aria-hidden="true"
      className={cn("inline-flex size-4 flex-col items-center justify-center gap-[3px]", className)}
      {...props}
    >
      <span className={cn("h-0 w-0 border-x-[4px] border-x-transparent border-b-[4px]", upColor)} />
      <span className={cn("h-0 w-0 border-x-[4px] border-x-transparent border-t-[4px]", downColor)} />
    </span>
  );
}

function TableHead({
  className,
  align = "left",
  sortable = false,
  sort = "none",
  disabled = false,
  children,
  onClick,
  ...props
}: TableHeadProps) {
  const alignClasses = align === "right" ? "text-right" : "text-left";

  if (sortable) {
    return (
      <th
        data-slot="table-head"
        className={cn(
          "h-[39px] px-sp-4 py-[10px] align-middle md:h-[40px] md:px-sp-8 md:py-sp-12",
          "first:pl-[16px] last:pr-[16px] md:first:pl-[12px] md:last:pr-[12px]",
          "first:rounded-l-[8px] last:rounded-r-[8px]",
          className
        )}
        {...props}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
          className={cn(
            "group inline-flex w-full items-center gap-sp-4 pb-[3px] text-[14px] font-medium leading-normal md:text-[15px]",
            alignClasses,
            align === "right" && "justify-end",
            disabled
              ? "cursor-not-allowed text-[var(--color-text-disabled,#ccc9d6)]"
              : "cursor-pointer text-grey-70 hover:text-grey-100 active:text-grey-100 focus-visible:rounded-[4px] focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]"
          )}
        >
          <span className={cn("min-w-0", align === "right" ? "text-right" : "text-left")}>{children}</span>
          <TableSortIndicator sort={sort} disabled={disabled} />
        </button>
      </th>
    );
  }

  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-[39px] px-sp-4 py-[10px] text-[14px] font-medium leading-normal text-grey-70 align-middle md:h-[40px] md:px-sp-8 md:py-sp-12 md:text-[15px]",
        "first:pl-[16px] last:pr-[16px] md:first:pl-[12px] md:last:pr-[12px]",
        "first:rounded-l-[8px] last:rounded-r-[8px]",
        alignClasses,
        disabled && "text-[var(--color-text-disabled,#ccc9d6)]",
        className
      )}
      {...props}
    >
      <span className={cn("inline-flex w-full items-center pb-[3px]", align === "right" ? "justify-end" : "justify-start")}>
        {children}
      </span>
    </th>
  );
}

function TableCell({
  className,
  align = "left",
  semiBold = false,
  numeric = false,
  children,
  ...props
}: TableCellProps) {
  const alignClasses = align === "right" || numeric ? "text-right" : "text-left";

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-b border-grey-20 px-sp-4 py-[10px] align-middle text-[14px] leading-normal text-grey-100 md:px-sp-8 md:py-sp-12 md:text-[15px]",
        "first:pl-[16px] last:pr-[16px] md:first:pl-[12px] md:last:pr-[12px]",
        semiBold ? "font-semibold" : "font-regular",
        alignClasses,
        numeric && "tabular-nums",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <caption data-slot="table-caption" className={cn("mt-sp-8 text-left text-[13px] text-grey-70", className)} {...props} />;
}

function TableFooter({ className, ...props }: TableSectionProps) {
  return <tfoot data-slot="table-footer" className={cn("bg-grey-5", className)} {...props} />;
}

type TableCompound = ((props: TableProps) => React.JSX.Element) & {
  Root: typeof TableRoot;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Cell: typeof TableCell;
  Caption: typeof TableCaption;
  SortIndicator: typeof TableSortIndicator;
};

const Table = TableRoot as TableCompound;

Table.Root = TableRoot;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
Table.SortIndicator = TableSortIndicator;

export {
  Table,
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableSortIndicator,
};

export type { SortState, RowState, CellAlign };
