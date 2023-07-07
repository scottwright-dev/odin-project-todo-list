export default function createToDoTask(task, description, dueDate, priority, list) {
  if (!task) {
    alert ('Task cannot be empty, please add task name');
  }

  return { 
    task, 
    description, 
    dueDate, 
    priority, 
    list,
    complete: false,
   }
}