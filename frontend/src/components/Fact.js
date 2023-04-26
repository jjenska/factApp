import React from "react";
import { useState, useEffect } from "react";

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
    <>
      <h1>Get a random cat fact</h1>
      <button onClick={getRandomFact}>Press here</button>
      <span>{fact.fact}</span>
      {/* {facts && facts.map((fact) => <p key={fact._id}>{fact.fact}</p>)} */}
    </>
  );
}

export default Fact;
