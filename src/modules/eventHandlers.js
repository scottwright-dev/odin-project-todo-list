import { renderTaskList, renderListInput, addListToListManager, openDialog, updateTaskDetails, updateListTitle } from './domRendering';
import { createToDoTask } from './createToDoTask';
import { getAllLists } from './listManager';

export function addTaskToList() {
  console.log('addTaskToList function is called');
  debugger;
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

export function deleteTask(index, taskList, renderFunc) {
  console.log('deleteTask function is called');
  taskList.splice(index, 1);
  renderFunc(taskList);
}
 
export function handleAddTaskButtonClick() {
  console.log('handleAddTaskButtonClick function is called');
  const addTaskButton = document.querySelector(".add-task-btn");

  addTaskButton.addEventListener("click", () => {
    openDialog();

    const form = document.querySelector('.todo-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addTaskToList();
      const dialog = document.querySelector('.todo-dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });
}

export function handleEditButtonClick(task) {
  console.log('handleEditButtonClick function is called');
  openDialog();

  const form = document.querySelector('.todo-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTaskDetails(task);
    const dialog = document.querySelector('.todo-dialog');
    if (dialog) {
      dialog.close();
    }
  });
}

  export function handleAddListButtonClick() {
    console.log('handleAddListButtonClick function is called');
    debugger;
    const addListButton = document.querySelector('.create-new-list-btn');
  
    addListButton.addEventListener('click', () => {
      renderListInput();
    });
  }

  export function initialise() {
    handleAddTaskButtonClick();
    handleAddListButtonClick();
    renderListInput();
    addListToListManager('default list');
    updateListTitle('default list');

     // Add a dummy task to the list
  const defaultTask = createToDoTask('Task Title', 'Task Description', '1/08/2023', 'medium');
  const defaultList = getAllLists().find(list => list.name === 'default list');
  defaultList?.tasks.push(defaultTask);
  renderTaskList(defaultList?.tasks);
  }