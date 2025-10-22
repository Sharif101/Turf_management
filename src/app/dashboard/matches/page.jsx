"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Matches from "@/components/Matches/Matches";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: "",
    searchField: "all",
    paymentFilter: "all",
    matchFilter: "all",
    sportFilter: "all",
    startDate: "",
    endDate: "",
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.searchTerm) params.append("search", filters.searchTerm);
      if (filters.sportFilter !== "all")
        params.append("sport", filters.sportFilter);
      if (filters.paymentFilter !== "all")
        params.append("payment_status", filters.paymentFilter);
      if (filters.matchFilter !== "all")
        params.append("match_status", filters.matchFilter);
      if (filters.startDate && filters.endDate) {
        params.append("startDate", filters.startDate);
        params.append("endDate", filters.endDate);
      }

      const res = await fetch(
        `http://localhost:5000/api/bookings?${params.toString()}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [isTrue, filters]);

  return (
    <DashboardLayout>
      <Matches
        bookings={bookings}
        loading={loading}
        setIsTrue={setIsTrue}
        isTrue={isTrue}
        filters={filters}
        setFilters={setFilters}
      />
    </DashboardLayout>
  );
}
