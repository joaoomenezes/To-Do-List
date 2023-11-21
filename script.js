document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");

    addButton.addEventListener("click", function() {
        addTask();
    });

    function deleteTask(taskId) {
        fetch(`api.php?id=${taskId}`, {
            method: "DELETE"
        })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            loadTasks();
        });
    }

    function loadTasks() {
        fetch("api.php")
            .then((response) => response.json())
            .then((tasks) => {
                listContainer.innerHTML = "";
                tasks.forEach((task) => {
                    const listItem = document.createElement('li');
                    listItem.dataset.taskid = task.id;
                    listItem.textContent = task.task_name;

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.classList.add("delete-button")
                    deleteButton.onclick = function () {
                        deleteTask(task.id);
                    };

                    listItem.appendChild(deleteButton);
                    listContainer.appendChild(listItem);
                });
            });
    }

    function addTask() {
        const inputBox = document.getElementById('input-box');
        const taskName = inputBox.value;

        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `taskName=${taskName}`
        })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            loadTasks();
        });

        inputBox.value = '';
    }

    loadTasks();
});


