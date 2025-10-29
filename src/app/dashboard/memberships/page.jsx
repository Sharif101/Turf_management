"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import MemeberShips from "@/components/MemeberShips/MemeberShips";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/memberships", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch package plans");
      }

      const data = await res.json();
      setMemberships(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setMemberships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <DashboardLayout>
      <MemeberShips
        memberships={memberships}
        setMemberships={setMemberships}
        loading={loading}
      />
    </DashboardLayout>
  );
}
