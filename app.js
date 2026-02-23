const STORAGE_KEY = "radar-documentos";

const form = document.getElementById("document-form");
const tipoInput = document.getElementById("tipo");
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const fechaInput = document.getElementById("fecha");
const listaNotas = document.getElementById("lista-notas");
const listaAdministrativos = document.getElementById("lista-administrativos");

function obtenerDocumentos() {
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : [];
}

function guardarDocumentos(documentos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documentos));
}

function crearItem(documento) {
  const item = document.createElement("li");
  item.className = "document-item";
  item.innerHTML = `
    <h4>${documento.titulo}</h4>
    <p>${documento.descripcion}</p>
    <small>Fecha: ${documento.fecha}</small>
  `;
  return item;
}

function renderizarListas() {
  const documentos = obtenerDocumentos();
  const notas = documentos.filter((doc) => doc.tipo === "nota-periodistica");
  const administrativos = documentos.filter((doc) => doc.tipo === "documento-administrativo");

  listaNotas.innerHTML = "";
  listaAdministrativos.innerHTML = "";

  if (notas.length === 0) {
    listaNotas.innerHTML = '<li class="empty">Sin documentos registrados.</li>';
  } else {
    notas.forEach((doc) => listaNotas.appendChild(crearItem(doc)));
  }

  if (administrativos.length === 0) {
    listaAdministrativos.innerHTML = '<li class="empty">Sin documentos registrados.</li>';
  } else {
    administrativos.forEach((doc) => listaAdministrativos.appendChild(crearItem(doc)));
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nuevoDocumento = {
    tipo: tipoInput.value,
    titulo: tituloInput.value.trim(),
    descripcion: descripcionInput.value.trim(),
    fecha: fechaInput.value,
  };

  const documentos = obtenerDocumentos();
  documentos.push(nuevoDocumento);
  guardarDocumentos(documentos);

  form.reset();
  renderizarListas();
});

renderizarListas();
