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
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import Countdown from "@/hooks/Countdown";

export default function ViewMembershipModal({ open, onClose, membership }) {
  if (!membership) return null;

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    iconColor = "text-blue-600",
  }) => (
    <div className="flex items-center gap-2 py-1.5">
      <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{label} :</span> {value || "N/A"}
      </p>
    </div>
  );

  const statusStyles = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    expired: "bg-red-500",
    pending: "bg-yellow-500",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                statusStyles[membership.status?.toLowerCase()] ||
                statusStyles.inactive
              }`}
            />
            <DialogTitle className="text-2xl font-bold text-blue-700">
              Membership Details
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Top Row: Customer Info & Plan Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Customer Information
              </h3>
              <div className="space-y-0">
                <InfoRow
                  icon={User}
                  label="Customer Name"
                  value={membership.name}
                  iconColor="text-purple-600"
                />
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={membership.phone}
                  iconColor="text-green-600"
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={membership.email}
                  iconColor="text-blue-600"
                />
                <InfoRow
                  icon={MapPin}
                  label="Address"
                  value={membership.address}
                  iconColor="text-red-600"
                />
              </div>
            </div>

            {/* Plan Information */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Plan Information
              </h3>
              <div className="space-y-0">
                <InfoRow
                  icon={CreditCard}
                  label="Plan Name"
                  value={membership.planType?.name}
                  iconColor="text-indigo-600"
                />
                <InfoRow
                  icon={Clock}
                  label="Duration"
                  value={membership.planType?.duration}
                  iconColor="text-orange-600"
                />
                <InfoRow
                  icon={CheckCircle2}
                  label="Status"
                  value={membership.status}
                  iconColor="text-teal-600"
                />

                {/* Countdown */}
                <div className="mt-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-500">
                    Time Left :{" "}
                    <Countdown
                      startDate={membership.startDate}
                      endDate={membership.endDate}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Payment Info & Date Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Information */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Payment Information
              </h3>
              <div className="space-y-0">
                <InfoRow
                  icon={DollarSign}
                  label="Price"
                  value={membership.price}
                  iconColor="text-emerald-600"
                />
                <InfoRow
                  icon={DollarSign}
                  label="Paid Amount"
                  value={membership.paidAmount}
                  iconColor="text-teal-600"
                />
                <InfoRow
                  icon={DollarSign}
                  label="Due Amount"
                  value={membership.dueAmount}
                  iconColor="text-rose-600"
                />
              </div>
            </div>

            {/* Date & Time Information */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Date & Time Information
              </h3>
              <div className="space-y-0">
                <InfoRow
                  icon={Calendar}
                  label="Start Date"
                  value={new Date(membership.startDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  iconColor="text-cyan-600"
                />
                <InfoRow
                  icon={Calendar}
                  label="End Date"
                  value={new Date(membership.endDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  iconColor="text-pink-600"
                />
                <InfoRow
                  icon={CalendarCheck}
                  label="Created At"
                  value={new Date(membership.createdAt).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                  iconColor="text-amber-600"
                />
                <InfoRow
                  icon={CalendarCheck}
                  label="Updated At"
                  value={new Date(membership.updatedAt).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                  iconColor="text-lime-600"
                />
              </div>
            </div>
          </div>

          {/* Note Section - Full Width */}
          {membership.note && (
            <div className="border-t pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Additional Notes
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {membership.note}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
