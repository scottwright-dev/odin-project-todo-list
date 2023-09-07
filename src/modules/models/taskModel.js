/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { renderTaskList } from '../views/listView';
import { getAllLists } from './listModel';
import { saveData } from './storageModel';

// TO DO TASK OBJECT //

export const createToDoTask = (task, notes, dueDate, priority, list) => ({
    task,
    notes,
    dueDate,
    priority,
    list,
    complete: false,
});

// UPDATE TASK //

export function updateTaskDetails(task) {
    const formContainer = document.querySelector('.todo-form-container');
  
    const titleInput = formContainer.querySelector('.task-title-input');
    const notesInput = formContainer.querySelector('.task-notes-input');
    const dueDateInput = formContainer.querySelector('.task-dueDate-input');
    const prioritySelect = formContainer.querySelector('.task-priority-select');
    const listSelect = formContainer.querySelector('.task-list-select');
  
    const oldListName = task.list;
  
    task.task = titleInput.value;
    task.notes = notesInput.value;
    task.dueDate = dueDateInput.value;
    task.priority = prioritySelect.value;
    task.list = listSelect.value;
  
    const oldList = getAllLists().find(list => list.name === oldListName);
    const newList = getAllLists().find(list => list.name === task.list);
  
    if (oldListName !== task.list && oldList) {
        oldList.tasks = oldList.tasks.filter(t => t !== task);
    }
  
    if (!oldList.tasks.includes(task) && newList) {
        newList.tasks.push(task);
    }
  
    renderTaskList(newList.tasks);
  
    if (oldListName !== task.list) {
        renderTaskList(oldList.tasks);
    }
    saveData(getAllLists()); 
}