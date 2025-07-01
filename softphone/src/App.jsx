import React from "react";
import DialerModal from "./components/DialerModal";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
      }}
    >
      <DialerModal />
    </div>
  );
};

export default App;
