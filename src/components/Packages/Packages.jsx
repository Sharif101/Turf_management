"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import CreatePackageModal from "./Modal/CreatePackageModal";
import TableSkeleton from "../Resources/TableSkeleton";

export default function Packages({ packages, setPackages, loading }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Create / Update handler
  const handleSavePackage = async (packageData) => {
    try {
      const apiUrl = editingPackage
        ? `http://localhost:5000/api/package-plans/${editingPackage._id}`
        : `http://localhost:5000/api/package-plans`;

      const method = editingPackage ? "PATCH" : "POST";

      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      if (!res.ok) throw new Error("Failed to save package");

      const savedPackage = await res.json();

      if (editingPackage) {
        setPackages((prev) =>
          prev.map((pkg) =>
            pkg._id === editingPackage._id ? savedPackage : pkg
          )
        );
        toast("Package updated successfully ✅");
      } else {
        // add new
        setPackages((prev) => [...prev, savedPackage]);
        toast("New package created 🎉");
      }

      setCreateModalOpen(false);
      setEditingPackage(null);
    } catch (error) {
      console.error("Error saving package:", error);
      toast({
        title: "Error",
        description: "Failed to save package. Try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePackage = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/package-plans/${selectedPackage._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete package");

      setPackages((prev) =>
        prev.filter((pkg) => pkg._id !== selectedPackage._id)
      );
      toast("Package deleted successfully 🗑️");

      setDeleteModalOpen(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error("Error deleting package:", error);
      toast("Failed to delete package.");
    }
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setCreateModalOpen(true);
  };

  const handleDeleteClick = (pkg) => {
    setSelectedPackage(pkg);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-sm rounded-md border border-gray-200">
        <div>
          <h2 className="text-[20px] font-semibold text-gray-800">
            Package Plans
          </h2>
          <p className="text-gray-500 mt-1">Manage all your bookings here</p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Package
        </Button>
      </div>

      {/* 🔹 Table Section */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="hidden md:block overflow-x-auto">
          {loading ? (
            <TableSkeleton row={5} columns={6} />
          ) : packages.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No bookings found</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Duration (Days)</TableHead>
                    <TableHead>Price (৳)</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg, index) => (
                    <TableRow
                      key={pkg._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium text-slate-600">
                        {pkg.name}
                      </TableCell>
                      <TableCell>{pkg.duration}</TableCell>
                      <TableCell className="font-semibold text-slate-600">
                        ৳ {pkg.price}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-slate-600">
                        {pkg.description || "—"}
                      </TableCell>
                      <TableCell>
                        <span>{pkg.status}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-start">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleEditClick(pkg)}
                            title="Edit package"
                          >
                            <Edit2 size={17} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteClick(pkg)}
                            title="Delete package"
                          >
                            <Trash2 size={17} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </Card>

      <CreatePackageModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingPackage(null);
        }}
        onSave={handleSavePackage}
        editingPackage={editingPackage}
      />

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedPackage?.name}</strong>?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePackage}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
