"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Packages from "@/components/Packages/Packages";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/package-plans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch package plans");
      }

      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <DashboardLayout>
      <Packages
        packages={packages}
        setPackages={setPackages}
        loading={loading}
      />
    </DashboardLayout>
  );
}
