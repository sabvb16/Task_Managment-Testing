const addTaskForm = document.getElementById("taskForm");
const deleteTaskBtn = document.getElementById("deleteTask");
const updateBtn = document.getElementById("updateTask");

function getAllTasks() {
  fetch("http://localhost:1000/getTasks")
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.getElementById("taskTableBody");
      tableBody.innerHTML = "";

      data.forEach((task) => {
        const row = `<tr>
                                    <td>${task.taskid}</td>
                                    <td>${task.taskname}</td>
                                    <td>${task.taskdescription}</td>
                                    <td>${task.taskcategory}</td>
                                 <td class="d-flex gap-2">
    <button class="btn btn-warning btn-md flex-grow-1" onclick="editTask(${task.taskid}, '${task.taskname}', '${task.taskdescription}', '${task.taskcategory}')">
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPJJREFUSEvFk7EOAUEQhr97AgqRaKm9gMYL0VHRiFCg9EYSb6CSaFUSegk3yRXr7O7s3d7ltt3d75v9Zzah5pXUzCdWsAbewMpVaIxgD8wy8Bw42CRlBR3gAnQN6BLY5CVlBG3gCQyAE9DLoAtgGyuYpJlLpSPgBvSBcxZPdESSt+Qu6w6MgSvQAl6xTZYm7nIQkQyBh2/UQ3pgVm6yjil8qv0jTRAFF7lP4IJLMyWyoOUSVAJ3vaAyuEvwsby9UCzmfVtEeUFpeMgLouDaFAVNiXZI+wfafXW/EYFtitRKjQM/RYdMURH4X18biahoxd7zXwouJhn8uXp/AAAAAElFTkSuQmCC"/>
    </button>
    <button class="btn btn-danger btn-md flex-grow-1" onclick="deleteModal(event, ${task.taskid})">
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKRJREFUSEvtlUEKgCAQRV93CYK6TsdpGXSZrlPQaYpAXVjDt8xd7mR03v8z6FQUXlXh/ChAD4xAYwjZgAGYLaEKsACtcLkC3VvA7i5aQlRclkglUPELwF/I7X1wHFsvDvDKpfXIonn+dfO+BsQK1T7wUx2ohNkl+gGXd/W0JH8P5NeUXSJFeAxIGTQx9HbwWC/5HJUTUCvpLm6OTjUyE/Pbx4oDDlBhOBmYaWrOAAAAAElFTkSuQmCC"/>
    </button>
</td>

                                </tr>`;
        tableBody.innerHTML += row;
      });

      const taskModal = new bootstrap.Modal(
        document.getElementById("taskModal")
      );
      taskModal.show();
    });
}

function addTasks(event) {
  event.preventDefault();
  const taskname = document.getElementById("taskname").value;
  const taskdescription = document.getElementById("taskdescription").value;
  const taskcategory = document.getElementById("taskcategory").value;

  fetch("http://localhost:1000/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskname, taskdescription, taskcategory }),
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
    });
}

function editTask(taskid, taskname, taskdescription, taskcategory) {
  document.getElementById("taskid").value = taskid;
  document.getElementById("Utaskname").value = taskname;
  document.getElementById("Utaskdescription").value = taskdescription;
  document.getElementById("Utaskcategory").value = taskcategory;

  const updateModal = new bootstrap.Modal(
    document.getElementById("updateTaskModal")
  );
  updateModal.show();
}

function updateTask() {
  event.preventDefault();
  const taskid = document.getElementById("taskid").value;
  const taskname = document.getElementById("Utaskname").value;
  const taskdescription = document.getElementById("Utaskdescription").value;
  const taskcategory = document.getElementById("Utaskcategory").value;

  fetch("http://localhost:1000/updateTask/" + taskid, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskname, taskdescription, taskcategory }),
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      getAllTasks();
      document
        .getElementById("updateTaskModal")
        .querySelector(".btn-close")
        .click();
    });
}

updateBtn.addEventListener("click", () => {
  event.preventDefault();
  updateTask();
});

function deleteModal(event, taskid) {
  event.preventDefault();
  document.getElementById("taskid").value = taskid;
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteTaskModal")
  );
  deleteModal.show();
}

function deleteTask(taskid) {
  fetch("http://localhost:1000/deleteTask/" + taskid, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      getAllTasks();
    });
}

deleteTaskBtn.addEventListener("click", () => {
  event.preventDefault();
  deleteTask(document.getElementById("taskid").value);
  document
    .getElementById("deleteTaskModal")
    .querySelector(".btn-close")
    .click();
});
 