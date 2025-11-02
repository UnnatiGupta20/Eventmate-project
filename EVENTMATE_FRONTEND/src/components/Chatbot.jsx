import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I’m your EventMate Assistant! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8080/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const botReply = await response.text();
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Unable to connect to the server.", sender: "bot" },
      ]);
    }
  };

  const restartChat = () => {
    setMessages([{ text: "Chat restarted! How can I assist you?", sender: "bot" }]);
  };

  // 🧱 Styles

const containerStyle = {
  width: "100%",
  height: "100%",
  background: "#fff8ef",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0 0 12px 12px",
};


  const headerStyle = {
    background: "#b37a3d",
    color: "#fff",
    padding: "10px",
    fontWeight: 600,
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  };

  // ✅ Fixed scrolling section with stable height
  const messagesWrapper = {
    flex: "1 1 auto",
    overflowY: "auto",
    padding: "10px",
    background: "#fff8ef",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const messageStyle = (sender) => ({
    padding: "10px 14px",
    borderRadius: "16px",
    alignSelf: sender === "user" ? "flex-end" : "flex-start",
    background: sender === "user" ? "#d7b98c" : "#f5e4cc",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    fontSize: "0.85rem",
    lineHeight: "1.5",
    maxWidth: "80%",
  });

  const inputContainerStyle = {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #b37a3d",
    padding: "8px",
    background: "#fff8ef",
  };

  const inputStyle = {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px",
    borderRadius: "6px",
    background: "#fff",
    fontSize: "0.85rem",
  };

  const buttonStyle = {
    background: "#b37a3d",
    color: "white",
    border: "none",
    marginLeft: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span>EventMate Assistant</span>
        <button
          style={{ ...buttonStyle, padding: "4px 8px", fontSize: "0.8rem" }}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? "⬆" : "–"}
        </button>
      </div>

      {!isMinimized && (
        <>
          {/* Scrollable Messages */}
          <div style={messagesWrapper}>
            {messages.map((msg, i) => (
              <div key={i} style={messageStyle(msg.sender)}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div style={inputContainerStyle}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={buttonStyle} onClick={sendMessage}>
              Send
            </button>
            <button style={buttonStyle} onClick={restartChat}>
              Restart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;