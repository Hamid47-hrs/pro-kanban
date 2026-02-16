import { http, HttpResponse } from "msw";
import type { Task } from "@/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "implement the code",
    status: "TODO",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Study the article.",
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Clean the house.",
    status: "DONE",
    createdAt: new Date().toISOString(),
  },
];

export const handlers = [
  http.get("/api/tasks", () => {
    return HttpResponse.json(mockTasks);
  }),
];
