"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

export default function Matches({ bookings, loading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.sport?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for status badges
  const getBadge = (type, value) => {
    const baseClasses =
      "px-2 py-1 rounded-full text-xs font-semibold uppercase";

    if (type === "payment") {
      switch (value) {
        case "paid":
          return (
            <span className={`${baseClasses} bg-green-100 text-green-800`}>
              Paid
            </span>
          );
        case "partial":
          return (
            <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
              Partial
            </span>
          );
        case "pending":
        case "unpaid":
          return (
            <span className={`${baseClasses} bg-red-100 text-red-800`}>
              Pending
            </span>
          );
        default:
          return (
            <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
              {value}
            </span>
          );
      }
    } else if (type === "match") {
      switch (value) {
        case "upcoming":
          return (
            <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
              Upcoming
            </span>
          );
        case "ongoing":
          return (
            <span className={`${baseClasses} bg-indigo-100 text-indigo-800`}>
              Ongoing
            </span>
          );
        case "completed":
          return (
            <span className={`${baseClasses} bg-green-100 text-green-800`}>
              Completed
            </span>
          );
        case "cancelled":
          return (
            <span className={`${baseClasses} bg-red-100 text-red-800`}>
              Cancelled
            </span>
          );
        default:
          return (
            <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
              {value}
            </span>
          );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bookings</h2>
          <p className="text-gray-500 mt-1">Manage all your bookings here</p>
        </div>
      </div>

      {/* Table Section */}
      <Card className="p-6 bg-white border-gray-200">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by name, email or sport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-gray-50 border-gray-300"
          />
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center py-12 text-gray-500">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No bookings found</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Sport</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Booking Amount</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Match Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((b, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {b.name} <br />
                        {b.phone}{" "}
                      </TableCell>
                      <TableCell>{b.sport}</TableCell>
                      <TableCell>
                        {b.date} <br />
                        {b.timeSlot}
                      </TableCell>
                      <TableCell>{b.paymentAmount}</TableCell>
                      <TableCell>{b.dueAmount}</TableCell>
                      <TableCell>{b.totalAmount}</TableCell>
                      <TableCell>
                        {getBadge("payment", b.payment_status)}
                      </TableCell>
                      <TableCell>{getBadge("match", b.match_status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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

            {/* Mobile Responsive Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredBookings.map((b, index) => (
                <Card
                  key={index}
                  className="p-4 border border-gray-200 bg-gray-50 shadow-sm"
                >
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {b.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {b.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {b.phone}
                    </p>
                    <p>
                      <strong>Sport:</strong> {b.sport}
                    </p>
                    <p>
                      <strong>Date:</strong> {b.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {b.timeSlot}
                    </p>
                    <p>
                      <strong>Booking Amount:</strong> {b.paymentAmount}
                    </p>
                    <p>
                      <strong>Due Amount:</strong> {b.dueAmount}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> {b.totalAmount}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {getBadge("payment", b.payment_status)}
                    </p>
                    <p>
                      <strong>Match Status:</strong>{" "}
                      {getBadge("match", b.match_status)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
