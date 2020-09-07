import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode])
    } else {
      setMode(mode);
      const newHistory = [...history]
      newHistory.splice(newHistory.length - 1, 1, mode);
      setHistory(newHistory)
    }
  }
  function back() {
    if (history.length > 1) {
      // history.pop()
      setHistory(prev => {
        prev.pop()
        setMode(prev[prev.length - 1])
        return prev;
      })
    }
  }
  return { mode, transition, back };
}

