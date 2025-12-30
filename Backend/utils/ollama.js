import fetch from "node-fetch";

const getOllamaResponse = async (message) => {
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        messages: [{ role: "user", content: message }], // correct format
        stream: false
      }),
    });

    const data = await response.json();
    // return the assistant's reply
    return data.message?.content || data.message || ""; 

  } catch (err) {
    console.error("Ollama API error:", err);
    throw new Error(err.message); // throw error to route handler
  }
};

export default getOllamaResponse;
