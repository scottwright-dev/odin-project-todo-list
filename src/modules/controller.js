/* eslint-disable import/no-cycle */
import { createToDoTask, updateTaskDetails } from './models/taskModel';
import { getAllLists, setAllLists } from './models/listModel';
import { renderTaskList, updateListTitle, addListToListManager } from './views/listView';
import { openDialog, openDetailsDialog, openListInputDialog } from './views/modalView';
import { loadData, saveData } from './models/storageModel';

export function addTaskToList() {
  const form = document.querySelector('.todo-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.querySelector('.task-title-input').value;
      const notes = document.querySelector('.task-notes-input').value;
      const dueDate = document.querySelector('.task-dueDate-input').value;
      const priority = document.querySelector('.task-priority-select').value;
      const listName = document.querySelector('.task-list-select').value;

      const addTask = createToDoTask(title, notes, dueDate, priority);

      const selectedList = getAllLists().find(list => list.name === listName);

      selectedList?.tasks.push(addTask);
      renderTaskList(selectedList?.tasks);
      saveData(getAllLists());

      form.reset();
    });
  }
}

export function deleteTask(index, taskList, renderFunc) {
  taskList.splice(index, 1);
  renderFunc(taskList);
  saveData(getAllLists()); 
}
 
export function handleAddTaskButtonClick() {
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
  openDetailsDialog(task);

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

export function handleNewListButtonClick() {
  const addListButton = document.querySelector('.new-list-btn');
  addListButton.addEventListener('click', () => {
    openListInputDialog()
  });
}

  export function initialise() {
    handleAddTaskButtonClick();
    handleNewListButtonClick();
  
    const storedData = loadData();
    if (storedData && storedData.length > 0) {
      setAllLists(storedData);
      storedData.forEach((list) => {
        renderTaskList(list.tasks);
        addListToListManager(list.name);
      });
    } else {
      addListToListManager('Tasks');
      updateListTitle('Tasks');
      renderTaskList([]);
    }
    document.querySelector('body').style.visibility = 'visible';
  }  