/* eslint-disable import/no-cycle */
import { openDetailsDialog } from './modalView';
import { deleteTask } from '../controller';
import { createCheckbox } from './taskView';
import { deleteList, createList, getAllLists } from '../models/listModel';
import { formatDate } from '../dateUtility';

// DEFAULT LIST RENDERING //

export function updateListTitle(listName) {
    const listTitle = document.querySelector('.list-title-text');
    listTitle.textContent = listName;
  }
  
  function createListItem(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const checkbox = createCheckbox(task);
    listItem.appendChild(checkbox);
  
    const textContainer = document.createElement('div');
    textContainer.classList.add('list-item-text-container');
    listItem.appendChild(textContainer);
  
    const title = document.createElement('span');
    title.textContent = task.task;
    title.classList.add('task-text-title');
    textContainer.appendChild(title);
  
    const description = document.createElement('p');
    description.textContent = task.description;
    description.classList.add('task-text');
    textContainer.appendChild(description);
  
    const dueDate = document.createElement('p');
    dueDate.textContent = formatDate(task.dueDate); 
    dueDate.classList.add('task-text');
    textContainer.appendChild(dueDate);
  
    const priority = document.createElement('p');
    priority.textContent = task.priority;
    priority.classList.add('task-text');
    textContainer.appendChild(priority);
  
    listItem.addEventListener('click', () => {
      openDetailsDialog(task);
    });
  
    return listItem;
  }  
  
  export function createDeleteBtn(taskItem, onDelete) {
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('list-item-del-btn');
    deleteBtn.setAttribute('aria-label', 'Delete task');
  
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      onDelete();
    });
  
    taskItem.appendChild(deleteBtn);
  }
  
  export function renderTaskList(taskList) {
    const defaultList = document.querySelector('#default-list');
    defaultList.innerHTML = '';
  
    if (taskList.length === 0) {
      const listIsEmpty = document.createElement('p');
      listIsEmpty.textContent = 'Task list is empty';
      defaultList.appendChild(listIsEmpty);
    } else {
      taskList.forEach((task, index) => {
        const taskItem = createListItem(task);
  
        createDeleteBtn(taskItem, () => deleteTask(index, taskList, renderTaskList));
  
        if (task.complete) {
          taskItem.style.textDecoration = 'line-through';
        }
  
        defaultList.appendChild(taskItem);
      });
    }
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
      deleteList(listName); 
    });
  
    listItem.appendChild(deleteBtn);
  
    if (listName === 'My List') {
      listManagerList.insertBefore(listItem, listManagerList.firstChild);
    } else {
      listManagerList.appendChild(listItem);
    }
  
    const existingList = getAllLists().find(list => list.name === listName);
  
    if (!existingList) {
      createList(listName);
    }
  
    listItem.addEventListener('click', () => {
      const selectedList = getAllLists().find(list => list.name === listName);
      if (selectedList) {
          renderTaskList(selectedList.tasks);
          updateListTitle(listName);
      }
    });
  }  
  
  export function renderListInput() { 
    const listInputContainer = document.querySelector('#list-input-container');
  
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter list name';
    input.classList.add('list-name-input');
  
    const addListBtn = document.createElement('button');
    addListBtn.textContent = 'New List';
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

        inputContainer.remove();
      }
    });
  }