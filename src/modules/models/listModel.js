import { saveData } from './storageModel';

const allLists = [
  {
    name: 'Tasks',
    tasks: []
  }
];

export function getAllLists() {
  return allLists;
}  

export function createList(listName) {
  if (listName === 'Tasks') {
    return allLists[0];
  }
  const taskList = [];
  const listObj = {
    name: listName,
    tasks: taskList,
  };
  allLists.push(listObj);
  saveData(allLists);

  const addTaskToList = (task) => {
    taskList.push(task);
  };

  return {
    taskList,
    addTaskToList
  };
}

export function deleteList(listName) {
  const index = allLists.findIndex(list => list.name === listName);
  if (index !== -1) {
    allLists.splice(index, 1);
    saveData(allLists);
  }
}

export function setAllLists(newLists) {
  allLists.length = 0;
  allLists.push(...newLists);
}  

export function renameList(oldListName, newListName) {
  const lists = getAllLists();
  const foundList = lists.find(lst => lst.name === oldListName);
  if (foundList) {
    foundList.name = newListName;

    foundList.tasks.forEach(task => {
      const updatedTask = { ...task, list: newListName };
      Object.assign(task, updatedTask);
    });
  }

  const listItems = Array.from(document.querySelectorAll('#list-manager-list .list-item'));
  const listItem = listItems.find(item => item.querySelector('span').textContent.includes(oldListName));
  if (listItem) {
    listItem.querySelector('span').textContent = newListName;
  }
}