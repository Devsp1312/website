const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 70, 560)}ms`);
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
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

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

  note.textContent = "Opening your email app with the message ready to send.";
  window.location.href = href;
});
