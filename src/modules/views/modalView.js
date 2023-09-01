/* eslint-disable import/no-cycle */
import { createToDoForm, createCancelBtn } from './taskView';
import { createToDoTask, updateTaskDetails } from '../models/taskModel';
import { renderTaskList } from './listView';
import { getAllLists } from '../models/listModel';
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

  const toDoForm = createToDoForm();

  toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = toDoForm.querySelector('.task-title-input').value;
    const description = toDoForm.querySelector('.task-description-input').value;
    const dueDate = toDoForm.querySelector('.task-dueDate-input').value;
    const priority = toDoForm.querySelector('.task-priority-select').value;
    const listName = toDoForm.querySelector('.task-list-select').value;

    const addTask = createToDoTask(title, description, dueDate, priority, listName);

    const selectedList = getAllLists().find(list => list.name === listName);

    selectedList?.tasks.push(addTask);
    renderTaskList(selectedList?.tasks);

    dialog.close();
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

  const cancelBtn = createCancelBtn(() => {
    dialog.close();
  })

  dialog.appendChild(cancelBtn);
}
// UPDATE TASK MODAL //

export function openDetailsDialog(task) {

  const dialog = document.createElement('dialog');
  dialog.classList.add('todo-dialog');

  const formContainer = document.createElement('div');
  formContainer.classList.add('todo-form-container');

  const toDoForm = createToDoForm();
  formContainer.appendChild(toDoForm);

  const titleInput = formContainer.querySelector('.task-title-input');
  const descriptionInput = formContainer.querySelector('.task-description-input');
  const dueDateInput = formContainer.querySelector('.task-dueDate-input');
  const prioritySelect = formContainer.querySelector('.task-priority-select');
  const listSelect = formContainer.querySelector('.task-list-select');

  titleInput.value = task.task;
  descriptionInput.value = task.description;
  dueDateInput.value = task.dueDate;
  prioritySelect.value = task.priority; 
  listSelect.value = task.list;

  const submitBtn = formContainer.querySelector('.task-submit-btn');
  submitBtn.value = 'Save Task';
  submitBtn.removeEventListener('click', addTaskToList);
  submitBtn.addEventListener('click', () => updateTaskDetails(task));

  const cancelBtn = createCancelBtn(() => {
    dialog.close();
  })

  formContainer.appendChild(cancelBtn);

  dialog.appendChild(formContainer);
  
  document.body.appendChild(dialog);
  
  dialog.showModal();

  addBlur();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    removeBlur();
  });
}