import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const gameModes = ['Classic', 'Memorize', 'Quotes', 'Look-Ahead'];
  const [activeTab, setActiveTab] = useState('Classic');
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState('');
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    if (activeTab === 'Quotes') {
      fetchQuotesList();
      if (selectedQuote) {
        fetchLeaderboard(selectedQuote);
      }
    } else {
      fetchLeaderboard();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'Quotes' && selectedQuote) {
      fetchLeaderboard(selectedQuote);
    }
  }, [selectedQuote, activeTab]);

  const fetchQuotesList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/quotes');
      console.log(`fetchQuotes, response: ${response.data}`);
      setQuotesList(response.data);
    } catch (err) {
      console.error('Error fetching quotes list:', err);
    }
  };

  const fetchLeaderboard = async (quoteId = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/leaderboard', {
        params: { mode: activeTab, quote: quoteId },
      });
      const key = activeTab === 'Quotes' ? `${activeTab}-${quoteId}` : activeTab;
      setLeaderboardData((prev) => ({
        ...prev,
        [key]: response.data,
      }));
    } catch (err) {
      console.error(`Error fetching leaderboard for ${activeTab}:`, err);
      const key = activeTab === 'Quotes' ? `${activeTab}-${quoteId}` : activeTab;
      setLeaderboardData((prev) => ({
        ...prev,
        [key]: [],
      }));
    }
    setLoading(false);
  };

  const renderTable = () => {
    const key = activeTab === 'Quotes' ? `${activeTab}-${selectedQuote}` : activeTab;
    const data = leaderboardData[key] || [];

    if (loading) {
      return <p className="mt-3 text-white text-center">Loading...</p>;
    }

    if (data.length === 0) {
      return <p className="mt-3 text-white text-center">No data available for this mode.</p>;
    }

    const cellStyle = {
      border: '1px solid white',
      padding: '8px',
      textAlign: 'center',
    };

    return (
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table
          className="table text-white"
          style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}
        >
          <thead style={{ backgroundColor: '#b45f06', color: 'white', position: 'sticky', top: 0, zIndex: 1 }}>
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
    <div style={{ backgroundColor: '#002f5c', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 className="text-white mb-4">Leaderboard</h2>

        <ul className="nav nav-tabs mb-3 justify-content-center border-0">
          {gameModes.map((mode) => (
            <li className="nav-item" key={mode}>
              <button
                className={`nav-link ${activeTab === mode ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(mode);
                  setSelectedQuote('');
                }}
                style={{
                  backgroundColor: '#b45f06',
                  color: 'white',
                  border: '2px solid white',
                  borderBottom: activeTab === mode ? 'none' : '2px solid white',
                  marginRight: '4px',
                  fontWeight: 'bold',
                }}
              >
                {mode}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === 'Quotes' && (
        <div className="text-center mb-4">
          <select
            className="form-select"
            value={selectedQuote}
            onChange={(e) => setSelectedQuote(e.target.value)}
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <option value="">Select a quote</option>
            {quotesList.map((quote) => (
              <option key={quote.quoteID} value={quote.quoteID}>
                {quote.quote.length > 60 ? quote.quote.slice(0, 60) + '...' : quote.quote}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {(activeTab !== 'Quotes' || selectedQuote) && renderTable()}
      </div>
    </div>
  );
};

export default Leaderboard;
