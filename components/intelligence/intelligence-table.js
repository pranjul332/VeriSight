"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,  
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IntelligenceDetailDialog } from "@/components/intelligence/intelligence-detail-dialog";
import { mockIntelligenceData } from "@/data/mock-intelligence-data";
import { Badge } from "@/components/ui/badge";

export function IntelligenceTable() {
  const [sorting, setSorting] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        const date = new Date(row.getValue("timestamp"));
        return <div>{date.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        return <div>{row.getValue("source")}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        const colorMap = {
          "social-media": "bg-blue-500",
          "news-article": "bg-green-500",
          "forum-post": "bg-yellow-500",
          document: "bg-purple-500",
          image: "bg-pink-500",
        };

        return (
          <Badge
            className={`${colorMap[type] || "bg-gray-500"} hover:${
              colorMap[type] || "bg-gray-600"
            }`}
          >
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "confidenceScore",
      header: "Confidence",
      cell: ({ row }) => {
        const score = parseFloat(row.getValue("confidenceScore")) * 100;
        let colorClass = "text-red-500";

        if (score >= 80) colorClass = "text-green-500";
        else if (score >= 50) colorClass = "text-yellow-500";

        return (
          <div className={`font-medium ${colorClass}`}>{score.toFixed(0)}%</div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" onClick={() => setSelectedItem(row.original)}>
            View
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mockIntelligenceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4">
        <Input placeholder="Filter intelligence data..." className="max-w-sm" />
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">Add Source</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No intelligence data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedItem && (
        <IntelligenceDetailDialog
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
