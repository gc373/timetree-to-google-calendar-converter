type Event = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  note?: string;
  location_name?: string;
  url?: string;
};

export function generateICS(events: Event[]) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const format = (dateStr: string) => {
    const d = new Date(Number(dateStr) || dateStr);
    return (
      d.getUTCFullYear().toString() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) +
      "Z"
    );
  };
  let ics =
    "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nPRODID:TimeTreeToGoogleCalendarConverter\n";
  for (const e of events) {
    ics +=
      "BEGIN:VEVENT\n" +
      `UID:${e.id}\n` +
      `SUMMARY:${e.title}\n` +
      (e.note ? `DESCRIPTION:${e.note.replace(/\n/g, "\\n")}\n` : "") +
      (e.location_name ? `LOCATION:${e.location_name}\n` : "") +
      `DTSTART:${format(e.start_at)}\n` +
      `DTEND:${format(e.end_at)}\n` +
      "END:VEVENT\n";
  }
  ics += "END:VCALENDAR";
  return ics;
}

export function downloadICS(events: Event[]) {
  const ics = generateICS(events);
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "events.ics";
  a.click();
  URL.revokeObjectURL(url);
}