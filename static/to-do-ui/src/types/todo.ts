export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

type TodoPriority = (typeof Priority)[keyof typeof Priority];

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
}

export type { Todo, TodoPriority };
