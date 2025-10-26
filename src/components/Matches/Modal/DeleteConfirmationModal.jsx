"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function DeleteConfirmationModal({
  booking,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-red-600">Delete Booking</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-gray-700">
            Are you sure you want to delete this booking? This action cannot be
            undone.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Name:</strong> {booking.name}
            </p>
            <p className="text-sm">
              <strong>Sport:</strong> {booking.sport}
            </p>
            <p className="text-sm">
              <strong>Date:</strong> {booking.date} at {booking.timeSlot}
            </p>
            <p className="text-sm">
              <strong>Total Amount:</strong> {booking.totalAmount}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
