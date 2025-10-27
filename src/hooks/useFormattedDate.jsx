// useFormattedDate.js
import { useState, useEffect } from "react";
import { parse, format } from "date-fns";

export default function useFormattedDate(initialValue) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (initialValue) {
      const parsed = parse(initialValue, "yyyy-MM-dd", new Date());
      if (!isNaN(parsed)) setDate(parsed);
    }
  }, [initialValue]);

  const updateDate = (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      setDate(newDate);
    }
  };

  const formattedDate = date ? format(date, "MMMM do, yyyy") : "";

  return [date, formattedDate, updateDate];
}
