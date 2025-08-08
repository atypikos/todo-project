// import { createTask, deleteTask, updateTask, readAllTask  } from "./crud/tasks.js";

// Elementos del DOM
  const ABREFORM = document.getElementById("openModal");
  const CIERRAFORM = document.getElementById("cancelBtn");
  const MODAL = document.getElementById("modal");

  //ABRE FORM

ABREFORM.addEventListener("click", () => {
  MODAL.classList.remove("hidden");
});

//CIERRA FORM

CIERRAFORM.addEventListener("click", () => {
  MODAL.classList.add("hidden");
});












/*document.getElementById("algo") sirve para acceder a un botón o caja HTML desde JavaScript.

addEventListener("click", function...) permite hacer algo cuando haces clic.

.classList.remove("hidden") y .classList.add("hidden") muestran y ocultan cosas.

.appendChild añade elementos nuevos en una lista.

.value obtiene el texto que ha escrito el usuario en un input.

*/