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
import { Copy, Download, MessageCircle } from "lucide-react";
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
    toast.success("Ticket downloaded!");
  };

  const handleWhatsApp = () => {
    if (!booking.phone) {
      toast.error("No phone number found!");
      return;
    }

    // ensure country code, e.g. 880 for Bangladesh
    const phone = booking.phone.startsWith("880")
      ? booking.phone
      : `880${booking.phone.replace(/^0/, "")}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    toast.info("Opening WhatsApp...");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        {/* Ticket content to capture */}
        <div
          ref={ticketRef}
          className="p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-lg shadow-lg space-y-4 text-sm"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-700">
              🎟️ Mohakash Turf – Booking Confirmation
            </DialogTitle>
          </DialogHeader>

          {/* Customer Info */}
          <div className="border-b border-gray-200 pb-3 space-y-1">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">
                Customer Name :
              </span>{" "}
              {booking.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Phone :</span>{" "}
              {booking.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Address :</span>{" "}
              {booking.address || "N/A"}
            </p>
          </div>

          {/* Booking Info */}
          <div className="space-y-2 pt-2">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Sport : </span>{" "}
              {booking.sport}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Slot price :</span>{" "}
              {booking.totalAmount}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Advanced :</span>{" "}
              {booking.paymentAmount}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Due :</span>{" "}
              {booking.dueAmount}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Date & Time :</span>{" "}
              {booking.date} ({booking.timeSlot})
            </p>
            <p className="pt-2 text-gray-600">
              Please arrive 10–15 minutes before your game time.
            </p>
            <p className="text-gray-700">
              We're excited to see you at{" "}
              <strong className="text-blue-700">Mohakash Turf</strong>!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <DialogFooter className="flex justify-end gap-1 mt-4">
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
          <Button
            onClick={handleWhatsApp}
            // className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
