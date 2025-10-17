const API_KEY = "AIzaSyBFxnS16ZI3wxor8smZQlsv8o6mt6_Z6Es";

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`;

// GET HTML ELEMENTS
const promptInput = document.getElementById("prompt-input");
const generateBtn = document.getElementById("generate-btn");
const imageResult = document.getElementById("image-result");
const statuss = document.getElementById("status");
const caption = document.getElementById("caption")




async function generateImage(prompt) {
  statuss.textContent = "🧠 Thinking...";
  imageResult.innerHTML = "";
  caption.textContent = "";

  try {
    // SEND API REQUEST
    // GET API RESPONSE JSON
    // CODE HERE
    const response = await fetch(ENDPOINT,{
      method:"POST",
      headers: {"Content-Type":"aplication/json"},
      body: JSON.stringify({
        contents: [{parts: [{text: prompt}]}],
        generationConfig:{
          responseModalities: ["TEXT","IMAGE"],
        },
      }),
    });
    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      statuss.textContent = "⚠️ No response from model.";
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
    statuss.textContent="here you go";
  } catch (err) {
    // DISPLAY ERROR TEXT 
    statuss.textContent="sry we had an error";
  }
}

// GENERATE IMG BUTTON
generateBtn.onclick = () => {
  const prompt = promptInput.value.trim();
  if (prompt){
    generateImage(prompt);
  }
  else{
    statuss.testcontent="pls type a prompt";
  }
};
