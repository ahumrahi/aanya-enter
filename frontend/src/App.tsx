import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  async function askAgent() {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        { question }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error("API Error:", error);
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAgent();
    }
  }

  return (
    <div
      className={
        answer
          ? "app-container top-layout"
          : "app-container center-layout"
      }
    >
      <div className="input-section">
        
        <h1>Aanya Enterprises Chat</h1>

        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={askAgent}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      {answer && (
        <div className="response-card">
          <h2>Response</h2>
          <div className="response-content">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;