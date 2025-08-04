const CAT_API = "http://localhost:3000/categories";

// CREATE (CRUD)

async function createCategory(cat) {
    const response = await fetch(CAT_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cat)
    });

    const data = await response.json();
}

// READ ALL (CRUD)

async function readAllCats() {
    const response = await fetch(CAT_API);
    const data = await response.json();

    return data;
}


async function readCatByID(catID) {
    const response = await fetch(`${CAT_API}/${catID}`);
    const data = await response.json();

    return data;
}
// UPDATE (CRUD)

async function updateTask(updateCat, id) {
        const response = await fetch(`${CAT_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateCat)
    });
    const data = await response.json();
}

// DELETE (CRUD)
async function deleteTask(id) {
    await fetch(`${TASKS_API}/${id}`, {

    method: "DELETE"
    });
}

async function deleteTask(id) {
    await fetch(`${CAT_API}/${id}`, {

    method: "DELETE"
    });
}

