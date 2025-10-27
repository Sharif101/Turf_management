"use client";

import { useState, useEffect } from "react";
import {
  X,
  Package,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    status: "active",
  });

  useEffect(() => {
    if (editingPackage) {
      setFormData(editingPackage);
    } else {
      setFormData({
        name: "",
        duration: "",
        price: "",
        description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.duration &&
      formData.price &&
      formData.description
    ) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] p-0 gap-0">
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

            {/* Duration and Price Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Duration */}
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
                  placeholder="e.g., 3 Months"
                  required
                />
              </div>

              {/* Price */}
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
                  placeholder="e.g., $99.99"
                  required
                />
              </div>
            </div>

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
