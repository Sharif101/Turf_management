"use client";

import { useState, useEffect } from "react";
import {
  X,
  Package,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  Users,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreatePackageModal({
  isOpen,
  onClose,
  onSave,
  editingPackage,
}) {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
    type: "individual",
    teamSizeLimit: 1,
    status: "active",
  });

  useEffect(() => {
    if (editingPackage) {
      // Handle features array when editing
      setFormData({
        ...editingPackage,
      });
    } else {
      setFormData({
        name: "",
        duration: "",
        price: "",
        description: "",
        type: "individual",
        teamSizeLimit: 1,
        status: "active",
      });
    }
  }, [editingPackage, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
      teamSizeLimit: value === "team" ? 5 : 1, // default 5 if team
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.duration &&
      formData.price &&
      formData.description
    ) {
      const preparedData = {
        ...formData,
      };
      onSave(preparedData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] p-0 gap-0 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="text-xl font-semibold">
                {editingPackage ? "Edit Package" : "Create New Package"}
              </DialogTitle>
            </div>
          </div>
          {editingPackage ? (
            <>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-5 ">
                Created At: {new Date(formData.createdAt)?.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Updated At: {new Date(formData.updatedAt)?.toLocaleString()}
              </p>
            </>
          ) : (
            ""
          )}
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Package Name */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Package className="w-4 h-4 text-muted-foreground" />
                Package Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Business Package"
                className="w-full"
                required
              />
            </div>

            {/* Duration & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label
                  htmlFor="duration"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Duration
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 30 days"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="price"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 999"
                  required
                />
              </div>
            </div>

            {/* Type (Individual / Team) */}
            <div className="space-y-3">
              <Label
                htmlFor="type"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Users className="w-4 h-4 text-muted-foreground" />
                Membership Type
              </Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team Size (only if team) */}
            {formData.type === "team" && (
              <div className="space-y-3">
                <Label htmlFor="teamSizeLimit" className="text-sm font-medium">
                  Team Size Limit
                </Label>
                <Input
                  id="teamSizeLimit"
                  name="teamSizeLimit"
                  type="number"
                  value={formData.teamSizeLimit}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  min="1"
                  required
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what's included in this package..."
                rows="4"
                className="resize-none"
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label
                htmlFor="status"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingPackage ? "Update Package" : "Create Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
