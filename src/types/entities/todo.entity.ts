export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type TodoPriority = (typeof Priority)[keyof typeof Priority];

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt: string;
}
