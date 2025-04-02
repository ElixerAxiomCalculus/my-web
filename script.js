// script.js
window.addEventListener("load", () => {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
});


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-links");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
      });
    });
  }
});

// Theme toggle (if needed later)
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  });
}

// Modal functions (for experience section, when added)
function showDetails(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "block";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}
// ==== TYPEWRITER EFFECT ====
const typedText = document.getElementById("typed-text");
const phrases = [
  "I build AI things 🧠 | CSE @ VIT Vellore ",
  "Exploring Generative AI | CSE @ VIT Vellore ",
  "AI Researcher in the making | CSE @ VIT Vellore ",
  "CSE @ VIT Vellore "
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = isDeleting
    ? currentPhrase.substring(0, letterIndex--)
    : currentPhrase.substring(0, letterIndex++);

  typedText.textContent = currentText;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }
}

typeEffect();
function toggleDetails(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
// === CSV Chatbot Logic ===
let csvQA = [];

// Load chatbot-data.csv
Papa.parse("qa_data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    csvQA = results.data;
    console.log("CSV loaded successfully ✅", csvQA);
  }
});

// Toggle chatbot visibility
function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  chatBox.style.flexDirection = "column";
}

// Handle Enter key for submitting question
function handleKey(e) {
  if (e.key === "Enter") {
    const input = document.getElementById("chat-input");
    const question = input.value.trim();
    if (question) {
      addMessage(question, "user");
      respondToQuestion(question.toLowerCase());
      input.value = "";
    }
  }
}

// Add a chat message (user or bot)
function addMessage(msg, sender = "bot") {
  const container = document.getElementById("chat-messages");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender);
  msgDiv.textContent = msg;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// Match user question with CSV
function respondToQuestion(q) {
  let response = "";
  const normalizedQ = q.toLowerCase();

  for (const row of csvQA) {
    const keyword = row.question?.toLowerCase();
    if (keyword && normalizedQ.includes(keyword)) {
      response = row.answer;
      break;
    }
  }

  if (!response) {
    response = "I’m not sure how to answer that yet. Try asking about my skills, projects, or university!";
  }

  setTimeout(() => addMessage(response, "bot"), 400);
}
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Optional: Close menu when clicking a link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
});



