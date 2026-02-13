const config = {
  toName: "Alejandro",
  fromName: "Cristian",
  subtitle: "Me gustas un montón y quería preguntártelo de la forma más linda (y Minecraft) posible.",
  hint: "Tip: el botón 'No' se pone tímido…",
  mcLine: "¿Hacemos team el 15? 💚",

  details: {
    fecha: "15 de febrero",
    hora: "7:00 pm",
    lugar: "En mi casa",
    plan: "Nos vemos en mi casa y luego vamos a comer a un restaurante",
    nota: "Yo me encargo de organizarlo bonito."
  },

  // WhatsApp en formato internacional: Colombia = 57 + número (sin +, sin espacios)
  whatsappNumber: "573016397568"
};

const toNameEl = document.getElementById("toName");
const subtitleEl = document.getElementById("subtitle");
const hintEl = document.getElementById("hint");
const signatureEl = document.getElementById("signature");
const mcLineEl = document.getElementById("mcLine");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const modal = document.getElementById("yesModal");
const modalText = document.getElementById("modalText");
const detailsBox = document.getElementById("details");
const waLink = document.getElementById("waLink");
const closeModal = document.getElementById("closeModal");

// Init
toNameEl.textContent = config.toName;
subtitleEl.textContent = config.subtitle;
hintEl.textContent = config.hint;
mcLineEl.textContent = config.mcLine;
signatureEl.textContent = `— ${config.fromName}`;

const noPhrases = [
  "¿Seguro, Ale? 🥺",
  "Yo invito…",
  "Podemos hacerlo tranqui",
  "Prometo que será bonito",
  "Dime que sííí",
  "Ok… pero te voy a extrañar ese día 😭"
];

let noCount = 0;
let yesScale = 1;

function renderDetails() {
  const d = config.details;
  detailsBox.innerHTML = `
    <div><strong>Fecha:</strong> ${d.fecha}</div>
    <div><strong>Hora:</strong> ${d.hora}</div>
    <div><strong>Lugar:</strong> ${d.lugar}</div>
    <div><strong>Plan:</strong> ${d.plan}</div>
    <div><strong>Nota:</strong> ${d.nota}</div>
  `;
}

function buildWhatsAppLink() {
  const d = config.details;
  const text =
`Holaa ${config.fromName} 💚
Soy ${config.toName} y… sí acepto.
Fecha: ${d.fecha}
Hora: ${d.hora}
¿Confirmamos?`;
  waLink.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

noBtn.addEventListener("click", () => {
  noBtn.textContent = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  noCount++;

  yesScale = Math.min(yesScale + 0.18, 1.95);
  yesBtn.style.transform = `scale(${yesScale})`;

  const card = document.querySelector(".card");
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 14;

  const maxX = cardRect.width - btnRect.width - padding * 2;
  const maxY = cardRect.height - btnRect.height - padding * 2;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  if (noCount >= 2) {
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    card.style.position = "relative";
  }
});

yesBtn.addEventListener("click", () => {
  renderDetails();
  buildWhatsAppLink();
  modalText.textContent = `Alejandro, me harías muy feliz. ¿Lo confirmamos por WhatsApp?`;
  modal.showModal();
});

closeModal.addEventListener("click", () => modal.close());

