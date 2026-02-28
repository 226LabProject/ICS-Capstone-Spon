// ============================================================
// mission.js — ICS Capstone Sponsorship Page
// ============================================================


// ============================================================
// CONFIRMED SPONSORS
// To add a sponsor: append an object with company and level.
// ============================================================
const sponsors = [];


// ============================================================
// SPONSOR TABLE
// ============================================================
function renderSponsorTable() {
  const section = document.getElementById("our-sponsors");
  const table   = document.getElementById("sponsor-table");
  if (!section || !table) return;

  if (sponsors.length === 0) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = sponsors.map(s => `
    <tr>
      <td>${s.company}</td>
      <td>${s.level}</td>
    </tr>
  `).join("");
}


// ============================================================
// AMOUNT → LEVEL INDICATOR + CONDITIONAL LOGO VISIBILITY
// ============================================================
const LEVELS = [
  { min: 1000, label: "Level 4 — $1,000+ (Key Sponsor)", logoRequired: true  },
  { min: 500,  label: "Level 3 — $500+",                 logoRequired: true  },
  { min: 300,  label: "Level 2 — $300+",                 logoRequired: true  },
  { min: 150,  label: "Level 1 — $150+",                 logoRequired: false },
];

function initLevelIndicator() {
  const amountInput   = document.getElementById("amount");
  const indicator     = document.getElementById("levelIndicator");
  const levelValue    = document.getElementById("levelValue");
  const resolvedLevel = document.getElementById("resolvedLevel");
  const logoField     = document.getElementById("logo-field");

  if (!amountInput || !indicator || !levelValue || !resolvedLevel) return;

  function updateLevel() {
    const raw = amountInput.value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);

    if (!raw || isNaN(num) || num <= 0) {
      indicator.className    = "level-indicator no-level";
      levelValue.textContent = "Enter an amount above";
      resolvedLevel.value    = "";
      if (logoField) logoField.classList.add("hidden");
      return;
    }

    const match = LEVELS.find(l => num >= l.min);

    if (match) {
      indicator.className    = "level-indicator";
      levelValue.textContent = match.label;
      resolvedLevel.value    = match.label;
      if (logoField) logoField.classList.toggle("hidden", !match.logoRequired);
    } else {
      // Below Level 1 minimum — still welcome, treat as Level 1
      indicator.className    = "level-indicator no-level";
      levelValue.textContent = `$${num.toFixed(0)} — Level 1: Thank you for your support!`;
      resolvedLevel.value    = "Level 1 — Thank You";
      if (logoField) logoField.classList.add("hidden");
    }
  }

  amountInput.addEventListener("input", updateLevel);
}


// ============================================================
// PHONE AUTO-FORMATTING  →  (XXX) XXX-XXXX
// ============================================================
function initPhoneFormat() {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;

  phoneInput.addEventListener("input", function () {
    // Strip everything except digits
    const digits = this.value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";

    if (digits.length <= 3) {
      formatted = digits.length ? `(${digits}` : "";
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    this.value = formatted;
  });
}


// ============================================================
// FORM — VALIDATION, SUBMISSION, STATUS HANDLING
// ============================================================
function initSponsorForm() {
  const form      = document.getElementById("sponsorshipForm");
  const statusEl  = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !statusEl || !submitBtn) return;

  // Modal elements
  const modal     = document.getElementById("successModal");
  const closeBtn  = document.getElementById("modalCloseBtn");

  if (modal && closeBtn) {
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      // Close if clicking the backdrop (not the box itself)
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  function closeModal() {
    if (modal) modal.classList.remove("open");
  }

  function openModal() {
    if (modal) {
      modal.classList.add("open");
      document.getElementById("modalCloseBtn")?.focus();
    }
  }

  // Handle redirects from submit.php via query params
  const params = new URLSearchParams(window.location.search);

  if (params.get("success") === "1") {
    showSuccess();
    history.replaceState({}, "", window.location.pathname + "#sponsor-form");
  }

  if (params.get("error") === "validation") {
    showError("Some required fields were missing or invalid. Please check your submission and try again.");
    history.replaceState({}, "", window.location.pathname + "#sponsor-form");
  }

  if (params.get("error") === "send") {
    showError("Your submission was received but we had trouble sending the confirmation email. Please contact us directly at ics.capstone.club@gmail.com.");
    history.replaceState({}, "", window.location.pathname + "#sponsor-form");
  }

  if (params.get("error") === "save") {
    showError("We were unable to save your submission due to a server error. Please contact us directly at ics.capstone.club@gmail.com and we'll get you sorted out.");
    history.replaceState({}, "", window.location.pathname + "#sponsor-form");
  }

  form.addEventListener("submit", function (e) {
    const company = document.getElementById("companyName").value.trim();
    const email   = document.getElementById("email").value.trim();
    const amount  = document.getElementById("amount").value.trim();

    // Client-side required field check
    if (!company || !email || !amount) {
      e.preventDefault();
      showError("Please fill in all required fields: Company / Organization Name, Email, and Amount.");
      return;
    }

    // Honeypot — silently drop without feedback
    if (document.getElementById("website").value) {
      e.preventDefault();
      return;
    }

    // Prevent double-submit
    submitBtn.disabled    = true;
    submitBtn.textContent = "Sending…";
  });

  function showSuccess() {
    openModal();
    history.replaceState({}, "", window.location.pathname + "#sponsor-form");
  }

  function showError(msg) {
    statusEl.className   = "form-status error";
    statusEl.textContent = msg;
    statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}


// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  renderSponsorTable();
  initLevelIndicator();
  initPhoneFormat();
  initSponsorForm();
});