"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function Modal({ booking, isOpen, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sport: "",
    date: "",
    timeSlot: "",
    paymentAmount: 0,
    totalAmount: 0,
    dueAmount: 0,
    payment_status: "",
    match_status: "",
    payment_method: "",
    referenceNumber: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        name: booking.name || "",
        email: booking.email || "",
        phone: booking.phone || "",
        sport: booking.sport || "",
        date: booking.date || "",
        timeSlot: booking.timeSlot || "",
        paymentAmount: booking.paymentAmount || 0,
        totalAmount: booking.totalAmount || 0,
        dueAmount: booking.dueAmount || 0,
        payment_status: booking.payment_status || "",
        match_status: booking.match_status || "",
        payment_method: booking.payment_method || "",
        referenceNumber: booking.referenceNumber || "",
      });
    }
  }, [booking]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${booking._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update booking");

      const updatedBooking = await res.json();
      toast.success("Booking updated successfully!");
      onUpdate(updatedBooking);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking!");
    }
  };

  console.log({ booking });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <Label className="mb-1">Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Email</Label>
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Sport</Label>
            <Input
              value={formData.sport}
              onChange={(e) => handleChange("sport", e.target.value)}
              placeholder="Enter sport"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Date</Label>
            <Input
              type="date"
              value={
                formData.date && !isNaN(new Date(formData.date).getTime())
                  ? new Date(formData.date).toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Time Slot</Label>
            <Input
              value={formData.timeSlot}
              onChange={(e) => handleChange("timeSlot", e.target.value)}
              placeholder="Enter time slot"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Total Amount</Label>
            <Input
              type="number"
              value={formData.totalAmount}
              onChange={(e) => handleChange("totalAmount", e.target.value)}
              placeholder="Enter total amount"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Payment Amount</Label>
            <Input
              type="number"
              value={formData.paymentAmount}
              onChange={(e) => handleChange("paymentAmount", e.target.value)}
              placeholder="Enter payment amount"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Due Amount</Label>
            <Input
              type="number"
              value={formData.dueAmount}
              onChange={(e) => handleChange("dueAmount", e.target.value)}
              placeholder="Enter due amount"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Reference Number</Label>
            <Input
              value={formData.referenceNumber}
              onChange={(e) => handleChange("referenceNumber", e.target.value)}
              placeholder="Enter reference number"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Payment Status</Label>
            <Select
              value={formData.payment_status}
              onValueChange={(v) => handleChange("payment_status", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Match Status</Label>
            <Select
              value={formData.match_status}
              onValueChange={(v) => handleChange("match_status", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select match status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Payment Method</Label>
            <Input
              value={formData.payment_method}
              onChange={(e) => handleChange("payment_method", e.target.value)}
              placeholder="Enter payment method (e.g., Cash, bKash)"
            />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
