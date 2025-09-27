"use server";

import supabase from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";

export async function fetchTodo() {
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("status", { ascending: true })
    .order("deadline", {ascending: true})
    .order("priority", {ascending: false });
  return data;
}

export async function finsishTodo(id: string) {
  const { error } = await supabase
    .from("todos")
    .update({ status: true })
    .eq("id", id);

  revalidatePath("/dashboard");
  return error;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/dashboard");
  return error;
}

export async function finsishedTodoCount() {
  const { count, error } = await supabase
    .from("todos")
    .select("*", { count: "exact", head: true })
    .eq("status", true);

  return count;
}
