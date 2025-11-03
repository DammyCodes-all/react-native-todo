import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTodo = mutation({
  args: { text: v.string(), completed: v.boolean() },
  handler: async (ctx, args) => {
    const { text, completed } = args;
    const todo = { text, completed };
    const iD = await ctx.db.insert("todos", todo);
    return { ...todo, _id: iD };
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string(), completed: v.boolean() },
  handler: async (ctx, args) => {
    const { id, text, completed } = args;
    const todo = { text, completed };
    await ctx.db.patch(id, todo);
    return { ...todo, _id: id };
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return { _id: id };
  },
});
export const getTodos = query(async ({ db }) => {
  return await db.query("todos").collect();
});
