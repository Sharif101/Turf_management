"use client";

import { useState } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";
import CreatePackageModal from "./Modal/CreatePackageModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Packages({ packages, setPackages, loading }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleCreateClick = () => {
    setEditingPackage(null);
    setCreateModalOpen(true);
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setCreateModalOpen(true);
  };

  const handleDeleteClick = (pkg) => {
    setSelectedPackage(pkg);
    setDeleteModalOpen(true);
  };

  const handleSavePackage = (packageData) => {
    if (editingPackage) {
      // Update existing package
      setPackages(
        packages.map((pkg) =>
          pkg.id === editingPackage.id ? { ...pkg, ...packageData } : pkg
        )
      );
    } else {
      // Create new package
      const newPackage = {
        id: Math.max(...packages.map((p) => p.id), 0) + 1,
        ...packageData,
      };
      setPackages([...packages, newPackage]);
    }
    setCreateModalOpen(false);
  };

  const handleDeletePackage = () => {
    setPackages(packages.filter((pkg) => pkg.id !== selectedPackage.id));
    setDeleteModalOpen(false);
    setSelectedPackage(null);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-1">Manage your service packages</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Create Package
        </button>
      </div>

      {/* Table Section */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="hidden md:block overflow-x-auto">
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
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <TableRow
                    key={pkg._id || index}
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
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleEditClick(pkg)}
                          title="Edit package"
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(pkg)}
                          title="Delete package"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" className="text-center py-10">
                    <p className="text-gray-500 mb-4">No packages found</p>
                    <Button
                      variant="link"
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                      onClick={handleCreateClick}
                    >
                      Create your first package
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modals */}
      <CreatePackageModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleSavePackage}
        editingPackage={editingPackage}
      />

      {/* <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeletePackage}
        title="Delete Package"
        message={`Are you sure you want to delete "${selectedPackage?.name}"? This action cannot be undone.`}
        itemDetails={
          selectedPackage && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {selectedPackage.name}
              </p>
              <p>
                <span className="font-medium">Price:</span> {selectedPackage.price}
              </p>
              <p>
                <span className="font-medium">Duration:</span> {selectedPackage.duration}
              </p>
            </div>
          )
        }
      /> */}
    </div>
  );
}
