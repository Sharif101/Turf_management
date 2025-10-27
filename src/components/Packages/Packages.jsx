"use client";

import { useState } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";
import CreatePackageModal from "./Modal/CreatePackageModal";

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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Package Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pkg.duration}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {pkg.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {pkg.description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pkg.status
                      )}`}
                    >
                      {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditClick(pkg)}
                        className="text-indigo-600 hover:text-indigo-700 transition-colors"
                        title="Edit package"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(pkg)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                        title="Delete package"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No packages found</p>
            <button
              onClick={handleCreateClick}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Create your first package
            </button>
          </div>
        )}
      </div>

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
