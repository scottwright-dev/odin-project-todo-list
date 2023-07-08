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

  export function deleteTask(index, taskList, renderTaskList) {
    taskList.splice(index, 1);
    renderTaskList(taskList);
  }
