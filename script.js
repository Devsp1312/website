const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");

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
