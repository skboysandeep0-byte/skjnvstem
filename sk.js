// ================================
// NAVODAYA STEM UI – CORE JS
// ================================

// DOM Elements
const msgContainer = document.getElementById("messages");
const msgInput = document.getElementById("msg");
const userInput = document.getElementById("user");

// Load saved username
window.onload = () => {
  const savedUser = localStorage.getItem("jnvUser");
  if (savedUser) userInput.value = savedUser;
};

// Save username
userInput.addEventListener("change", () => {
  localStorage.setItem("jnvUser", userInput.value);
});

// UI Message Render
function renderMessage(user, text, self = false) {
  const msg = document.createElement("div");
  msg.className = self ? "msg self" : "msg";

  msg.innerHTML = `
    <span class="user">${user}</span>
    <p>${text}</p>
  `;

  msgContainer.appendChild(msg);
  autoScroll();
}

// Auto Scroll
function autoScroll() {
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Typing Indicator
let typingTimeout;
msgInput.addEventListener("input", () => {
  showTyping();
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(hideTyping, 1000);
});

function showTyping() {
  document.getElementById("typing").style.display = "block";
}

function hideTyping() {
  document.getElementById("typing").style.display = "none";
}

// Send Message (UI only)
function sendUIMessage() {
  const user = userInput.value.trim();
  const msg = msgInput.value.trim();

  if (!user || !msg) return;

  renderMessage(user, msg, true);
  msgInput.value = "";

  // backend hook here (Firebase/API)
}
