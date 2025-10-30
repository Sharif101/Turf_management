"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import MemeberShips from "@/components/MemeberShips/MemeberShips";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrue, setIsTrue] = useState(false);

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
        throw new Error("Failed to fetch memberships");
      }

      const data = await res.json();
      setMemberships(data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
      setMemberships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [isTrue]);

  return (
    <DashboardLayout>
      <MemeberShips
        memberships={memberships}
        setMemberships={setMemberships}
        loading={loading}
        isTrue={isTrue}
        setIsTrue={setIsTrue} // ✅ pass toggle props
      />
    </DashboardLayout>
  );
}
