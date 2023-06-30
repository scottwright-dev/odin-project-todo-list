export default function createToDoItem(task, description, dueDate, priority) {
  if (!task) {
    throw new Error('Please add a task');
  }

  return { task, description, dueDate, priority }
}