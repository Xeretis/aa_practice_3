const container = document.getElementById("container");

let data = [];

updateAndRender();

const urlap = document.getElementById("urlap");

const query = new URLSearchParams();

const szovegmezo = document.getElementById("szovegmozo");
const pipa = document.getElementById("pipa");

szovegmezo.addEventListener("input", (e) => {
    query.set("title", e.currentTarget.value);
});

pipa.addEventListener("input", (e) => {
    if (e.currentTarget.checked == false) {
        query.delete("isCompleted");
    } else {
        query.set("isCompleted", e.currentTarget.checked);
    }
});

urlap.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://aa-api.bluemin.de/todos?" + query.toString(), {
        headers: {
            "X-API-Key": "api-key-12345",
        },
    }).then((res) =>
        res.json().then((resData) => {
            data = resData;
            renderData();
        })
    );
});

function updateAndRender() {
    // Api kulcs: api-key-12345
    fetch("https://aa-api.bluemin.de/todos", {
        headers: {
            "X-API-Key": "api-key-12345",
        },
    }).then((res) =>
        res.json().then((resData) => {
            data = resData;
            renderData();
        })
    );
}

function renderData() {
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data[i].isCompleted;
        card.appendChild(checkbox);

        checkbox.addEventListener("change", (e) => {
            fetch(`https://aa-api.bluemin.de/todos/${data[i].id}`, {
                method: "PATCH",
                headers: {
                    "X-API-Key": "api-key-12345",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isCompleted: checkbox.checked,
                }),
            }).then(() => {
                updateAndRender();
            });
        });

        const content = document.createElement("div");

        const text = document.createElement("span");
        text.innerText = data[i].title;
        content.appendChild(text);

        const button = document.createElement("button");
        button.innerText = "Edit";
        button.style.marginLeft = "5px";
        content.appendChild(button);

        button.addEventListener("click", () => {
            content.replaceChildren();

            const input = document.createElement("input");
            input.value = data[i].title;
            input.type = "text";
            input.classList.add("input");
            content.appendChild(input);

            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Confirm";
            content.appendChild(confirmButton);

            confirmButton.addEventListener("click", () => {
                fetch(`https://aa-api.bluemin.de/todos/${data[i].id}`, {
                    method: "PATCH",
                    headers: {
                        "X-API-Key": "api-key-12345",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: input.value,
                    }),
                }).then(() => {
                    updateAndRender();
                });
            });
        });

        card.appendChild(content);

        const date = document.createElement("input");
        date.type = "date";
        date.valueAsDate = new Date(data[i].dueDate);
        date.classList.add("input");
        date.addEventListener("change", () => {
            // `https://aa-api.bluemin.de/todos/${data[i].id}` = "https://aa-api.bluemin.de/todos/" + data[i].id
            fetch(`https://aa-api.bluemin.de/todos/${data[i].id}`, {
                method: "PATCH",
                headers: {
                    "X-API-Key": "api-key-12345",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dueDate: date.valueAsDate,
                }),
            }).then(() => {
                updateAndRender();
            });
        });
        card.appendChild(date);

        container.appendChild(card);
    }
}

const form = document.getElementById("create");

const createTitle = document.getElementById("create-title");
const createDescription = document.getElementById("create-description");
const createIsCompleted = document.getElementById("create-isCompleted");
const createDueDate = document.getElementById("create-dueDate");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://aa-api.bluemin.de/todos/", {
        method: "POST",
        headers: {
            "X-API-Key": "api-key-12345",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: createTitle.value,
            description: createDescription.value,
            isCompleted: createIsCompleted.checked,
            dueDate: createDueDate.valueAsDate,
        }),
    }).then(() => {
        updateAndRender();
    });
});
