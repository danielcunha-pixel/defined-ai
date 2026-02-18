"use client";

import * as React from "react";

import { Table } from "@/components/table";

const rows = [
  { id: "row-1", name: "Alpha", status: "Active", amount: "245" },
  { id: "row-2", name: "Delta", status: "Pending", amount: "123" },
  { id: "row-3", name: "Bravo", status: "Active", amount: "532" },
];

export function TableDemo() {
  const [sortBy, setSortBy] = React.useState<"name" | "status" | "amount" | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"none" | "asc" | "desc">("none");

  const cycleSort = React.useCallback((column: "name" | "status" | "amount") => {
    if (sortBy !== column) {
      setSortBy(column);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "none") {
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }

    setSortDirection("none");
    setSortBy(null);
  }, [sortBy, sortDirection]);

  const sortedRows = React.useMemo(() => {
    if (!sortBy || sortDirection === "none") {
      return rows;
    }

    const factor = sortDirection === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sortBy === "amount") {
        return (Number(a.amount) - Number(b.amount)) * factor;
      }
      return a[sortBy].localeCompare(b[sortBy]) * factor;
    });
  }, [sortBy, sortDirection]);

  const getSortState = (column: "name" | "status" | "amount") =>
    sortBy === column ? sortDirection : "none";

  return (
    <div className="w-full">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sort={getSortState("name")} onClick={() => cycleSort("name")}>
              Name
            </Table.Head>
            <Table.Head sortable sort={getSortState("status")} onClick={() => cycleSort("status")}>
              Status
            </Table.Head>
            <Table.Head sortable sort={getSortState("amount")} align="right" onClick={() => cycleSort("amount")}>
              Amount
            </Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell semiBold>{row.status}</Table.Cell>
              <Table.Cell align="right" numeric>
                {row.amount}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export function TableRowStatesDemo() {
  return (
    <div className="w-full">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sort="none">Cell header</Table.Head>
            <Table.Head sortable sort="asc">Cell header</Table.Head>
            <Table.Head sortable sort="desc" align="right">Cell header</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row state="default">
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell align="right" numeric>123</Table.Cell>
          </Table.Row>
          <Table.Row state="hover">
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell align="right" numeric>123</Table.Cell>
          </Table.Row>
          <Table.Row state="selected">
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell>Cell content</Table.Cell>
            <Table.Cell align="right" numeric>123</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export function TableHeaderCellsDemo() {
  return (
    <div className="w-full">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sort="none">Cell header</Table.Head>
            <Table.Head sortable sort="asc">Cell header</Table.Head>
            <Table.Head sortable sort="desc" align="right">Cell header</Table.Head>
          </Table.Row>
          <Table.Row>
            <Table.Head sortable disabled sort="none">Cell header</Table.Head>
            <Table.Head sortable disabled sort="none">Cell header</Table.Head>
            <Table.Head sortable disabled sort="none" align="right">Cell header</Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>
    </div>
  );
}
