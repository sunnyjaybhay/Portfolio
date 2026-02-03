/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

mobileMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("header")) {
    mobileMenu?.classList.remove("active");
  }
});

/* ================= NAVIGATION TO SECTIONS ================= */
const projectsBuiltBtn = document.getElementById("projectsBuiltBtn");
const programmingLanguagesBtn = document.getElementById("programmingLanguagesBtn");

projectsBuiltBtn?.addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

programmingLanguagesBtn?.addEventListener("click", () => {
  document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
});

/* ================= CONFETTI ================= */
function createConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  const colors = ["#7c3aed", "#00f5ff", "#10b981", "#f59e0b", "#ef4444"];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

/* ================= CONTACT FORM ================= */
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");
const countdownEl = document.getElementById("countdown");

let countdownTimer;

/* SheetDB */
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/4bp1mc8z2p81v";

/* EmailJS (optional) */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Submitting...";

  const formData = {
    Name: from_name.value.trim(),
    Email: from_email.value.trim(),
    Subject: subject.value.trim(),
    Message: message.value.trim(),
    Timestamp: new Date().toISOString()
  };

  try {
    /* Save to SheetDB */
    await fetch(SHEETDB_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([formData])
    });

    /* Optional Email */
    if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.Name,
        from_email: formData.Email,
        message: formData.Message
      });
    }

    /* SUCCESS UI */
    successModal.classList.remove("hidden");
    createConfetti();

    let timeLeft = 5;
    countdownEl.textContent = timeLeft;

    countdownTimer = setInterval(() => {
      timeLeft--;
      countdownEl.textContent = timeLeft;
      if (timeLeft <= 0) closeModal();
    }, 1000);

    contactForm.reset();

  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";
  }
});

function closeModal() {
  successModal.classList.add("hidden");
  clearInterval(countdownTimer);
}

closeSuccessModal?.addEventListener("click", closeModal);
successModal?.addEventListener("click", (e) => {
  if (e.target === successModal) closeModal();
});


document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
