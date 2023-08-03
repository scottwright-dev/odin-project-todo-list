import { formatDate } from './dateUtility';

export const createToDoTask = (task, description, dueDate, priority, list) => {

  const formattedDueDate = formatDate(dueDate);

  return {
    task,
    description,
    dueDate: formattedDueDate,
    priority,
    list,
    complete: false,
  };
};