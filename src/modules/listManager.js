export const allLists = [
  {
    name: 'default list',
    tasks: []
  }
];

export function createList(listName) {
  const taskList = [];
  const listObj = {
    name: listName,
    tasks: taskList,
  };
  allLists.push(listObj);

  const addTaskToList = (task) => {
    taskList.push(task);
  };
  
  return { 
    taskList, 
    addTaskToList
  };
}

export function getAllLists() {
  return allLists;
}