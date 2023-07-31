import { format } from 'date-fns';

const formatDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy'): null;

export const createToDoTask = (task, description, dueDate, priority, list) => {
  if (!task) {
    alert('Task cannot be empty, please add task name');
  }

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