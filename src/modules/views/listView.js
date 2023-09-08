/* eslint-disable import/no-cycle */
import { openDetailsDialog, openListInputDialog } from './modalView';
import { deleteTask, handleEditButtonClick } from '../controller';
import { createCheckbox, createInputLabel } from './taskView';
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
  
  
    const dueDate = document.createElement('p');
    dueDate.textContent = formatDate(task.dueDate); 
    dueDate.classList.add('task-text');
    textContainer.appendChild(dueDate);
  
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

  export function createEditBtn(taskItem, task, onEdit) {
    const editBtn = document.createElement('div');
    editBtn.classList.add('list-item-edit-btn');
    editBtn.setAttribute('aria-label', 'Edit task');
  
    editBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      onEdit(task);
    });
  
    taskItem.appendChild(editBtn);
  }   
  
  export function renderTaskList(taskList) {
    const defaultList = document.querySelector('#default-list');
    defaultList.innerHTML = '';
  
    if (!taskList) {
      const listIsEmpty = document.createElement('p');
      listIsEmpty.textContent = 'Task list is empty';
      listIsEmpty.classList.add('empty-list-text');
  
      defaultList.appendChild(listIsEmpty);
    } else if (taskList.length === 0) {
      const listIsEmpty = document.createElement('p');
      listIsEmpty.textContent = 'Task list is empty';
      listIsEmpty.classList.add('empty-list-text');
  
      defaultList.appendChild(listIsEmpty);
    } else {
      taskList.forEach((task, index) => {
        const taskItem = createListItem(task);

        createEditBtn(taskItem, task, (taskToEdit) => handleEditButtonClick(taskToEdit));
  
        createDeleteBtn(taskItem, () => deleteTask(index, taskList, renderTaskList));
  
        if (task.complete) {
          taskItem.classList.add('completed-task-text');
        }
  
        defaultList.appendChild(taskItem);
      });
    }
  }    
  
  // LIST MANAGER RENDERING // 
  
  export function addListToListManager(listName) {
    const listManagerList = document.querySelector('#list-manager-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const listContent = document.createElement('span');
    listContent.textContent = listName;
    listItem.appendChild(listContent);
  
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('list-delete-btn');
  
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
      deleteList(listName); 
    });

    const editBtn = document.createElement('div');
    editBtn.classList.add('list-edit-btn');
  
    editBtn.addEventListener('click', () => {
      const currentName = listItem.querySelector('span').textContent;
      openListInputDialog(currentName);
    });    
    
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
  
    if (listName === 'Tasks') {
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
  
  export function renderListInput(onListAdded, currentListName = '') {
    const listNameLabel = createInputLabel('List Name', 'text', 'list-name-input', true);
    
    const input = listNameLabel.lastChild;
    input.value = currentListName;
    
    const addListBtn = document.createElement('button');
    addListBtn.textContent = currentListName ? 'Save List' : 'Add List';
    addListBtn.classList.add('add-list-btn');
    
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('new-list-modal');
    inputContainer.appendChild(listNameLabel);
    inputContainer.appendChild(addListBtn);
  
    addListBtn.addEventListener('click', () => {
      const listName = input.value.trim();
      if (listName) {
        onListAdded(listName, currentListName);
        input.value = '';
      }
    });
  
    return inputContainer;
  }  