const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");
const successCard = document.querySelector("#success-card");
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 70, 520)}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  sections.forEach((section) => navObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim() || "A new client";
  const email = data.get("email")?.toString().trim() || "";
  const phone = data.get("phone")?.toString().trim() || "";
  const message = data.get("message")?.toString().trim() || "";

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    message,
  ].join("\n");

  const href = `mailto:hello@homepetsitting.com?subject=${encodeURIComponent(
    "House sitting request"
  )}&body=${encodeURIComponent(body)}`;

  successCard?.classList.add("is-visible");
  if (successCard) {
    successCard.querySelector("h3").textContent = "Message ready!";
    successCard.querySelector("p").textContent =
      "Your email app should open with the details filled in.";
  }
  note.textContent = "Opening your email app with the message ready to send.";
  window.location.href = href;
});
