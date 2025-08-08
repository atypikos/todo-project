const TASKS_API = "http://localhost:3000/tasks";

// CREATE (CRUD)

async function createTask(task) {
    const response = await fetch(TASKS_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    });

    const data = await response.json();
    return data;
}


// READ ALL (CRUD)

async function readAllTask() {
    const response = await fetch(TASKS_API);
    const data = await response.json();

    return data;
}


async function readTaskByID(taskID) {
    const response = await fetch(`${TASKS_API}/${taskID}`);
    const data = await response.json();

    return data;
}


// UPDATE (CRUD)

async function updateTask(updateTask, id) {
        const response = await fetch(`${TASKS_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTask)
    });
    const data = await response.json();
}


// DELETE (CRUD)

async function deleteTask(id) {
    await fetch(`${TASKS_API}/${id}`, {

    method: "DELETE"
    });
}

