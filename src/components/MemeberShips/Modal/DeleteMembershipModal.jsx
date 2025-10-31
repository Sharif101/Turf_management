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
import { toast } from "react-toastify";

export default function DeleteMembershipModal({
  open,
  onClose,
  membership,
  setIsTrue,
  isTrue,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (!membership?._id) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/memberships/${membership._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete membership");

      toast("🗑️ Membership deleted successfully!");
      setIsTrue(!isTrue);
      onClose();
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!membership) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Membership</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          Are you sure you want to delete membership for{" "}
          <strong>{membership.name}</strong>? This action cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
