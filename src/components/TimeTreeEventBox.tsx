import React from "react";
import "../App.css";
import "./TimeTreeEventBox.css";

type Props = {
  title: string;
  start_at: string;
  end_at: string;
};

const TimeTreeEventBox: React.FC<Props> = ({ title, start_at, end_at }) => (
  <div className="event-box">
    <span className="event-title">{title}</span>
    <span className="event-date">
      {new Date(start_at).toLocaleString()} ～ {new Date(end_at).toLocaleString()}
    </span>
  </div>
);

export default TimeTreeEventBox;