export async function getAuthToken() {
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

  if (!response.ok) throw new Error("Failed to get auth token");

  const data = await response.json();
  return data.token;
}
