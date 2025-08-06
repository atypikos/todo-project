import { createTask } from "./crud/tasks.js";

const OPENMODAL = document.getElementById("openModal");
const MODAL = document.getElementById("modal");
const CANCELTASKBTN = document.getElementById("cancelBtn");
const FORM = document.getElementById("taskForm");

// Mostrar el popup al hacer clic en "Añadir tarea"
OPENMODAL.addEventListener("click", () => {
  MODAL.classList.remove("hidden");
});

// Cancelar: cerrar el popup sin hacer nada
CANCELTASKBTN.addEventListener("click", () => {
  MODAL.classList.add("hidden");
});

// Enviar tarea con submit y ejecutar createTask()
FORM.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que recargue la página
  createTask();       // Ejecuta tu función de CRUD
  MODAL.classList.add("hidden"); // Oculta el modal tras añadir la tarea
});
