"use client";

import React from "react";
import { useCountdown } from "./useCountdown";

export default function Countdown({ startDate, endDate }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(
    startDate,
    endDate
  );

  if (expired) {
    return <span className="text-red-600 font-semibold">Expired</span>;
  }

  return (
    <span className="font-mono text-sm text-green-700">
      {String(days).padStart(2, "0")}d :{String(hours).padStart(2, "0")}h :
      {String(minutes).padStart(2, "0")}m :{String(seconds).padStart(2, "0")}s
    </span>
  );
}
