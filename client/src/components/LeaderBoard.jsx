import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({theme}) => {
  const gameModes = ["Classic", "Memorize", "Quotes"];
  const [activeTab, setActiveTab] = useState("Classic");
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState("");
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    if (activeTab === "Quotes") {
      fetchQuotesList();
      if (selectedQuote) {
        fetchLeaderboard(selectedQuote);
      }
    } else {
      fetchLeaderboard();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Quotes" && selectedQuote) {
      fetchLeaderboard(selectedQuote);
    }
  }, [selectedQuote, activeTab]);

  const fetchQuotesList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/quotes");
      console.log(`fetchQuotes, response: ${response.data}`);
      setQuotesList(response.data);
    } catch (err) {
      console.error("Error fetching quotes list:", err);
    }
  };

  const fetchLeaderboard = async (quoteId = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/leaderboard", {
        params: { mode: activeTab, quote: quoteId },
      });
      const key = activeTab === "Quotes" ? `${activeTab}-${quoteId}` : activeTab;
      setLeaderboardData((prev) => ({
        ...prev,
        [key]: response.data,
      }));
    } catch (err) {
      console.error(`Error fetching leaderboard for ${activeTab}:`, err);
      const key = activeTab === "Quotes" ? `${activeTab}-${quoteId}` : activeTab;
      setLeaderboardData((prev) => ({
        ...prev,
        [key]: [],
      }));
    }
    setLoading(false);
  };

  const renderTable = () => {
    const key = activeTab === "Quotes" ? `${activeTab}-${selectedQuote}` : activeTab;
    const data = leaderboardData[key] || [];

    if (loading) {
      return <p className="mt-3 text-white text-center">Loading...</p>;
    }

    if (data.length === 0) {
      return <p className="mt-3 text-white text-center">No data available for this mode.</p>;
    }

    const cellStyle = {
      border: "1px solid white",
      padding: "8px",
      textAlign: "center",
    };

    return (
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table
          className="table text-white"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid white",
          }}
        >
          <thead className={`accent-${theme}`} style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={cellStyle}>Rank</th>
              <th style={cellStyle}>Username</th>
              <th style={cellStyle}>WPM</th>
              <th style={cellStyle}>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((entry, index) => (
              <tr key={index}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{entry.userUsername}</td>
                <td style={cellStyle}>{entry.wpm}</td>
                <td style={cellStyle}>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "2rem",
      }}
    >
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div className="d-flex flex-column align-items-center text-center" style={{ width: "100%" }}>
          {/* Fixed Header and Tabs */}
          <h2 className="text-white mb-4">Leaderboard</h2>

          {/* Tab Buttons */}
          <div className="w-100 mb-3" style={{ maxWidth: "800px" }}>
            <div className="d-flex" style={{ gap: "4px" }}>
              {gameModes.map((mode) => (
                <button
                  key={mode}
                  className={`nav-link ${activeTab === mode ? "active" : ""} accent-${theme}`}
                  onClick={() => {
                    setActiveTab(mode);
                    setSelectedQuote("");
                  }}
                  style={{
                    flex: 1,
                    border: "2px solid white",
                    borderBottom: activeTab === mode ? "none" : "2px solid white",
                    fontWeight: "bold",
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 w-100" style={{ height: "60px" }}>
            {activeTab === "Quotes" ? (
              <select className="form-select mx-auto" value={selectedQuote} onChange={(e) => setSelectedQuote(e.target.value)} style={{ maxWidth: "500px" }}>
                <option value="">Select a quote</option>
                {quotesList.map((quote) => (
                  <option key={quote.quoteID} value={quote.quoteID}>
                    {quote.quote.length > 60 ? quote.quote.slice(0, 60) + "..." : quote.quote}
                  </option>
                ))}
              </select>
            ) : null}
          </div>

          {/* Scrollable Table Container - Fixed Height */}
          <div
            className={`mx-auto table-responsive`}
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "440px", // fixed height to match 10 rows + header (adjust if needed)
              overflowY: "auto",
            }}
          >
            {(activeTab !== "Quotes" || selectedQuote) && renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
