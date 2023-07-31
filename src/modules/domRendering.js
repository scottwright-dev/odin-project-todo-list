import { createToDoTask } from './createToDoTask';
import { createList, getAllLists, allLists } from './listManager';
import { deleteTask, addTaskToList } from './eventHandlers';

// CREATE TO-DO FORM ELEMENTS //

function createInputLabel(text, inputType, inputClass, isRequired = false) {
  const label = document.createElement('label');
  label.textContent = text;
  const input = document.createElement('input');
  input.type = inputType;
  input.classList.add(inputClass);
  if (isRequired) {
    input.setAttribute('required', '')
  }
  label.appendChild(input);
  return label;
}

function createPriorityOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function createListSelect() {
  const label = document.createElement('label');
  label.textContent = 'List:';
  const select = document.createElement('select');
  select.classList.add('task-list-select');
  label.appendChild(select);

  const allLists = getAllLists();
  allLists.forEach(list => {
    const option = document.createElement('option');
    option.value = list.name;
    option.textContent = list.name;
    select.appendChild(option);
  });

  return label;
}

// CREATE TO-DO TASK FORM USING ELEMENTS ABOVE//

function createToDoForm() {
  const form = document.createElement('form');
  form.classList.add('todo-form');

  const titleLabel = createInputLabel('Title:', 'text', 'task-title-input', true);
  form.appendChild(titleLabel);

  const descriptionLabel = createInputLabel('Description:', 'text', 'task-description-input');
  form.appendChild(descriptionLabel);

  const dueDateLabel = createInputLabel('Date:', 'date', 'task-dueDate-input');
  form.appendChild(dueDateLabel);

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('task-priority-select');
  priorityLabel.appendChild(prioritySelect);
  form.appendChild(priorityLabel);

  const lowPriority = createPriorityOption('low', 'Low - !');
  prioritySelect.appendChild(lowPriority);

  const medPriority = createPriorityOption('medium', 'Medium - !!');
  prioritySelect.appendChild(medPriority);

  const highPriority = createPriorityOption('high', 'High - !!!');
  prioritySelect.appendChild(highPriority);

  const listLabel = createListSelect();
  form.appendChild(listLabel);

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'add task';
  submitBtn.classList.add('task-submit-btn');
  form.appendChild(submitBtn);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const dialog = document.querySelector('.todo-dialog');
    if (dialog) {
      dialog.close();
    }
  });

  return form;
}

// DIALOG MODAL //

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

    const addTask = createToDoTask(title, description, dueDate, priority);

    const selectedList = getAllLists().find(list => list.name === listName);

    selectedList?.tasks.push(addTask);
    renderTaskList(selectedList?.tasks);

    dialog.close();
  });

  dialog.appendChild(toDoForm);
  document.body.appendChild(dialog);

  dialog.showModal();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
  });
}

// TO-DO TASK FORM RENDERING // 

export function renderToDoTask() {
  const renderContent = document.querySelector('.render-content');
  renderContent.innerHTML = "";

  const formContainer = document.createElement('div');
  formContainer.classList.add('todo-form-container');

  const toDoForm = createToDoForm();
  formContainer.appendChild(toDoForm);

  renderContent.appendChild(formContainer);
}

function createCheckbox(task) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('list-item-checkbox');
  checkbox.checked = task.complete;

  checkbox.addEventListener('click', () => {
    task.complete = checkbox.checked;
    const listItem = checkbox.parentNode;
    const textElements = listItem.querySelectorAll('.task-text');
  
    textElements.forEach(textElem => {
      if (checkbox.checked) {
        textElem.classList.add('completed-task-text');
      } else {
        textElem.classList.remove('completed-task-text');
      }
    });
  });  

  return checkbox;
}

// EXPAND TO-DO TASK //

function openDetailsDialog(task) {
  openDialog();

  const dialog = document.querySelector('.todo-dialog');

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
  submitBtn.value = 'update task';
  submitBtn.removeEventListener('click', addTaskToList);
  submitBtn.addEventListener('click', () => updateTaskDetails(task));

  dialog.appendChild(formContainer);
}

