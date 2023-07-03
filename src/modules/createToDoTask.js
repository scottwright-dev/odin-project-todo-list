export default function createToDoTask(task, description, dueDate, priority, list) {
  if (!task) {
    throw new Error('Please add a task');
  }

  return { task, description, dueDate, priority, list }
}