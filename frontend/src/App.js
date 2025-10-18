import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.text())
      .then(setMessage)
      .catch(err => {
        console.error("ბექენდთან კავშირის შეცდომა:", err);
        setError("ბექენდთან დაკავშირება ვერ მოხერხდა. დარწმუნდით, რომ სერვერი გაშვებულია.");
      });

    fetch(`${API_URL}/api/items`)
      .then(res => {
        if (!res.ok) {
          throw new Error('ქსელური პასუხი არ იყო תקין');
        }
        return res.json();
      })
      .then(setItems)
      .catch(err => {
        console.error("მონაცემების წამოღების შეცდომა:", err);
        if (!error) {
           setError("ბაზიდან მონაცემების წამოღება ვერ მოხერხდა.");
        }
      });
  }, [API_URL, error]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Orchestrator AI - დემო პროექტი</h1>
        
        <div className="card">
          <h2>ბექენდის სტატუსი</h2>
          <p>{message || "იტვირთება..."}</p>
        </div>

        <div className="card">
          <h2>მონაცემები PostgreSQL-დან</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {items.length > 0 ? items.map(item => (
                <li key={item.id}>{item.name}</li>
              )) : "მონაცემები იტვირთება..."}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

const styles = `
.App { text-align: center; }
.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.card {
  background-color: #3b4049;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  width: 80%;
  max-width: 600px;
}
h2 {
  color: #61dafb;
  margin-top: 0;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #4a505a;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 4px;
}
.error {
  color: #ff6b6b;
  font-weight: bold;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default App;
