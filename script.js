const familias = {
  "edgar": {
    nombre: "Edgar Borja y Familia",
    contacto: "Edgar Borja",
    adultos: 2,
    ninos: 3
  },
  "pablo-pino": {
    nombre: "Pablo Pino y Familia",
    contacto: "Pablo Pino",
    adultos: 2,
    ninos: 0
  },
  "andres-pino": {
    nombre: "Andres Pino y Familia",
    contacto: "Andres Pino",
    adultos: 2,
    ninos: 1
  },
  "michael-pino": {
    nombre: "Michael Pino y Familia",
    contacto: "Michael Pino",
    adultos: 2,
    ninos: 0
  },
  "crys-munoz": {
    nombre: "Crys Muñoz y Familia",
    contacto: "Crys Muñoz",
    adultos: 2,
    ninos: 1
  },
  "mario-ulloa": {
    nombre: "Mario Ulloa y Familia",
    contacto: "Mario Ulloa",
    adultos: 4,
    ninos: 0
  },
  "mario-alejandro-ulloa": {
    nombre: "Mario Alejandro Ulloa y Familia",
    contacto: "Mario Alejandro Ulloa",
    adultos: 2,
    ninos: 0
  },
  "gabriel-vergara": {
    nombre: "Gabriel Vergara y Familia",
    contacto: "Gabriel Vergara",
    adultos: 3,
    ninos: 0
  },
  "giovanny-hidrovo": {
    nombre: "Giovanny Hidrovo y Familia",
    contacto: "Giovanny Hidrovo",
    adultos: 2,
    ninos: 1
  },
  "miguel-herrera": {
    nombre: "Miguel Herrera y Familia",
    contacto: "Miguel Herrera",
    adultos: 2,
    ninos: 1
  },
  "veronica-vergara": {
    nombre: "Verónica Vergara y Familia",
    contacto: "Verónica Vergara",
    adultos: 3,
    ninos: 0
  },
  "david-pazmino": {
    nombre: "David Pazmiño y Familia",
    contacto: "David Pazmiño",
    adultos: 2,
    ninos: 1
  }
};

const parametros = new URLSearchParams(window.location.search);
const codigoFamilia = parametros.get("familia");
const familia = codigoFamilia ? familias[codigoFamilia.toLowerCase()] : null;

const dialog = document.getElementById("rsvp-dialog");
const formulario = document.getElementById("rsvp-form");
const botonAbrir = document.getElementById("open-rsvp");
const botonCerrar = document.getElementById("close-rsvp");
const nombreInput = document.getElementById("guest-name");
const asistencia = document.getElementById("attendance");

function crearOpciones(maximo, seleccionado) {
  return Array.from({ length: maximo + 1 }, (_, numero) =>
    `<option value="${numero}" ${numero === seleccionado ? "selected" : ""}>${numero}</option>`
  ).join("");
}

if (familia) {
  nombreInput.value = familia.contacto;

  const invitacion = document.getElementById("family-invite");
  const nombreFamilia = document.getElementById("family-name");
  const pasesFamilia = document.getElementById("family-passes");
  const textoConfirmacion = document.querySelector(".rsvp-card .body-copy");
  const etiquetaAnterior = document.getElementById("guests").closest("label");

  invitacion.hidden = false;
  nombreFamilia.textContent = familia.nombre;
  pasesFamilia.textContent =
    `Pases reservados: ${familia.adultos} adultos y ${familia.ninos} niños`;

  textoConfirmacion.textContent =
    `Esta invitación está dirigida a ${familia.nombre}. Nos encantará compartir contigo esta celebración.`;

  document.getElementById("rsvp-family").textContent = familia.nombre;

  etiquetaAnterior.innerHTML = `
    <span>¿Cuántos adultos asistirán? (Máximo ${familia.adultos})</span>
    <select id="adultos" name="adultos" required>
      ${crearOpciones(familia.adultos, familia.adultos)}
    </select>

    <span style="display:block;margin-top:14px">
      ¿Cuántos niños asistirán? (Máximo ${familia.ninos})
    </span>
    <select id="ninos" name="ninos" required>
      ${crearOpciones(familia.ninos, familia.ninos)}
    </select>
  `;
}

if (botonAbrir) {
  botonAbrir.addEventListener("click", () => {
    if (!familia) {
      alert("Utiliza el enlace personalizado que recibiste para confirmar tu asistencia.");
      return;
    }

    dialog.showModal();
  });
}

if (botonCerrar) {
  botonCerrar.addEventListener("click", () => {
    dialog.close();
  });
}

if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!familia) return;

    const nombre = nombreInput.value.trim();
    const respuesta = asistencia.value;
    let mensaje;

    if (respuesta.startsWith("Sí")) {
      const adultos = Number(document.getElementById("adultos").value);
      const ninos = Number(document.getElementById("ninos").value);

      if (adultos + ninos < 1) {
        alert("Selecciona al menos una persona para confirmar.");
        return;
      }

      mensaje =
        `Hola, soy ${nombre}. Sí, asistiré. Número de personas: ${adultos} adultos y ${ninos} niños. Confirmo para la celebración de los 80 años de Teresita Borja, el 21 de noviembre de 2026.`;
    } else {
      mensaje =
        `Hola, soy ${nombre}. No podré asistir a la celebración de los 80 años de Teresita Borja, el 21 de noviembre de 2026.`;
    }

    const whatsappNumber = "";

    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`
      : `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    dialog.close();
  });
}