function expandToDoDetails(task) {
  openDetailsDialog(task); 
}

// UPDATE TASK //

export function updateTaskDetails(task) {
  const formContainer = document.querySelector('.todo-form-container');

  const titleInput = formContainer.querySelector('.task-title-input');
  const descriptionInput = formContainer.querySelector('.task-description-input');
  const dueDateInput = formContainer.querySelector('.task-dueDate-input');
  const prioritySelect = formContainer.querySelector('.task-priority-select');
  const listSelect = formContainer.querySelector('.task-list-select');

  task.task = titleInput.value;
  task.description = descriptionInput.value;
  task.dueDate = dueDateInput.value;
  task.priority = prioritySelect.value;
  task.list = listSelect.value;

  const allTasks = [];
  
  allLists.forEach(list => {
    list.tasks.forEach(task => {
      allTasks.push(task);
    });
  });

  renderTaskList(allTasks);
}

// DEFAULT LIST RENDERING //

function updateListTitle(listName) {
  const listTitle = document.querySelector('.list-title-text');
  listTitle.textContent = listName;
}

function createListItem(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item');

  const checkbox = createCheckbox(task);
  
  const title = document.createElement('span');
  title.textContent = task.task;
  title.classList.add('task-text');

  const description = document.createElement('p');
  description.textContent = task.description;
  description.classList.add('task-text');

  const dueDate = document.createElement('p');
  dueDate.textContent = task.dueDate;
  dueDate.classList.add('task-text');

  const priority = document.createElement('p');
  priority.textContent = task.priority;
  priority.classList.add('task-text');

  listItem.appendChild(checkbox);
  listItem.appendChild(title);
  listItem.appendChild(description);
  listItem.appendChild(dueDate);
  listItem.appendChild(priority);

  listItem.addEventListener('click', () => {
    expandToDoDetails(task);
  });

  return listItem;
}

function createDeleteBtn(taskItem, onDelete) {
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('list-item-del-btn');
  deleteBtn.setAttribute('aria-label', 'Delete task');

  deleteBtn.addEventListener('click', onDelete);

  taskItem.appendChild(deleteBtn);
}

export function renderTaskList(taskList) {
  const defaultList = document.querySelector('#default-list');
  defaultList.innerHTML = '';

  taskList.forEach((task, index) => {
    const taskItem = createListItem(task);

    createDeleteBtn(taskItem, () => deleteTask(index, taskList, renderTaskList));

    if (task.complete) {
      taskItem.style.textDecoration = 'line-through';
    }

    defaultList.appendChild(taskItem);
  });
}

// LIST MANAGER RENDERING // 

export function addListToListManager(listName) {
  const listManagerList = document.querySelector('#list-manager-list');
  const listItem = document.createElement('li');
  listItem.textContent = listName;
  listItem.classList.add('list-item');

  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('list-delete-btn');

  deleteBtn.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(deleteBtn);

  if (listName === 'default list') {
    listManagerList.insertBefore(listItem, listManagerList.firstChild);
  } else {
    listManagerList.appendChild(listItem);
  }

  createList(listName);

  listItem.addEventListener('click', () => {
    const selectedList = allLists.find(list => list.name === listName);
    renderTaskList(selectedList.tasks);
    updateListTitle(listName);
  });
}

export function renderListInput() {
  const listInputContainer = document.querySelector('#list-manager-list');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter list name';
  input.classList.add('list-name-input');

  const addListBtn = document.createElement('button');
  addListBtn.textContent = 'Add List';
  addListBtn.classList.add('add-list-btn');

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  inputContainer.appendChild(input);
  inputContainer.appendChild(addListBtn);

  listInputContainer.innerHTML = '';
  listInputContainer.appendChild(inputContainer);

  addListBtn.addEventListener('click', () => {
    const listName = input.value.trim();
    if (listName) {
      addListToListManager(listName);
      input.value = '';
    }
  });
}