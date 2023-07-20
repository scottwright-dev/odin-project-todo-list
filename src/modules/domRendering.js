import { createList, getAllLists } from './listManager';

// CREATE TO-DO FORM ELEMENTS //

function createInputLabel(text, inputType, inputClass) {
  const label = document.createElement('label');
  label.textContent = text;
  const input = document.createElement('input');
  input.type = inputType;
  input.classList.add(inputClass);
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

function createToDoForm() {
  const form = document.createElement('form');
  form.classList.add('todo-form');

  const titleLabel = createInputLabel('Title:', 'text', 'task-title-input');
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

  return form;
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
    if (checkbox.checked) {
      listItem.style.textDecoration = 'line-through';
    } else {
      listItem.style.textDecoration = 'none';
    }
  });

  return checkbox;
}

// DEFAULT LIST RENDERING //

function createListItem(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item');

  const checkbox = createCheckbox(task);
  
  const title = document.createElement('span');
  title.textContent = task.task;

  const description = document.createElement('p');
  description.textContent = task.description;

  const dueDate = document.createElement('p');
  dueDate.textContent = task.dueDate;

  const priority = document.createElement('p');
  priority.textContent = task.priority;

  listItem.appendChild(checkbox);
  listItem.appendChild(title);
  listItem.appendChild(description);
  listItem.appendChild(dueDate);
  listItem.appendChild(priority);

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

function addListToListManager(listName) {
  const listManagerList = document.querySelector('#list-manager-list');
  const listItem = document.createElement('li');
  listItem.textContent = listName;

  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('list-delete-btn');

  deleteBtn.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(deleteBtn);

  listManagerList.appendChild(listItem);

  createList(listName); 
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
    }
  });
}