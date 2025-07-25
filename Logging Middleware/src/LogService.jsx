let cachedToken = null;

async function getAuthToken() {
  if (cachedToken) return cachedToken;

  const response = await fetch("http://20.244.56.144/evaluation-service/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "22mh1a0563@acoe.edu.in",
      name: "lavanya rajeswari saride",
      rollNo: "22mh1a0563",
      accessCode: "NFwgRT",
      clientID: "7a0a40ed-9577-4e65-bd0d-b34c960bc311",
      clientSecret: "acjzSNmAMemrQPFC",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error("Auth failed: " + error);
  }

  const data = await response.json();
  cachedToken = data.token;
  return cachedToken;
}

export async function Log(stack, level, packageName, message) {
  try {
    const token = await getAuthToken();

    const payload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: packageName.toLowerCase(),
      message,
    };

    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errMsg = await response.text();
      throw new Error(`Log failed: ${response.status} - ${errMsg}`);
    }

    const data = await response.json();
    console.log("Log Success:", data);
  } catch (err) {
    console.error("Log Error:", err.message);
  }
}
