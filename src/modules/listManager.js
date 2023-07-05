export function createList() {
    const taskList = [];
  
    const addTaskToList = (task) => {
      taskList.push(task);
    };
    return { 
      taskList, 
      addTaskToList
    };
  }