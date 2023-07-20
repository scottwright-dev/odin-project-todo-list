import { renderToDoTask, renderTaskList, renderListInput } from './domRendering';
import createToDoTask from './createToDoTask';
import { getAllLists } from './listManager';

export function addTaskToList() {
  const form = document.querySelector('.todo-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.querySelector('.task-title-input').value;
      const description = document.querySelector('.task-description-input').value;
      const dueDate = document.querySelector('.task-dueDate-input').value;
      const priority = document.querySelector('.task-priority-select').value;
      const listName = document.querySelector('.task-list-select').value;

      const addTask = createToDoTask(title, description, dueDate, priority);

      const selectedList = getAllLists().find(list => list.name === listName);

      selectedList?.tasks.push(addTask);
      renderTaskList(selectedList?.tasks);

      form.reset();
    });
  }
}

export function handleAddTaskButtonClick() {
    const addTaskButton = document.querySelector(".add-task-btn");
  
    addTaskButton.addEventListener("click", () => {
      renderToDoTask();
      addTaskToList();
    });
  }

  export function handleAddListButtonClick() {
    const addListButton = document.querySelector('.create-new-list-btn');
  
    addListButton.addEventListener('click', () => {
      renderListInput();
    });
  }

  export function initialise() {
    handleAddTaskButtonClick();
    handleAddListButtonClick();
    renderListInput();
  }