"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parse, isValid } from "date-fns";

export default function DatePicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Parse backend date safely
  useEffect(() => {
    if (value) {
      // Try parsing the backend date in "October 30th, 2025" or ISO format
      const parsed =
        parse(value, "MMMM do, yyyy", new Date()) || new Date(value);
      if (isValid(parsed)) {
        setSelectedDate(parsed);
      } else {
        console.warn("Invalid backend date:", value);
        setSelectedDate(null);
      }
    }
  }, [value]);

  const handleSelect = (date) => {
    if (!date || !isValid(date)) return;

    setSelectedDate(date);
    onChange(format(date, "MMMM do, yyyy")); // Send formatted string to parent
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Date
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 justify-start text-left font-normal border-2 hover:border-green-400 bg-white"
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-green-600" />
            {selectedDate && isValid(selectedDate) ? (
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {format(selectedDate, "MMMM do, yyyy")}
              </span>
            ) : (
              <span className="text-gray-500">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-auto" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            minDate={new Date()} // prevent past dates
            className="rounded-lg border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
