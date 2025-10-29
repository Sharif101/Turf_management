"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

export default function BookingInfo({ open, onClose, booking }) {
  if (!booking) return null;

  const msg = `🎟️ Mohakash Turf – Booking Confirmation

Customer Name: ${booking.name}
Phone: ${booking.phone}
Address: ${booking.address || "N/A"}

Slot price :- ${booking.totalAmount}
Advanced :- ${booking.paymentAmount}
Due :- ${booking.dueAmount}
Your slot has been successfully confirmed on ${booking.date} (${
    booking.timeSlot
  }).
Please arrive 10–15 minutes before your game time.

We’re excited to see you at Mohakash Truf.`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(msg);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = msg;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      toast("✅ Message copied to clipboard!");
    } catch (error) {
      console.error("Clipboard error:", error);
      toast.error("❌ Failed to copy. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>🎟️ Mohakash Turf – Booking Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {/* Customer Info */}
          <div className="border-b pb-2">
            <p>
              <span className="font-semibold">Customer Name:</span>{" "}
              {booking.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {booking.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {booking.address || "N/A"}
            </p>
          </div>

          {/* Booking Info */}
          <div className="space-y-2 pt-2">
            <p>
              <span className="font-semibold">Slot price:</span>{" "}
              {booking.totalAmount}
            </p>
            <p>
              <span className="font-semibold">Advanced:</span>{" "}
              {booking.paymentAmount}
            </p>
            <p>
              <span className="font-semibold">Due:</span> {booking.dueAmount}
            </p>
            <p>
              <span className="font-semibold">Date & Time:</span> {booking.date}{" "}
              ({booking.timeSlot})
            </p>
            <p className="pt-2">
              Please arrive 10–15 minutes before your game time.
            </p>
            <p>
              We’re excited to see you at <strong>Mohakash Turf</strong>!
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
