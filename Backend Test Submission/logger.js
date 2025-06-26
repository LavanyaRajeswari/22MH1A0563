const fetch = require("node-fetch");

const LOG_URL = "http://20.244.56.144/evaluation-service/logs";
const AUTH_TOKEN = "acjzSNmAMemrQPFC"; 

async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    const response = await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Log success:", result);
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}

module.exports = { Log };
