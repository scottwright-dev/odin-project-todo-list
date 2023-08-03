import { format } from 'date-fns';

export const formatDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : null;