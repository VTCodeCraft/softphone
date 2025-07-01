import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

// For demo purposes - replace with actual monday-sdk-js import
const mockMonday = {
  get: (type) => {
    if (type === "context") {
      return Promise.resolve({
        data: {
          boardId: "12345",
          itemId: "67890",
          user: { id: "user123", name: "John Doe" }
        }
      });
    }
    return Promise.resolve({ data: null });
  }
};

const DialerModal = () => {
  const [context, setContext] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputMode, setInputMode] = useState("dialpad"); // "dialpad" or "manual"

  useEffect(() => {
    // Fetch context from Monday.com
    monday.get("context").then((res) => {
      console.log("📦 Monday Context:", res.data);
      setContext(res.data);
    });
  }, []);

  const dialPadNumbers = [
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9],
    ["*", 0, "#"]
  ];

  const handleNumberClick = (number) => {
    setPhoneNumber(prev => prev + number.toString());
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

    // Replace this with your IVR API call
    alert(`📞 Calling ${phoneNumber}`);
  };

  const formatPhoneDisplay = (number) => {
    // Remove any non-numeric characters
    const cleaned = number.replace(/\D/g, '');
    
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0073ea, #00c4cc)",
          padding: "20px 24px",
          color: "white"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>📞 Click-to-Call Dialer</h2>
          <span style={{ fontSize: "20px" }}>📞</span>
        </div>
        {context && (
          <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
            Virtual PBX • Item #{context.itemId}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ padding: "24px" }}>
        {/* Monday Context Info */}
        {context ? (
          <div style={{ 
            marginBottom: "20px", 
            fontSize: "14px",
            background: "#f8fafc",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ color: "#0073ea", fontWeight: "600", marginBottom: "8px" }}>Monday.com Context</div>
            <p style={{ margin: "4px 0" }}><strong>Board ID:</strong> {context.boardId}</p>
            <p style={{ margin: "4px 0" }}><strong>Item ID:</strong> {context.itemId}</p>
            <p style={{ margin: "4px 0" }}><strong>User:</strong> {context.user?.name || context.user?.id}</p>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#666", margin: "20px 0" }}>Loading context...</p>
        )}

        {/* Input Mode Toggle */}
        <div style={{ 
          display: "flex", 
          marginBottom: "20px",
          background: "#f1f5f9",
          borderRadius: "8px",
          padding: "4px"
        }}>
          <button
            onClick={() => setInputMode("dialpad")}
            style={{
              flex: 1,
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              background: inputMode === "dialpad" ? "#0073ea" : "transparent",
              color: inputMode === "dialpad" ? "white" : "#64748b",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Dial Pad
          </button>
          <button
            onClick={() => setInputMode("manual")}
            style={{
              flex: 1,
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              background: inputMode === "manual" ? "#0073ea" : "transparent",
              color: inputMode === "manual" ? "white" : "#64748b",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Manual Entry
          </button>
        </div>

        {/* Phone Number Display */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "24px",
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "8px"
        }}>
          <div style={{ 
            fontSize: "24px", 
            fontWeight: "300", 
            color: "#1e293b",
            minHeight: "32px",
            marginBottom: "8px"
          }}>
            {phoneNumber ? formatPhoneDisplay(phoneNumber) : "Enter number"}
          </div>
          {phoneNumber && (
            <button 
              onClick={handleBackspace}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              ⌫
            </button>
          )}
        </div>

        {/* Input Area */}
        {inputMode === "manual" ? (
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              marginBottom: "20px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        ) : (
          <div style={{ marginBottom: "24px" }}>
            {dialPadNumbers.map((row, rowIndex) => (
              <div key={rowIndex} style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "16px", 
                marginBottom: "12px" 
              }}>
                {row.map((number, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleNumberClick(number)}
                    style={{
                      width: "64px",
                      height: "64px",
                      background: "white",
                      border: "2px solid #e2e8f0",
                      borderRadius: "50%",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#1e293b",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = "scale(0.95)";
                      e.target.style.background = "#f1f5f9";
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.background = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.background = "white";
                    }}
                  >
                    {number}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Call Button */}
        <button
          onClick={handleCall}
          disabled={!phoneNumber}
          style={{
            background: phoneNumber ? "#10b981" : "#cbd5e1",
            color: "white",
            padding: "16px",
            border: "none",
            borderRadius: "50%",
            cursor: phoneNumber ? "pointer" : "not-allowed",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transition: "all 0.2s",
            boxShadow: phoneNumber ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none",
            fontSize: "24px"
          }}
        >
          📞
        </button>
      </div>
    </div>
  );
};

export default DialerModal;