"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Matches from "@/components/Matches/Matches";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        cache: "no-store",
      });
      const data = await res.json();
      console.log({ data });

      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <DashboardLayout>
      <Matches bookings={bookings} loading={loading} />
    </DashboardLayout>
  );
}
