/* =========================================================
   दख्खनचे शिलेदार प्रतिष्ठान — script.js
   Vanilla JS: language toggle, nav, reveal animations, Google Form
   ========================================================= */
/* -----------------------------------------------------------
   CONFIG
   Replace this with your actual Google Form link.
   Every registration / join button uses this single variable.
------------------------------------------------------------ */
const TREK_REGISTRATION_URL = "YOUR_GOOGLE_FORM_URL_HERE";
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Language toggle ---------------- */
  let currentLang = "mr";
  const langSwitch = document.getElementById("langSwitch");
  const translatable = document.querySelectorAll("[data-mr]");
  function applyLanguage(lang){
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);
    translatable.forEach(el => {
      const text = lang === "en" ? el.dataset.en : el.dataset.mr;
      if (text !== undefined) el.innerHTML = text;
    });
    langSwitch.querySelectorAll(".lang-opt").forEach(opt => {
      opt.classList.toggle("is-active", opt.dataset.lang === lang);
    });
    document.title = lang === "en"
      ? "Dakkhanche Shiledar Pratishthaan | Maharashtra Fort Heritage"
      : "दख्खनचे शिलेदार प्रतिष्ठान | गड-किल्ले, इतिहास, संवर्धन";
  }
  langSwitch.addEventListener("click", () => {
    applyLanguage(currentLang === "mr" ? "en" : "mr");
  });
  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById("navbar");
  function onScroll(){
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  /* ---------------- Mobile hamburger menu ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
  /* ---------------- Google Form registration ---------------- */
  function openRegistrationForm(){
    if (!TREK_REGISTRATION_URL || TREK_REGISTRATION_URL === "YOUR_GOOGLE_FORM_URL_HERE"){
      alert(currentLang === "en"
        ? "Registration link will be added soon."
        : "नोंदणीची लिंक लवकरच जोडली जाईल.");
      return;
    }
    window.open(TREK_REGISTRATION_URL, "_blank", "noopener");
  }
  document.querySelectorAll(".trek-register").forEach(btn => {
    btn.addEventListener("click", openRegistrationForm);
  });
  const joinBtn = document.getElementById("joinBtn");
  if (joinBtn) joinBtn.addEventListener("click", openRegistrationForm);
  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(
    ".section h2, .card, .trek-card, .step, .gallery__item, .contact__card, .beginning__grid, .who__grid > *"
  );
  revealTargets.forEach(el => el.setAttribute("data-reveal", ""));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => observer.observe(el));
  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
