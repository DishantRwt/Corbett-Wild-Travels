// SETUP BEFORE PUBLISHING:
// 1) Replace WHATSAPP_NUMBER with your WhatsApp number in international format,
//    digits only. Example for India: 919876543210
// 2) Replace DISPLAY_PHONE and DISPLAY_EMAIL with your real business contacts.
const WHATSAPP_NUMBER = "917668586808";
const DISPLAY_PHONE = "917668586808";
const DISPLAY_EMAIL = "gr7278327@gmail.com";

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("displayPhone").textContent = DISPLAY_PHONE;
const emailLink = document.getElementById("displayEmail");
emailLink.textContent = DISPLAY_EMAIL;
emailLink.href = "mailto:" + DISPLAY_EMAIL;

const floatLink = document.getElementById("waFloat");
floatLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
floatLink.addEventListener("click", (event) => {
  if (WHATSAPP_NUMBER.includes("X")) {
    event.preventDefault();
    alert("Please add your WhatsApp number in script.js before publishing.");
  }
});

document.getElementById("enquiryForm").addEventListener("submit", function(event) {
  event.preventDefault();
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Website setup pending: add your WhatsApp number in script.js first.");
    return;
  }
  const value = id => document.getElementById(id).value.trim();
  const message = [
    "Hello Jim Corbett Tourism! I want to enquire about a trip.",
    `Name: ${value("name")}`,
    `Mobile: ${value("phone")}`,
    `Travel date: ${value("date")}`,
    `Travellers: ${value("people")}`,
    `Requirement: ${value("service")}`,
    `Budget: ${value("budget") || "Not specified"}`,
    `Message: ${value("message") || "None"}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

const langBtn = document.getElementById("langBtn");
let currentLang = "en";
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "hi" : "en";
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-en][data-hi]").forEach(el => {
    el.innerHTML = el.dataset[currentLang];
  });
  langBtn.textContent = currentLang === "en" ? "हिन्दी" : "English";
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));
