import { create } from "zustand";
import type { BoardState, Task, TaskStatus } from "@/types";

interface TaskActions {
  addTask: (task: Task) => void;
  moveTask: (
    taskId: string,
    source: TaskStatus,
    destination: TaskStatus
  ) => void;
  deleteTask: (taskId: string, status: TaskStatus) => void;
}

export const useTaskStore = create<BoardState & TaskActions>((set) => ({
  tasks: {},
  columns: { TODO: [], IN_PROGRESS: [], DONE: [] },
  addTask: (task) =>
    set((state) => ({
      tasks: { ...state.tasks, [task.id]: task },
      columns: {
        ...state.columns,
        [task.status]: [...state.columns[task.status], task.id],
      },
    })),
  moveTask: (taskId, source, destination) =>
    set((state) => {
      const newSourceColumn = state.columns[source].filter(
        (id) => id !== taskId
      );
      const newDestColumn = [...state.columns[destination], taskId];
      const updatedTask = { ...state.tasks[taskId], status: destination };

      return {
        tasks: { ...state.tasks, [taskId]: updatedTask },
        columns: {
          ...state.columns,
          [source]: newSourceColumn,
          [destination]: newDestColumn,
        },
      };
    }),
  deleteTask: (taskId, status) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [taskId]: _, ...remainingTasks } = state.tasks;
      const updatedColumn = state.columns[status].filter((id) => id !== taskId);

      return {
        tasks: remainingTasks,
        columns: {
          ...state.columns,
          [status]: updatedColumn,
        },
      };
    }),
}));
