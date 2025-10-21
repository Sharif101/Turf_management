"use client";
import BookingForm from "@/components/BookingForm/BookingForm";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookedSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        cache: "no-store",
      });
      const data = await res.json();

      const slots = data
        .map((item) => ({
          sport: item.sport,
          date: item.date,
          timeSlot: item.timeSlot,
        }))
        .filter(Boolean);

      setBookedSlots(slots);
    } catch (err) {
      console.error("Failed to fetch booked slots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  return (
    <div className="light-theme min-h-screen">
      <BookingForm
        bookedSlots={bookedSlots}
        fetchBookedSlots={fetchBookedSlots}
      />
    </div>
  );
}
