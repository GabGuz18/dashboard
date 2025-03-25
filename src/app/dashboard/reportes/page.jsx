'use client'

import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Input,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  DialogFooter,
  DialogClose,
  ProtectedRoute,
} from "@/components";
import { Copy } from 'lucide-react';

const data = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
  { id: 4, name: "Daniel Lee", email: "daniel@example.com", role: "User" },
  { id: 5, name: "Eleanor King", email: "eleanor@example.com", role: "Admin" },
  { id: 6, name: "Frank White", email: "frank@example.com", role: "Editor" },
];

const ITEMS_PER_PAGE = 5;

const Page = () => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);


  return (

    <ProtectedRoute>
      <div className="p-6 bg-white shadow-lg rounded-lg m-5">

        {/* Title */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        </div>

        {/* Search & Export Bar */}
        <div className="mb-4 flex justify-between items-center">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-full border border-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="p-4 text-left">ID</TableHead>
                <TableHead className="p-4 text-left">Name</TableHead>
                <TableHead className="p-4 text-left">Email</TableHead>
                <TableHead className="p-4 text-left">Role</TableHead>
                <TableHead className="p-4 text-left">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="p-4">{item.id}</TableCell>
                  <TableCell className="p-4">{item.name}</TableCell>
                  <TableCell className="p-4">{item.email}</TableCell>
                  <TableCell className="p-4">{item.role}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Share</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Share link</DialogTitle>
                          <DialogDescription>
                            Anyone who has this link will be able to view this.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                              Link
                            </Label>
                            <Input
                              id="link"
                              defaultValue="https://ui.shadcn.com/docs/installation"
                              readOnly
                            />
                          </div>
                          <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Copy</span>
                            <Copy />
                          </Button>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">Page {page} of {totalPages}</span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page
