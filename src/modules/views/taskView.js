import { getAllLists } from '../models/listModel';

// RENDER TASK UI ELEMENTS //

export function createInputLabel(text, inputType, inputClass, isRequired = false, isTextArea = false) {
  const label = document.createElement('label');
  label.textContent = text;
  
  let input;
  if (isTextArea) {
    input = document.createElement('textarea');
    input.rows = 5; 
    input.cols = 8;
  } else {
    input = document.createElement('input');
    input.type = inputType;
  }
  
  input.classList.add(inputClass);
  if (isRequired) {
    input.setAttribute('required', '');
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
  label.textContent = 'List';
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

// RENDER TO-DO TASK FORM USING TASK UI ELEMENTS //

export function createToDoForm() {
  const form = document.createElement('form');
  form.classList.add('todo-form');

  const titleLabel = createInputLabel('Title', 'text', 'task-title-input', true);
  form.appendChild(titleLabel);

  const notesLabel = createInputLabel('Notes', 'text', 'task-notes-input', false, true);
  form.appendChild(notesLabel);

  const dueDateLabel = createInputLabel('Date', 'date', 'task-dueDate-input');
  form.appendChild(dueDateLabel);

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority';
  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('task-priority-select');
  priorityLabel.appendChild(prioritySelect);
  form.appendChild(priorityLabel);

  const noPriority = createPriorityOption('', 'None');
  prioritySelect.appendChild(noPriority);

  const lowPriority = createPriorityOption('!', '!');
  prioritySelect.appendChild(lowPriority);

  const medPriority = createPriorityOption('!!', '!!');
  prioritySelect.appendChild(medPriority);

  const highPriority = createPriorityOption('!!!', '!!!');
  prioritySelect.appendChild(highPriority);

  const listLabel = createListSelect();
  form.appendChild(listLabel);

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Add Task';
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

export function createCheckbox(task) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('list-item-checkbox');
  checkbox.checked = task.complete;

  checkbox.addEventListener('click', (event) => {
    event.stopPropagation();

    // eslint-disable-next-line no-param-reassign
    task.complete = checkbox.checked;
    const listItem = checkbox.parentNode;
    const textElements = listItem.querySelectorAll('.task-text, .task-text-title');

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