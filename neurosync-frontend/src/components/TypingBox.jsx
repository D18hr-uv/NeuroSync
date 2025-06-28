
import React, { useState, useEffect, useRef } from 'react';
import { computeMetrics } from "../utils/typingMetrics";

const TypingBox = () => {
  const [text, setText] = useState('');
  const [keystrokes, setKeystrokes] = useState([]);
  const [metrics, setMetrics] = useState(null);

  const lastKeyTime = useRef(null);

  const handleKeyDown = (e) => {
    const now = Date.now();

    // Calculate pause duration
    const pauseDuration = lastKeyTime.current ? now - lastKeyTime.current : 0;
    lastKeyTime.current = now;

    const keyData = {
      key: e.key,
      time: now,
      pauseAfter: pauseDuration,
    };

    setKeystrokes((prev) => [...prev, keyData]);

    // Update text content
    if (e.key === 'Backspace') {
      setText((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setText((prev) => prev + e.key);
    }

    // Prevent actual browser text change
    e.preventDefault();
  };

  const handleFinish = () => {
  const computed = computeMetrics(keystrokes);
  setMetrics(computed);
  console.log("Cognitive Metrics", computed);
};


  const handleReset = () => {
    setText('');
    setKeystrokes([]);
    lastKeyTime.current = null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">🧠 Typing Tracker</h2>

      <div
        tabIndex="0"
        onKeyDown={handleKeyDown}
        className="w-full min-h-[150px] p-4 border rounded font-mono text-lg outline-none"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {text}
      </div>

      <div className="mt-4">
        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>

      <div className="mt-2">
        <button onClick={handleFinish} className="bg-green-600 text-white px-4 py-2 rounded">
          Finish Session
        </button>
      </div>


      <div className="mt-4">
        <p><strong>Keystrokes logged:</strong> {keystrokes.length}</p>
        <pre className="bg-gray-100 p-2 rounded max-h-[200px] overflow-auto text-xs">
          {JSON.stringify(keystrokes, null, 2)}
        </pre>
      </div>

      {metrics && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <h3 className="text-lg font-semibold mb-2">📊 Cognitive Metrics</h3>
          <ul className="text-sm">
            <li>⌨️ <strong>WPM:</strong> {metrics.wpm}</li>
            <li>⏸️ <strong>Pause %:</strong> {metrics.pausePercent}%</li>
            <li>⌫ <strong>Backspace Rate:</strong> {metrics.backspaceRate}%</li>
            <li>🧠 <strong>Cognitive Drift Score:</strong> {metrics.driftScore} / 100</li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default TypingBox;
