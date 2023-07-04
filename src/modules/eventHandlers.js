import { renderToDoTask } from "./domRendering";

const addTaskButton = document.querySelector(".add-task-btn");

addTaskButton.addEventListener("click", () => {
  renderToDoTask();
});