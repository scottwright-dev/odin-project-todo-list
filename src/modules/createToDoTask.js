export const createToDoTask = (task, description, dueDate, priority, list) => ({
    task,
    description,
    dueDate,
    priority,
    list,
    complete: false,
  });