// -----------------------------
// CONFIGURACIÓN Y VARIABLES
// -----------------------------

const TASKS_API = "http://localhost:3000/tasks"; // URL de la API donde se guardan las tareas
const todoInput = document.querySelector('#todo__input');     // Referencia al input donde el usuario escribe la tarea
const addBtn = document.querySelector('.todo__add__btn');     // Referencia al botón "+" para añadir una tarea
const todoList = document.querySelector('.todo__list');       // Referencia a la lista UL donde se muestran las tareas

// -----------------------------
// UTILIDADES: LOCAL STORAGE
// -----------------------------

// Guarda el array de tareas en localStorage en formato texto (JSON)
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Recupera las tareas del localStorage y las convierte en un array
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || []; // Si no hay tareas, devuelve un array vacío
}

// Añade una tarea nueva al localStorage
function addTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage(); // Carga las tareas actuales
    tasks.push(task);                         // Añade la nueva tarea
    saveTasksToLocalStorage(tasks);           // Guarda el array actualizado
}

// Elimina una tarea por su ID del localStorage
function deleteTaskFromLocalStorage(id) {
    let tasks = getTasksFromLocalStorage();                    // Carga tareas
    tasks = tasks.filter(task => task.id !== id);             // Filtra para eliminar la tarea con ese ID
    saveTasksToLocalStorage(tasks);                           // Guarda el nuevo array
}

// Actualiza una tarea en el localStorage por su ID
function updateTaskInLocalStorage(updatedTask) {
    let tasks = getTasksFromLocalStorage();                   // Carga tareas
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task); // Reemplaza la tarea
    saveTasksToLocalStorage(tasks);                           // Guarda el array actualizado
}

// -----------------------------
// FUNCIONES CRUD CON BACKUP
// -----------------------------

// CREATE: Crear una tarea nueva en la API
async function createTask(task) {
    try {
        const response = await fetch(TASKS_API, {             // Envía la tarea a la API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        });
        const data = await response.json();                   // Devuelve la tarea creada desde la API
        return data;
    } catch (error) {
        // Si la API falla, se guarda en localStorage
        task.id = Date.now().toString();                      // Crea un ID único con la hora actual
        addTaskToLocalStorage(task);                          // Guarda en localStorage
        return task;                                          // Devuelve la tarea creada localmente
    }
}

// READ: Leer todas las tareas desde la API
async function readAllTask() {
    try {
        const response = await fetch(TASKS_API);              // Pide todas las tareas
        const data = await response.json();                   // Convierte la respuesta a JSON
        return data;
    } catch (error) {
        return getTasksFromLocalStorage();                    // Si falla la API, carga desde localStorage
    }
}

// UPDATE: Actualizar una tarea en la API
async function updateTask(updatedTask, id) {
    try {
        const response = await fetch(`${TASKS_API}/${id}`, {  // Actualiza tarea en la API por su ID
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        updateTaskInLocalStorage(updatedTask);                // Si falla la API, actualiza en localStorage
        return updatedTask;
    }
}

// DELETE: Eliminar una tarea de la API
async function deleteTask(id) {
    try {
        await fetch(`${TASKS_API}/${id}`, { method: "DELETE" }); // Llama a la API para eliminar la tarea
    } catch (error) {
        deleteTaskFromLocalStorage(id);                       // Si falla, la elimina del localStorage
    }
}

// -----------------------------
// CONEXIÓN CON EL DOM
// -----------------------------

document.addEventListener('DOMContentLoaded', loadTasks);     // Cuando se carga la página, se cargan las tareas
addBtn.addEventListener('click', handleAddTask);              // Al hacer click en el botón "+", se añade una tarea

// -----------------------------
// FUNCIONES PRINCIPALES
// -----------------------------

// Cargar todas las tareas y mostrarlas en pantalla
async function loadTasks() {
    const tasks = await readAllTask();                        // Lee todas las tareas (API o local)
    todoList.innerHTML = '';                                  // Limpia la lista de tareas

    tasks.forEach(task => {                                   // Recorre cada tarea
        const taskElement = createTaskElement(task);          // Crea un elemento <li> para cada tarea
        todoList.appendChild(taskElement);                    // Añade la tarea a la lista en el DOM
    });
}

// Añadir una nueva tarea desde el input
async function handleAddTask() {
    const text = todoInput.value.trim();                      // Obtiene y limpia el texto del input
    if (!text) {
        alert('Escribe una tarea');                           // Valida que no esté vacío
        return;
    }

    const newTask = {
        taskTitle: text                                       // Crea el objeto tarea con el texto
    };

    const savedTask = await createTask(newTask);              // La guarda en la API o en localStorage

    const taskElement = createTaskElement(savedTask);         // Crea el elemento HTML
    todoList.appendChild(taskElement);                        // Lo añade al DOM

    todoInput.value = '';                                     // Limpia el input
}

// Crear un <li> con los botones y texto de una tarea
function createTaskElement(task) {
    const li = document.createElement('li');                  // Crea un <li> nuevo
    li.className = 'todo__list__lis';                         // Añade clase CSS

    const taskText = document.createElement('div');           // Crea un div para el texto de la tarea
    taskText.textContent = task.taskTitle;                    // Pone el texto de la tarea

    const btnBox = document.createElement('div');             // Contenedor de botones

    // Botón "Done" ✅
    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✅ done';                           // Texto del botón
    doneBtn.className = 'done';                               // Clase CSS
    doneBtn.addEventListener('click', () => {
        taskText.style.textDecoration = 'line-through';       // Marca la tarea como completada visualmente
    });

    // Botón "Delete" 🗑️
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑️ remove';                      // Texto del botón
    removeBtn.className = 'remove';                           // Clase CSS
    removeBtn.addEventListener('click', async () => {
        await deleteTask(task.id);                            // Elimina la tarea (API o local)
        li.remove();                                          // Elimina el <li> del DOM
    });

    // Botón "Edit" ✏️
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️ edit';                          // Texto del botón
    editBtn.className = 'edit';                               // Clase CSS
    editBtn.addEventListener('click', async () => {
        const newText = prompt("Editar tarea:", task.taskTitle); // Pregunta el nuevo texto
        if (!newText || newText.trim() === "") return;        // Si está vacío, no hace nada

        const updatedTask = {
            ...task,                                          // Copia la tarea original
            taskTitle: newText.trim()                         // Cambia el texto
        };

        await updateTask(updatedTask, task.id);               // Actualiza la tarea en API o local
        taskText.textContent = updatedTask.taskTitle;         // Cambia el texto en el DOM
    });

    // Añadir botones al contenedor
    btnBox.appendChild(doneBtn);
    btnBox.appendChild(removeBtn);
    btnBox.appendChild(editBtn);

    // Añadir texto y botones al <li>
    li.appendChild(taskText);
    li.appendChild(btnBox);

    return li;                                                 // Devuelve el <li> completo
}
