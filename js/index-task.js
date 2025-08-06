import { createTask, deleteTask, updateTask  } from "./crud/tasks.js";

import { readAllTask } from "./crud/tasks.js";

// Elementos del DOM
const botonAbrir = document.getElementById("openModal");
const botonCancelar = document.getElementById("cancelBtn");
const modal = document.getElementById("modal");
const formulario = document.getElementById("taskForm");
const inputNombre = document.getElementById("taskName");
const listaTareas = document.getElementById("taskList");

// Mostrar modal
botonAbrir.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

// Ocultar modal
botonCancelar.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// Función para crear el <li> con botones, estilos y funcionalidad
function renderizarTarea(tarea) {
  const nuevaTarea = document.createElement("li");
  nuevaTarea.className =
    "bg-white bg-opacity-10 p-4 rounded shadow text-black flex items-center justify-between mb-2";

  // Texto de la tarea
  const texto = document.createElement("span");
  texto.textContent = tarea.name; // <- usamos el nombre del objeto recibido del backend

  // Contenedor de botones
  const botones = document.createElement("div");
  botones.className = "flex space-x-2";

  // Botón editar
  const btnEditar = document.createElement("button");
  btnEditar.innerHTML = "✏️";
  btnEditar.className = "hover:text-yellow-400";

  btnEditar.addEventListener("click", async function () {
    const nuevoNombre = prompt("Nuevo nombre de la tarea:", tarea.name);
    if (nuevoNombre && nuevoNombre.trim() !== "") {
      await updateTask({ name: nuevoNombre }, tarea.id); // usamos el CRUD
      texto.textContent = nuevoNombre; // actualizamos en pantalla
    }
  });

  // Botón borrar
  const btnBorrar = document.createElement("button");
  btnBorrar.innerHTML = "🗑️";
  btnBorrar.className = "hover:text-red-500";

  btnBorrar.addEventListener("click", async function () {
    await deleteTask(tarea.id); // llamamos al CRUD
    nuevaTarea.remove(); // quitamos el <li> del DOM
  });

  // Armamos la estructura
  botones.appendChild(btnEditar);
  botones.appendChild(btnBorrar);

  nuevaTarea.appendChild(botones);
  nuevaTarea.appendChild(texto);

  listaTareas.appendChild(nuevaTarea);
}

// Manejo del formulario
formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombreTarea = inputNombre.value;

  if (nombreTarea === "") {
    alert("Escribe algo primero.");
    return;
  }

  // 1. Creamos la tarea en el backend con el CRUD
  const nueva = await createTask({ name: nombreTarea });

  // 2. Mostramos la tarea en pantalla
  renderizarTarea(nueva);

  // 3. Limpiamos y cerramos modal
  inputNombre.value = "";
  modal.classList.add("hidden");
});

// Cuando se carga la página, mostrar tareas
document.addEventListener("DOMContentLoaded", async () => {
  const tareas = await readAllTask();
  tareas.forEach(renderizarTarea);
});

/*document.getElementById("algo") sirve para acceder a un botón o caja HTML desde JavaScript.

addEventListener("click", function...) permite hacer algo cuando haces clic.

.classList.remove("hidden") y .classList.add("hidden") muestran y ocultan cosas.

.appendChild añade elementos nuevos en una lista.

.value obtiene el texto que ha escrito el usuario en un input.

*/