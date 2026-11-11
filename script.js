// SETUP BEFORE PUBLISHING:
// 1) Replace WHATSAPP_NUMBER with your WhatsApp number in international format,
//    digits only. Example for India: 919876543210
// 2) Replace DISPLAY_PHONE and DISPLAY_EMAIL with your real business contacts.
const WHATSAPP_NUMBER = "917668586808";
const DISPLAY_PHONE = "+91 7668586808";
const DISPLAY_EMAIL = "gr7278327@gmail.com";

document.getElementById("year").textContent = new Date().getFullYear();
const phoneLink = document.getElementById("displayPhone");
phoneLink.textContent = DISPLAY_PHONE;
phoneLink.href = "tel:+917668586808";
const emailLink = document.getElementById("displayEmail");
emailLink.querySelector("span").textContent = DISPLAY_EMAIL;
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

emailLink.href = isMobile
  ? "mailto:" + DISPLAY_EMAIL
  : "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(DISPLAY_EMAIL);emailLink.target = "_blank";
emailLink.rel = "noopener noreferrer";
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
    `Travel date: ${value("date").split("-").reverse().join("-")}`,
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
// Gallery lightbox
document.addEventListener("DOMContentLoaded", () => {
  const galleryLinks = [...document.querySelectorAll(".gallery a")];
  if (!galleryLinks.length) return;

  const images = galleryLinks.map(link => ({
    src: link.querySelector("img").src,
    alt: link.querySelector("img").alt
  }));

  let currentIndex = 0;

  const style = document.createElement("style");
  style.textContent = `
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.94);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 55px 65px;
    }
    .lightbox.show { display: flex; }
    .lightbox img {
      max-width: 90%;
      max-height: 85vh;
      object-fit: contain;
    }
    .lightbox button {
      position: absolute;
      border: 0;
      color: white;
      background: rgba(255,255,255,.18);
      cursor: pointer;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      font-size: 27px;
    }
    .lightbox .close { top: 15px; right: 20px; }
    .lightbox .prev { left: 15px; top: 50%; }
    .lightbox .next { right: 15px; top: 50%; }
    .lightbox .counter {
      position: absolute;
      bottom: 15px;
      color: white;
      font-size: 15px;
    }
  `;
  document.head.appendChild(style);

  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <button class="close" aria-label="Close">×</button>
    <button class="prev" aria-label="Previous photo">‹</button>
    <img alt="">
    <button class="next" aria-label="Next photo">›</button>
    <div class="counter"></div>
  `;
  document.body.appendChild(box);

  const bigImage = box.querySelector("img");
  const counter = box.querySelector(".counter");

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    bigImage.src = images[currentIndex].src;
    bigImage.alt = images[currentIndex].alt;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function closeBox() {
    box.classList.remove("show");
  }

  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showImage(index);
      box.classList.add("show");
    });
  });

  box.querySelector(".prev").addEventListener("click", () => showImage(currentIndex - 1));
  box.querySelector(".next").addEventListener("click", () => showImage(currentIndex + 1));
  box.querySelector(".close").addEventListener("click", closeBox);

  box.addEventListener("click", event => {
    if (event.target === box) closeBox();
  });

  document.addEventListener("keydown", event => {
    if (!box.classList.contains("show")) return;
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "Escape") closeBox();
  });
});
