import createToDoTask from './createToDoTask';

export function renderToDoTask() {

    const renderContent = document.querySelector('.render-content');
    renderContent.innerHTML = "";

    const formContainer = document.createElement('div');
    formContainer.classList.add('todo-form-container');
    
    const form = document.createElement('form');
    form.classList.add('todo-form');
    formContainer.appendChild(form);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleLabel.classList.add('task-title-input');
    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.classList.add('task-description-input');
    descriptionLabel.appendChild(descriptionInput);
    form.appendChild(descriptionLabel);    

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.classList.add('task-dueDate-input');
    dueDateLabel.appendChild(dueDateInput);
    form.appendChild(dueDateLabel);

    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';
    const prioritySelect = document.createElement('select');
    prioritySelect.classList.add('task-priority-select');
    priorityLabel.appendChild(prioritySelect);
    form.appendChild(priorityLabel);

    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low - !';
    prioritySelect.appendChild(lowPriority);

    const medPriority = document.createElement('option');
    medPriority.value = 'medium';
    medPriority.textContent = 'Medium - !!';
    prioritySelect.appendChild(medPriority);

    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High - !!!';
    prioritySelect.appendChild(highPriority);

    // need to figure out adding to a list

    renderContent.appendChild(formContainer);
}