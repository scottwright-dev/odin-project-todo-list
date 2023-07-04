import createToDoTask from './createToDoTask';

export function renderToDoTask() {
  const renderContent = document.querySelector('.render-content');
  renderContent.innerHTML = "";

  const formContainer = document.createElement('div');
  formContainer.classList.add('todo-form-container');

  const form = document.createElement('form');
  form.classList.add('todo-form');
  formContainer.appendChild(form);

  function createInputLabel(text, inputType, inputClass) {
    const label = document.createElement('label');
    label.textContent = text;
    const input = document.createElement('input');
    input.type = inputType;
    input.classList.add(inputClass);
    label.appendChild(input);
    return label;
  }

  const titleLabel = createInputLabel('Title:', 'text', 'task-title-input');
  form.appendChild(titleLabel);

  const descriptionLabel = createInputLabel('Description:', 'text', 'task-description-input');
  form.appendChild(descriptionLabel);

  const dueDateLabel = createInputLabel('Date:', 'date', 'task-dueDate-input');
  form.appendChild(dueDateLabel);

  function createPriorityOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
  }

  const priorityLabel = createInputLabel('Priority:', 'select', 'task-priority-select');
  const prioritySelect = priorityLabel.querySelector('select');
  form.appendChild(priorityLabel);

  const lowPriority = createPriorityOption('low', 'Low - !');
  prioritySelect.appendChild(lowPriority);

  const medPriority = createPriorityOption('medium', 'Medium - !!');
  prioritySelect.appendChild(medPriority);

  const highPriority = createPriorityOption('high', 'High - !!!');
  prioritySelect.appendChild(highPriority);

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'add task';
  submitBtn.classList.add('task-submit-btn');
  form.appendChild(submitBtn);

  renderContent.appendChild(formContainer);
}