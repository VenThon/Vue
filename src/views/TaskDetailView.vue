<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";
import type { TaskStatus,  TaskPriority } from "../types/task";


const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const taskId = computed(() => Number(route.params.id));

const task = computed(() => {
  return taskStore.getTaskById(taskId.value);
});

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusClass: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const priorityClass: Record<TaskPriority, string> = {
  low: "bg-blue-50 text-blue-700",
  medium: "bg-orange-50 text-orange-700",
  high: "bg-red-50 text-red-700",
};

function deleteTask() {
  if (!task.value) {
    return;
  }

  taskStore.deleteTask(task.value.id);
  router.push("/tasks");
}
</script>

<template>
  <section class="mx-auto max-w-3xl">
    <RouterLink
      to="/tasks"
      class="text-sm font-semibold text-blue-600 hover:text-blue-700"
    >
      ← Back to tasks
    </RouterLink>

    <div
      v-if="task"
      class="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 class="text-3xl font-bold text-slate-900">
            {{ task.title }}
          </h1>

          <p class="mt-2 text-sm text-slate-500">
            Created on {{ task.createdAt }}
          </p>
        </div>

        <div class="flex gap-2">
          <span
            class="rounded-full px-3 py-1 text-xs font-semibold"
            :class="statusClass[task.status]"
          >
            {{ statusLabel[task.status] }}
          </span>

          <span
            class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
            :class="priorityClass[task.priority]"
          >
            {{ task.priority }}
          </span>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Description
        </h2>

        <p class="mt-3 whitespace-pre-line leading-7 text-slate-700">
          {{ task.description }}
        </p>
      </div>

      <dl class="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
        <div>
          <dt class="text-sm font-medium text-slate-500">
            Status
          </dt>

          <dd class="mt-1 font-semibold text-slate-900">
            {{ statusLabel[task.status] }}
          </dd>
        </div>

        <div>
          <dt class="text-sm font-medium text-slate-500">
            Due date
          </dt>

          <dd class="mt-1 font-semibold text-slate-900">
            {{ task.dueDate }}
          </dd>
        </div>
      </dl>

      <div class="mt-8 flex justify-end border-t border-slate-100 pt-5">
        <button
          type="button"
          class="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          @click="deleteTask"
        >
          Delete Task
        </button>
      </div>
    </div>

    <div
      v-else
      class="mt-5 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
    >
      <h1 class="text-xl font-bold text-slate-900">
        Task not found
      </h1>

      <p class="mt-2 text-slate-500">
        The requested task does not exist or was deleted.
      </p>

      <RouterLink
        to="/tasks"
        class="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
      >
        View Tasks
      </RouterLink>
    </div>
  </section>
</template>