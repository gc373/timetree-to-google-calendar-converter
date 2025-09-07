import React from "react";
import { formatGoogleDate } from "../utils/date";
import "./TimeTreeEventDetail.css";

type Props = {
  event: {
    id: string;
    title: string;
    start_at: string;
    end_at: string;
    note?: string;
    location_name?: string;
    link_url?: string;
  };
};

const TimeTreeEventDetail: React.FC<Props> = ({ event }) => (
  <div className="event-detail">
    {event.link_url && (
      <div style={{ textAlign: "left",  }}>
        <strong>{"リンク: "}</strong>
        <a
          href={event.link_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {event.link_url}
        </a>
      </div>
    )}
    {event.note && (
      <div style={{ textAlign: "left", marginTop: "0.5em" }}>
        <strong>詳細:</strong>
        <div className="event-note">{event.note}</div>
      </div>
    )}
    {event.location_name && (
      <div style={{ textAlign: "left", marginTop: "0.5em" }}>
        <strong>場所:</strong>{" "}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            event.location_name
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {event.location_name}
        </a>
      </div>
    )}
    <div style={{ marginTop: "0.5em"}}>
      <a
        href={
          `https://www.google.com/calendar/render?action=TEMPLATE` +
          `&text=${encodeURIComponent(event.title)}` +
          `&dates=${formatGoogleDate(event.start_at)}/${formatGoogleDate(event.end_at)}` +
          (event.location_name ? `&location=${encodeURIComponent(event.location_name)}` : "") +
          (event.note ? `&details=${encodeURIComponent(event.note)}` : "")
        }
        target="_blank"
        rel="noopener noreferrer"
        className="calendar-add-btn"
      >
        Googleカレンダーに追加
      </a>
    </div>
  </div>
);

export default TimeTreeEventDetail;
