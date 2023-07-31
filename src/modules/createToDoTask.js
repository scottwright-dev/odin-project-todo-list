import { format } from 'date-fns';

  function formatDate(date) {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }

export default function createToDoTask(task, description, dueDate, priority, list) {
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
}