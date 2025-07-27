export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Done';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}