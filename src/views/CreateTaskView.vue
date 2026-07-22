<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import type {
  CreateTaskInput,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { useTaskStore } from "../stores/task";

const router = useRouter();
const taskStore = useTaskStore();

const errorMessage = ref("");

const form = reactive<CreateTaskInput>({
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
});

function submitForm() {
  errorMessage.value = "";

  if (!form.title.trim()) {
    errorMessage.value = "Task title is required.";
    return;
  }

  if (!form.description.trim()) {
    errorMessage.value = "Task description is required.";
    return;
  }

  if (!form.dueDate) {
    errorMessage.value = "Due date is required.";
    return;
  }

  const newTask = taskStore.addTask({
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status as TaskStatus,
    priority: form.priority as TaskPriority,
    dueDate: form.dueDate,
  });

  router.push(`/tasks/${newTask.id}`);
}
</script>

<template>
  <section class="mx-auto max-w-2xl">
    <div>
      <RouterLink
        to="/tasks"
        class="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to tasks
      </RouterLink>

      <h1 class="mt-4 text-3xl font-bold text-slate-900">
        Create Task
      </h1>

      <p class="mt-2 text-slate-600">
        Enter the information for your new task.
      </p>
    </div>

    <form
      class="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      @submit.prevent="submitForm"
    >
      <div
        v-if="errorMessage"
        class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>

      <div>
        <label
          for="title"
          class="mb-2 block text-sm font-semibold text-slate-700"
        >
          Title
        </label>

        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Enter task title"
          class="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          for="description"
          class="mb-2 block text-sm font-semibold text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          v-model="form.description"
          rows="5"
          placeholder="Describe the task"
          class="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            for="status"
            class="mb-2 block text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            v-model="form.status"
            class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            for="priority"
            class="mb-2 block text-sm font-semibold text-slate-700"
          >
            Priority
          </label>

          <select
            id="priority"
            v-model="form.priority"
            class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label
          for="dueDate"
          class="mb-2 block text-sm font-semibold text-slate-700"
        >
          Due date
        </label>

        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
          class="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
        />
      </div>

      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <RouterLink
          to="/tasks"
          class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </RouterLink>

        <button
          type="submit"
          class="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Create Task
        </button>
      </div>
    </form>
  </section>
</template>