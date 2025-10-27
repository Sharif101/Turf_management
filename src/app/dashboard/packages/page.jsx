"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Packages from "@/components/Packages/Packages";
import React, { useEffect, useState } from "react";

// Sample package data for demonstration
const SAMPLE_PACKAGES = [
  {
    id: 1,
    name: "Basic Package",
    duration: "1 Month",
    price: "$29.99",
    description: "Perfect for beginners with essential features",
    status: "active",
  },
  {
    id: 2,
    name: "Professional Package",
    duration: "3 Months",
    price: "$79.99",
    description: "Advanced features for professionals",
    status: "active",
  },
  {
    id: 3,
    name: "Premium Package",
    duration: "6 Months",
    price: "$149.99",
    description: "All features with priority support",
    status: "active",
  },
  {
    id: 4,
    name: "Enterprise Package",
    duration: "1 Year",
    price: "$299.99",
    description: "Custom solutions for large organizations",
    status: "inactive",
  },
];

export default function page() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPackages(SAMPLE_PACKAGES);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
