/* eslint-disable import/no-cycle */
import { createToDoForm } from './taskView';
import { createToDoTask, updateTaskDetails } from '../models/taskModel';
import { renderTaskList, renderListInput, addListToListManager, updateListTitle } from './listView';
import { getAllLists, renameList } from '../models/listModel';
import { addTaskToList } from '../controller';

// MODAL BG BLUR //

function addBlur() {
  const mainContent = document.querySelector('.main-content');
  mainContent.classList.add('blurred-background');
}

function removeBlur() {
  const mainContent = document.querySelector('.main-content');
  mainContent.classList.remove('blurred-background');
}

// OPEN TASK MODAL //

export function openDialog() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('todo-dialog');

  const closeIcon = document.createElement('div');
  closeIcon.classList.add('close-icon');
  closeIcon.addEventListener('click', () => {
    dialog.close();
  });

  dialog.appendChild(closeIcon);

  const toDoForm = createToDoForm();

    const currentListTitle = document.querySelector('.list-title-text').textContent;
    const listSelectInput = toDoForm.querySelector('.task-list-select');
    if (listSelectInput) {
      listSelectInput.value = currentListTitle;
    }

  toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = toDoForm.querySelector('.task-title-input').value;
    const notes = toDoForm.querySelector('.task-notes-input').value;
    const dueDate = toDoForm.querySelector('.task-dueDate-input').value;
    const priority = toDoForm.querySelector('.task-priority-select').value;
    const listName = toDoForm.querySelector('.task-list-select').value;

    const addTask = createToDoTask(title, notes, dueDate, priority, listName);

    const selectedList = getAllLists().find(list => list.name === listName);

    selectedList?.tasks.push(addTask);
    renderTaskList(selectedList?.tasks);

  });

  dialog.appendChild(toDoForm);
  document.body.appendChild(dialog);

  dialog.showModal();
  dialog.classList.add('show');

  addBlur();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    removeBlur();
  });

}
// UPDATE TASK MODAL //

export function openDetailsDialog(task) {

  const dialog = document.createElement('dialog');
  dialog.classList.add('todo-dialog');

  const formContainer = document.createElement('div');
  formContainer.classList.add('todo-form-container');

  const closeIcon = document.createElement('div');
  closeIcon.classList.add('close-icon');
  closeIcon.addEventListener('click', () => {
    dialog.close();
  });

  dialog.appendChild(closeIcon);

  const toDoForm = createToDoForm();
  formContainer.appendChild(toDoForm);

  const titleInput = formContainer.querySelector('.task-title-input');
  const notesInput = formContainer.querySelector('.task-notes-input');
  const dueDateInput = formContainer.querySelector('.task-dueDate-input');
  const prioritySelect = formContainer.querySelector('.task-priority-select');
  const listSelect = formContainer.querySelector('.task-list-select');

  titleInput.value = task.task;
  notesInput.value = task.notes;
  dueDateInput.value = task.dueDate;
  prioritySelect.value = task.priority; 
  listSelect.value = task.list;

  const submitBtn = formContainer.querySelector('.task-submit-btn');
  submitBtn.value = 'Save Task';
  submitBtn.removeEventListener('click', addTaskToList);
  submitBtn.addEventListener('click', () => updateTaskDetails(task));

  dialog.appendChild(formContainer);
  
  document.body.appendChild(dialog);
  
  dialog.showModal();

  addBlur();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    removeBlur();
  });
}

// CREATE NEW LIST MODAL //

export function openListInputDialog(currentListName = '') {
  const dialog = document.createElement('dialog');
  dialog.classList.add('todo-dialog');

  const closeIcon = document.createElement('div');
  closeIcon.classList.add('close-icon');
  closeIcon.addEventListener('click', () => {
    dialog.close();
  });

  dialog.appendChild(closeIcon);

  const listInputContainer = renderListInput((newListName, oldListName) => {
    if (oldListName) {
      renameList(oldListName, newListName);
      updateListTitle(newListName);
    } else {
      addListToListManager(newListName);
    }
    dialog.close();
  }, currentListName);

  dialog.appendChild(listInputContainer);
  document.body.appendChild(dialog);

  dialog.showModal();
  dialog.classList.add('show');

  addBlur();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    removeBlur();
  });
}