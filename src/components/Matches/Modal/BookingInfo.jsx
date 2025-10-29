"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";

export default function BookingInfo({ open, onClose, booking }) {
  const ticketRef = useRef(null);

  if (!booking) return null;

  const msg = `🎟️ Mohakash Turf – Booking Confirmation

Customer Name: ${booking.name}
Phone: ${booking.phone}
Address: ${booking.address || "N/A"}

Sports :- ${booking.sport}
Slot price :- ${booking.totalAmount}
Advanced :- ${booking.paymentAmount}
Due :- ${booking.dueAmount}
Your slot has been successfully confirmed on ${booking.date} (${
    booking.timeSlot
  }).
Please arrive 10–15 minutes before your game time.

We’re excited to see you at Mohakash Turf.`;

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

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `Booking_${booking.name}_${booking.date}.png`;
    link.click();
    toast.success("downloaded!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        {/* Ticket content to capture */}
        <div
          ref={ticketRef}
          className="p-4 bg-white rounded shadow-md space-y-3 text-sm text-gray-700 dark:text-gray-300"
        >
          <DialogHeader>
            <DialogTitle>🎟️ Mohakash Turf – Booking Confirmation</DialogTitle>
          </DialogHeader>
          {/* Customer Info */}
          <div className="border-b pb-2">
            <p>
              <span className="font-semibold">Customer Name :</span>{" "}
              {booking.name}
            </p>
            <p>
              <span className="font-semibold">Phone :</span> {booking.phone}
            </p>
            <p>
              <span className="font-semibold">Address :</span>{" "}
              {booking.address || "N/A"}
            </p>
          </div>

          {/* Booking Info */}
          <div className="space-y-2 pt-2">
            <p>
              <span className="font-semibold">Sprot : </span> {booking.sport}
            </p>
            <p>
              <span className="font-semibold">Slot price :</span>{" "}
              {booking.totalAmount}
            </p>
            <p>
              <span className="font-semibold">Advanced :</span>{" "}
              {booking.paymentAmount}
            </p>
            <p>
              <span className="font-semibold">Due :</span> {booking.dueAmount}
            </p>
            <p>
              <span className="font-semibold">Date & Time :</span>{" "}
              {booking.date} ({booking.timeSlot})
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
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
