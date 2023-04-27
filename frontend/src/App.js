import React from "react";
import Fact from "./components/Fact";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <>
      <Nav style={{ backgroundColor: "#6d6875", padding: 10 }}>
        <Nav.Item style={{ color: "white" }}>Cat Facts</Nav.Item>
      </Nav>
      <Fact />
    </>
  );
}

export default App;
