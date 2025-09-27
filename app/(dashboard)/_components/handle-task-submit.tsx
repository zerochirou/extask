"use server";

import supabase from "@/lib/supabase/client";
import { createTodo } from "@/types/todo";
import { revalidatePath } from "next/cache";
import z from "zod";

type CreateTodo = z.infer<typeof createTodo>;
export async function handleTaskSubmit(datas: CreateTodo) {
  await supabase
    .from("todos")
    .insert({
      task: datas.task,
      priority: datas.priority,
      description: datas.description,
      deadline: datas.deadline,
    })
    .select();
  revalidatePath("/dashboard");
}
