"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";

export default function SearchTab({
  searchTerm,
  setSearchTerm,
  searchField,
  setSearchField,
  paymentFilter,
  setPaymentFilter,
  matchFilter,
  setMatchFilter,
  sportFilter,
  setSportFilter,
}) {
  const [showAllFilters, setShowAllFilters] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchField("all");
    setPaymentFilter("all");
    setMatchFilter("all");
    setSportFilter("all");
  };

  const hasActiveFilters =
    searchTerm ||
    searchField !== "all" ||
    paymentFilter !== "all" ||
    matchFilter !== "all" ||
    sportFilter !== "all";

  return (
    <div className="space-y-4 bg-white">
      {/* Search Bar with Icon */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
          <Input
            type="text"
            placeholder={`Search by ${
              searchField === "all" ? "name, email or phone" : searchField
            }...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {/* Search Field Selector */}
          <div className="w-40 absolute right-0 top-1/2 -translate-y-1/2">
            <Select value={searchField} onValueChange={setSearchField}>
              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 text-sm h-9">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center pb-4 border-b border-slate-200">
        {/* All Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="all-bookings"
            checked={searchField === "all"}
            onCheckedChange={() => setSearchField("all")}
            className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <label
            htmlFor="all-bookings"
            className="text-sm font-medium text-slate-700 cursor-pointer"
          >
            All
          </label>
        </div>

        {/* Payment Status Filter */}
        <div className="w-40">
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 text-sm h-9">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Match Status Filter */}
        <div className="w-40">
          <Select value={matchFilter} onValueChange={setMatchFilter}>
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 text-sm h-9">
              <SelectValue placeholder="Match Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Matches</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sports Filter */}
        <div className="w-40">
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 text-sm h-9">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="football">Football</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="ml-auto flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
