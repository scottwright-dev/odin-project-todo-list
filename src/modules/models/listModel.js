import { saveData } from './storageModel';

const allLists = [
    {
      name: 'My List',
      tasks: []
    }
  ];

    export function getAllLists() {
    return allLists;
  }  
  
  export function createList(listName) {
    if (listName === 'My List') {
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