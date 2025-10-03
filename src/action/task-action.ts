'use server';

import { supabaseServer } from '@/supabase/server';
import { createTaskSchema } from '@/types/task';
import { revalidatePath } from 'next/cache';
import z from 'zod';

export async function fetchTask() {
  return await supabaseServer
    .from('todos_duplicate')
    .select('*')
    .order('status', { ascending: true })
    .order('deadline', { ascending: true })
    .order('priority', { ascending: false });
}

export async function createTask(data: z.infer<typeof createTaskSchema>) {
  await supabaseServer.from('todos_duplicate').insert([
    {
      task: data.task,
      priority: data.priority,
      description: data.description,
      deadline: data.deadline,
    },
  ]);
  revalidatePath('/dashboard');
}

export async function finishedTask(id: string) {
  const { error } = await supabaseServer
    .from('todos_duplicate')
    .update({ status: true })
    .eq('id', id);

  revalidatePath('/dashboard');
  return error;
}

export async function deleteTask(id: string) {
  const { error } = await supabaseServer
    .from('todos_duplicate')
    .delete()
    .eq('id', id);

  revalidatePath('/dashboard');
  return error;
}

export async function finsishedTaskCount() {
  const { count, error } = await supabaseServer
    .from('todos_duplicate')
    .select('*', { count: 'exact', head: true })
    .eq('status', true);

  return count;
}
