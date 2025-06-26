import React, { useEffect } from "react";
import { Log } from "./LogService";

const LogTesting = () => {
  useEffect(() => {
    Log("backend", "error", "handler", "received string, expected bool");

    try {
      throw new Error("Sample error: invalid user input");
    } catch (err) {
      Log("backend", "error", "handler", err.message);
    }
  }, []);

  return <div>Logging Test Component</div>;
};

export default LogTesting;
