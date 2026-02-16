import type { Task } from "@/types";

export const getTask = async (): Promise<Task[]> => {
  const response = await fetch("/api/tasks");

  if (!response.ok) {
    throw new Error("Error in fetching tasks");
  }

  return response.json();
};
