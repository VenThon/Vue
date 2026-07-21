import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { CreateTaskInput, Task, TaskStatus } from "../types/task";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: "Design dashboard page",
      description: "Create the initial UI for the task dashboard.",
      status: "completed",
      priority: "high",
      dueDate: "2026-07-20",
      createdAt: "2026-07-15",
    },
    {
      id: 2,
      title: "Connect task API",
      description: "Prepare the frontend service for task API integration.",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-07-25",
      createdAt: "2026-07-18",
    },
    {
      id: 3,
      title: "Write project documentation",
      description: "Add setup and usage instructions to the README file.",
      status: "todo",
      priority: "medium",
      dueDate: "2026-07-28",
      createdAt: "2026-07-19",
    },
  ]);

  const totalTasks = computed(() => tasks.value.length);

  const todoTasks = computed(
    () => tasks.value.filter((task) => task.status === "todo").length,
  );

  const inProgressTasks = computed(
    () => tasks.value.filter((task) => task.status === "in-progress").length,
  );

  const completedTasks = computed(
    () => tasks.value.filter((task) => task.status === "completed").length,
  );

  function getTaskById(id: number) {
    return tasks.value.find((task) => task.id === id);
  }

  function addTask(input: CreateTaskInput) {
    const newTask: Task = {
      id: Date.now(),
      ...input,
      createdAt: new Date().toISOString().split("T")[0],
    };

    tasks.value.unshift(newTask);

    return newTask;
  }

  function updateTaskStatus(id: number, status: TaskStatus) {
    const task = getTaskById(id);

    if (!task) {
      return;
    }

    task.status = status;
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  return {
    tasks,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    getTaskById,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
});
