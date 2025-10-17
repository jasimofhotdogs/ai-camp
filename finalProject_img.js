const API_KEY = ""; // 🔐 Replace with your actual key
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`;

// GET HTML ELEMENTS

async function generateImage(prompt) {
  status.textContent = "🧠 Thinking...";
  imageResult.innerHTML = "";
  caption.textContent = "";

  try {
    // SEND API REQUEST
    // GET API RESPONSE JSON
    // CODE HERE
    const parts = data?.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      status.textContent = "⚠️ No response from model.";
      return;
    }

    parts.forEach((part) => {
      if (part.inlineData?.data) {
        const img = document.createElement("img");
        img.src = `data:image/png;base64,${part.inlineData.data}`;
        imageResult.appendChild(img);
      }

      if (part.text) {
        caption.textContent = part.text;
        imageResult.prepend(caption);
      }
    });

    // DISPLAY SUCCESS TEXT
  } catch (err) {
    // DISPLAY ERROR TEXT 
  }
}

// GENERATE IMG BUTTON