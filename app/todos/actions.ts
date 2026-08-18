"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db";
import { todo } from "@/db/schema";
import { requireSession } from "@/lib/session";

const idSchema = z.string().min(1).max(100);
const titleSchema = z.string().trim().min(1).max(255);

export async function createTodo(formData: FormData) {
  const session = await requireSession();
  const parsed = titleSchema.safeParse(formData.get("title"));
  if (!parsed.success) return;

  const now = new Date();
  await getDb().insert(todo).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    title: parsed.data,
    completed: false,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
  const session = await requireSession();
  const id = idSchema.safeParse(formData.get("id"));
  const completed = z.enum(["true", "false"]).safeParse(formData.get("completed"));
  if (!id.success || !completed.success) return;

  await getDb().update(todo)
    .set({ completed: completed.data !== "true", updatedAt: new Date() })
    .where(and(eq(todo.id, id.data), eq(todo.userId, session.user.id)));
  revalidatePath("/todos");
}

export async function updateTodo(formData: FormData) {
  const session = await requireSession();
  const id = idSchema.safeParse(formData.get("id"));
  const title = titleSchema.safeParse(formData.get("title"));
  if (!id.success || !title.success) return;

  await getDb().update(todo)
    .set({ title: title.data, updatedAt: new Date() })
    .where(and(eq(todo.id, id.data), eq(todo.userId, session.user.id)));
  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
  const session = await requireSession();
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) return;

  await getDb().delete(todo)
    .where(and(eq(todo.id, id.data), eq(todo.userId, session.user.id)));
  revalidatePath("/todos");
}

