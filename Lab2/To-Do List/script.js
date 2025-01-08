/** @format */

// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new list item
  const li = document.createElement("li");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    todoList.removeChild(li);
  };

  // Append task and delete button to the list item
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  // Append the list item to the to-do list
  todoList.appendChild(li);

  // Clear the input field
  taskInput.value = "";
}

// Add event listener to the button
addTaskBtn.addEventListener("click", addTask);

// Add event listener for pressing "Enter" key in the input field
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
