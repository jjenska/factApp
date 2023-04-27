import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Fact() {
  const [fact, setFact] = useState("");
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    getFacts();
  }, []);

  const getFacts = async () => {
    /* Avoiding CORS issue by adding proxy to package.json:
     * https://create-react-app.dev/docs/proxying-api-requests-in-development/
     */
    const response = await fetch("/api/facts");
    const json = await response.json();

    if (response.ok) {
      setFacts(json);
    }
  };

  const getRandomFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {/* <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Get a random cat fact
      </h1> */}
      <Button variant="light" onClick={getRandomFact}>
        Get a random cat fact
      </Button>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span>{fact.fact}</span>
      </div>
    </div>
  );
}

export default Fact;
