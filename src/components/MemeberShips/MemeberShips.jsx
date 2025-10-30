"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PlusCircle, Trash2 } from "lucide-react";
import TableSkeleton from "../Resources/TableSkeleton";
import CreateMembershipModal from "./Modal/CreateMembershipModal";

export default function Memberships({
  memberships,
  loading,
  setIsTrue,
  isTrue,
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const getBadge = (value) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold uppercase";
    switch (value) {
      case "active":
        return (
          <span className={`${base} bg-green-100 text-green-800`}>Active</span>
        );
      case "inactive":
        return (
          <span className={`${base} bg-red-100 text-red-800`}>Inactive</span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-800`}>{value}</span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Memberships</h2>
          <p className="text-gray-500 mt-1">
            Manage all your turf memberships here
          </p>
        </div>

        <Button onClick={() => setCreateModalOpen(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Membership
        </Button>
      </div>

      {/* Table */}
      <Card className="p-6 bg-white border-gray-200">
        {loading ? (
          <TableSkeleton row={10} column={10} />
        ) : memberships.length === 0 ? (
          <p className="text-center py-12 text-gray-500">
            No memberships found
          </p>
        ) : (
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberships.map((m, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.phone}</TableCell>
                    <TableCell>{m.planType?.name}</TableCell>
                    <TableCell>{m.planType?.duration}</TableCell>
                    <TableCell>{m.price}</TableCell>
                    <TableCell>{m.paidAmount}</TableCell>
                    <TableCell>{m.dueAmount}</TableCell>
                    <TableCell>{getBadge(m.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <CreateMembershipModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setIsTrue={setIsTrue}
        isTrue={isTrue}
      />
    </div>
  );
}
