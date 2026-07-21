<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import type { TaskStatus } from "../types/task";
import { useTaskStore } from "../stores/task";

import EmptyState from "../components/EmptyState.vue";
import TaskCard from "../components/TaskCard.vue";

type StatusFilter = "all" | TaskStatus;

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const search = ref("");
const statusFilter = ref<StatusFilter>("all");

const filteredTasks = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase();

  return tasks.value.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(normalizedSearch) ||
      task.description.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter.value === "all" ||
      task.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

function handleStatusChange(id: number, status: TaskStatus) {
  taskStore.updateTaskStatus(id, status);
}

function handleDelete(id: number) {
  taskStore.deleteTask(id);
}
</script>

<template>
  <section>
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-900">
          Tasks
        </h1>

        <p class="mt-2 text-slate-600">
          Search, filter, and manage all tasks.
        </p>
      </div>

      <RouterLink
        to="/tasks/create"
        class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Add Task
      </RouterLink>
    </div>

    <div
      class="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_220px]"
    >
      <input
        v-model="search"
        type="search"
        placeholder="Search tasks..."
        class="rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <select
        v-model="statusFilter"
        class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
      >
        <option value="all">All statuses</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <p class="mt-5 text-sm text-slate-500">
      Showing {{ filteredTasks.length }} task(s)
    </p>

    <div
      v-if="filteredTasks.length > 0"
      class="mt-4 grid gap-4 lg:grid-cols-2"
    >
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete="handleDelete"
        @change-status="handleStatusChange"
      />
    </div>

    <div v-else class="mt-4">
      <EmptyState
        title="No tasks found"
        description="Try changing the search text or status filter."
      />
    </div>
  </section>
</template>