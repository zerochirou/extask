import z from 'zod';

export type Task = {
  id: string;
  task: string;
  status: boolean;
  priority: boolean;
  description: string;
  deadline: string;
  created_at: string;
};

export const createTaskSchema = z.object({
  task: z.string(),
  priority: z.boolean(),
  description: z.string(),
  deadline: z.date(),
});
