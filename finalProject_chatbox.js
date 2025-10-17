const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY = "AIzaSyBFxnS16ZI3wxor8smZQlsv8o6mt6_Z6Es";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Store full conversation context
const conversationHistory = [];

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  const formatted = marked.parse(text);
  div.innerHTML = `<span class="${sender === "user" ? "user" : "ai"}">${
    sender === "user" ? "You" : "🤖 AI"
  }:</span><br>${formatted}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  conversationHistory.push({ role: "user", text: input });

  try {
    const contents = conversationHistory.map((msg) => ({
      parts: [{ text: msg.text }],
      role: msg.role,
    }));
    // Send API request
    // code here
    const res = await fetch(ENDPOINT,{
      method: "POST",
      headers: {"content-Type":"aplication/json" },
      body:JSON.stringify({contents}),
    });

    const data = await res.json();
    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiReply) {
      // Add AI reply to conversation history and display it
      conversationHistory.push({ role:"model", text: aiReply});
      appendMessage("ai",aiReply);
    }
    else{
      appendMessage("ai","Im sorry i cant understand the question")

    }
  } catch (err) {
    // Display error if there are user errors
      appendMessage("ai"," there is a error ")
  }
}

// Handle user input

sendBtn.onclick = sendMessage;
userInput.addEventListener("keydown", (e) =>{
  if (e.key === "enter") sendMessage();
});