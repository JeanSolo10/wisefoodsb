import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/api/users");
    setBackendData(response.data.results);
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <div>
        <p>{backendData}</p>
      </div>
    </div>
  );
};

export default App;
