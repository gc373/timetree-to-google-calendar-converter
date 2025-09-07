import React, { useState } from "react";
import TimeTreeEventBox from "./TimeTreeEventBox";
import TimeTreeEventDetail from "./TimeTreeEventDetail";
import { downloadICS } from "../utils/ics";

// カレンダーIDをリンクから抽出する関数
function extractCalendarId(link: string): string | null {
  const match = link.match(/public_calendars\/([^/?#]+)/);
  return match ? match[1] : null;
}

type Event = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  note?: string;
  location_name?: string;
  url?: string;
};

const TimeTreeLinkInput: React.FC = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const [period, setPeriod] = useState("1month"); // 追加

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  // 期間選択のハンドラ
  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEvents([]);
    setError(null);

    const calendarId = extractCalendarId(link);
    if (!calendarId) {
      setError("カレンダーIDがリンクから取得できませんでした。");
      setLoading(false);
      return;
    }

    const now = Date.now();
    let range = 30 * 24 * 60 * 60 * 1000; // デフォルト1ヶ月
    if (period === "3month") range = 90 * 24 * 60 * 60 * 1000;
    if (period === "1year") range = 365 * 24 * 60 * 60 * 1000;
    const from = now - range;
    const to = now + range;
    const utc_offset = 32400;

    const url = `/timetree-proxy/api/v2/public_calendars/${calendarId}/public_events?from=${from}&to=${to}&utc_offset=${utc_offset}`;

    try {
      const res = await fetch(url, {
        headers: {
          "x-timetreea": "web/2.1.0/ja",
        },
      });
      if (!res.ok) throw new Error("APIリクエスト失敗");
      const data = await res.json();
      // イベント配列を抽出
      const events = (data.public_events || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        start_at: item.start_at,
        end_at: item.end_at,
        note: item.note,
        location_name: item.location_name,
        url: item.url,
        link_url: item.link_url,
      }));
      setEvents(events);
    } catch (err: any) {
      setError("エラー: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (id: string) => {
    setOpenEventId((prev) => (prev === id ? null : id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        TimeTreeリンクを入力:
        <input
          type="url"
          value={link}
          onChange={handleChange}
          placeholder="https://timetreeapp.com/public_calendars/..."
          required
          style={{ marginLeft: "8px", width: "300px" }}
        />
      </label>
      {/* 取得期間ラジオボタンをURL入力欄の下に配置 */}
      <div style={{ margin: "16px 0" }}>
        <span style={{ marginRight: "8px" }}>取得期間:</span>
        <label style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name="period"
            value="1month"
            checked={period === "1month"}
            onChange={handlePeriodChange}
          />
          1ヶ月
        </label>
        <label style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name="period"
            value="3month"
            checked={period === "3month"}
            onChange={handlePeriodChange}
          />
          3ヶ月
        </label>
        <label>
          <input
            type="radio"
            name="period"
            value="1year"
            checked={period === "1year"}
            onChange={handlePeriodChange}
          />
          1年
        </label>
      </div>
      <button type="submit" style={{ marginLeft: "8px" }} disabled={loading}>
        {loading ? "取得中..." : "送信"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
      )}
      {events.length > 0 && (
        <div>
          <button
            type="button"
            style={{ margin: "1em 0", background: "#1976d2", color: "#fff" }}
            onClick={() => downloadICS(events)}
          >
            全イベント情報を保存（icsファイル）
          </button>
        </div>
      )}
      {events.length > 0 && (
        <div style={{ margin: "1em 0", fontSize: "0.95em", color: "#333", textAlign: "left" }}>
          <p>
            <strong>icsファイルの使い方：</strong><br />
            <span style={{ color: "#1976d2" }}>※GoogleカレンダーへのインポートはPC版表示でのみ可能です。</span><br />
            <br />
            <b>PCの場合：</b><br />
            GoogleカレンダーをPCブラウザで開き、<br />
            「設定」→「インポート/エクスポート」からダウンロードしたicsファイルを選択してカレンダーに追加してください。<br />
            <br />
            <b>スマホの場合：</b><br />
            スマホのブラウザでGoogleカレンダーを開き、<br />
            ブラウザの「PC版サイト（デスクトップ表示）」機能を使うとインポートできます。<br />
            （SafariやChromeの共有メニュー等から「PC版サイトを表示」を選択）
          </p>
        </div>
      )}
      {events.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {events.map((event) => (
            <div key={event.id} style={{ width: "100%" }}>
              <div
                onClick={() => handleEventClick(event.id)}
                style={{ cursor: "pointer" }}
              >
                <TimeTreeEventBox
                  title={event.title}
                  start_at={event.start_at}
                  end_at={event.end_at}
                />
              </div>
              {openEventId === event.id && (
                <TimeTreeEventDetail event={event} />
              )}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default TimeTreeLinkInput;