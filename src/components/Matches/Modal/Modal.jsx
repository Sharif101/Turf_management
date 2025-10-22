"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Trophy,
  Calendar,
  Clock,
  DollarSign,
  CreditCard,
  Hash,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

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

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const getMatchStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
            Completed
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            Ongoing
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200">
            Upcoming
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 px-10">
        <DialogHeader className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Booking Details
              </DialogTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Review and update booking information
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {formData.payment_status &&
                getPaymentStatusBadge(formData.payment_status)}
              {formData.match_status &&
                getMatchStatusBadge(formData.match_status)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 rounded-xl border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
              <div className="bg-blue-600 dark:bg-blue-500 p-1.5 rounded-lg mr-2">
                <User className="w-4 h-4 text-white" />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className="pl-10 bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="pl-10 bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="pl-10 bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sport"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Sport
                </Label>
                <div className="relative">
                  <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-400 z-10" />
                  <Input
                    id="sport"
                    value={formData.sport}
                    onChange={(e) => handleChange("sport", e.target.value)}
                    placeholder="e.g., Football, Basketball"
                    className="pl-10 bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 rounded-xl border border-green-100 dark:border-green-900/50">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
              <div className="bg-green-600 dark:bg-green-500 p-1.5 rounded-lg mr-2">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              Booking Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600 dark:text-green-400 z-10" />
                  <Input
                    id="date"
                    type="date"
                    value={
                      formData.date && !isNaN(new Date(formData.date).getTime())
                        ? new Date(formData.date).toISOString().substring(0, 10)
                        : ""
                    }
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-900 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="timeSlot"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Time Slot
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600 dark:text-green-400" />
                  <Input
                    id="timeSlot"
                    value={formData.timeSlot}
                    onChange={(e) => handleChange("timeSlot", e.target.value)}
                    placeholder="e.g., 10:00 AM - 11:00 AM"
                    className="pl-10 bg-white dark:bg-slate-900 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="match_status"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Match Status
                </Label>
                <Select
                  value={formData.match_status}
                  onValueChange={(v) => handleChange("match_status", v)}
                >
                  <SelectTrigger
                    id="match_status"
                    className="bg-white dark:bg-slate-900 border-green-200 dark:border-green-800"
                  >
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
            </div>
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-5 rounded-xl border border-orange-100 dark:border-orange-900/50">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center">
              <div className="bg-orange-600 dark:bg-orange-500 p-1.5 rounded-lg mr-2">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="totalAmount"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Total Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) =>
                      handleChange("totalAmount", e.target.value)
                    }
                    placeholder="0.00"
                    className="pl-10 bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="paymentAmount"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Paid Amount
                </Label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <Input
                    id="paymentAmount"
                    type="number"
                    value={formData.paymentAmount}
                    onChange={(e) =>
                      handleChange("paymentAmount", e.target.value)
                    }
                    placeholder="0.00"
                    className="pl-10 bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dueAmount"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Due Amount
                </Label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <Input
                    id="dueAmount"
                    type="number"
                    value={formData.dueAmount}
                    onChange={(e) => handleChange("dueAmount", e.target.value)}
                    placeholder="0.00"
                    className="pl-10 bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="payment_status"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Payment Status
                </Label>
                <Select
                  value={formData.payment_status}
                  onValueChange={(v) => handleChange("payment_status", v)}
                >
                  <SelectTrigger
                    id="payment_status"
                    className="bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800"
                  >
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="payment_method"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Payment Method
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <Input
                    id="payment_method"
                    value={formData.payment_method}
                    onChange={(e) =>
                      handleChange("payment_method", e.target.value)
                    }
                    placeholder="Cash, bKash, Card"
                    className="pl-10 bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="referenceNumber"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Reference Number
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <Input
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) =>
                      handleChange("referenceNumber", e.target.value)
                    }
                    placeholder="TXN123456"
                    className="pl-10 bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-slate-200 dark:bg-slate-800" />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="min-w-24 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="min-w-24 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
