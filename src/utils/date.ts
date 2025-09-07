export function formatGoogleDate(dateStr: string) {
  // GoogleカレンダーはUTCの「YYYYMMDDTHHmmssZ」形式を推奨
  const d = new Date(Number(dateStr) || dateStr);
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}