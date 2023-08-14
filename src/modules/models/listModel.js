const allLists = [
    {
      name: 'default list',
      tasks: []
    }
  ];
  
  export function createList(listName) {
    if (listName === 'default list') {
      return allLists[0];
    }
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
  
  export function deleteList(listName) {
    const index = allLists.findIndex(list => list.name === listName);
    if (index !== -1) {
      allLists.splice(index, 1);
    }
  }
  
  export function getAllLists() {
    return allLists;
  }  