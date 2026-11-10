const dialog = document.getElementById("rsvp-dialog");
document.getElementById("open-rsvp").addEventListener("click", () => dialog.showModal());
document.getElementById("close-rsvp").addEventListener("click", () => dialog.close());
document.getElementById("rsvp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("guest-name").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = `Hola, soy ${name}. ${attendance}. Número de personas: ${attendance.startsWith("Sí") ? guests : "0"}. Confirmo para la celebración de los 80 años de Teresita Borja, el 21 de noviembre de 2026.`;
  // Añade aquí el número de WhatsApp de la persona que recibirá las confirmaciones, con código de país y sin + ni espacios.
  const whatsappNumber = "";
  const url = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  dialog.close();
});