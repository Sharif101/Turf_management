"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  FileText,
  Edit,
  CheckCircle2,
} from "lucide-react";

export default function EditMembershipModal({
  open,
  onClose,
  membership,
  setIsTrue,
  isTrue,
}) {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(membership || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/package-plans")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch(() => toast.error("Failed to load plans"));
  }, []);

  useEffect(() => {
    if (membership) setForm(membership);
  }, [membership]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/memberships/${membership._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update membership");

      toast.success("Membership updated successfully!");
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Edit className="w-6 h-6 text-blue-600" />
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Edit Membership
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleUpdate}>
          <div className="space-y-6 py-4">
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Name
                </Label>
                <Input
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-10"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Phone
                </Label>
                <Input
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-10"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </Label>
              <Input
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-10"
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Address
              </Label>
              <Input
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="h-10"
                placeholder="Enter address"
              />
            </div>

            {/* Plan Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                Plan Type
              </Label>
              <Select
                onValueChange={(id) => {
                  const selectedPlan = plans.find((p) => p._id === id);
                  setForm({
                    ...form,
                    planType: selectedPlan,
                    price: selectedPlan.price,
                  });
                }}
                value={form.planType?._id || ""}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                      {p.name} - {p.duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  Price
                </Label>
                <Input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="h-10"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-gray-700">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  Paid
                </Label>
                <Input
                  type="number"
                  value={form.paidAmount || ""}
                  onChange={(e) =>
                    setForm({ ...form, paidAmount: e.target.value })
                  }
                  className="h-10"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-gray-700">
                  <DollarSign className="w-4 h-4 text-red-500" />
                  Due
                </Label>
                <Input
                  type="number"
                  value={form.dueAmount || ""}
                  onChange={(e) =>
                    setForm({ ...form, dueAmount: e.target.value })
                  }
                  className="h-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Start Date
                </Label>
                <Input
                  type="date"
                  value={form.startDate?.split("T")[0] || ""}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  End Date
                </Label>
                <Input
                  type="date"
                  value={form.endDate?.split("T")[0] || ""}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                Note
              </Label>
              <Input
                value={form.note || ""}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="h-10"
                placeholder="Add any note"
              />
            </div>

            {/* Status Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-500" />
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="h-10 px-6"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="h-10 px-6">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
