import { useState, useEffect } from 'react';
import HistoryCard from './HistoryCard/HistoryCard';
import './HistoryPage.css';

export default function HistoryPage({ isConnect }) {
  const [historyData, setHistoryData] = useState([]);

  const clearHistory = () => {
    chrome.storage.local.set({ history: JSON.stringify([]) });
    setHistoryData([]);
  };

  useEffect(() => {
    chrome.storage.local
      .get(['history'])
      .then(({ history }) => {
        if (history) {
          const data = JSON.parse(history);
          setHistoryData(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="historyPage">
      {historyData.length ? (
        <>
          <div className="cardsField">
            {historyData.map((item) => (
              <HistoryCard data={item} isConnect={isConnect} key={item.phone} />
            ))}
          </div>
          <button className="button" type="button" onClick={clearHistory}>
            Clear
          </button>
        </>
      ) : (
        <p className="textHistory">History is empty</p>
      )}
    </div>
  );
}
