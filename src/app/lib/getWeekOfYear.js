import React from "react";

export default function getWeekOfYear(date) {
  const target = new Date(date);
  const dayNr = (date.getDay() + 6) % 7; // ISO day of week with Monday as 0
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 is 7 days in milliseconds
}
