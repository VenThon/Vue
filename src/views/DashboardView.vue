<script setup lang="ts">
import { storeToRefs } from "pinia";

import StatCard from "../components/StatCard.vue";
import TaskCard from "../components/TaskCard.vue";
import { useTaskStore } from "../stores/task";
import type { TaskStatus } from "../types/task";
import { CheckCircle2, CircleDashed, Clock3, ListTodo } from "lucide-vue-next";
// import { CheckCircle2, CircleDashed, Clock3, ListTodo } from "@lucide/vue";

const taskStore = useTaskStore();

const {
  tasks,
} = storeToRefs(taskStore);

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
        <h1 class="text-3xl font-bold ">
          Task Dashboard
        </h1>

        <p class="mt-2 text-slate-600">
          Track your team's tasks and current progress.
        </p>
      </div>

      <RouterLink
        to="/tasks/create"
        class="inline-flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-900 "
      >
        Create Task
      </RouterLink>
    </div>

    <div class="grid mt-2.5  gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard
      title="Total Tasks"
      :value="12"
      description="All registered tasks"
      :icon="ListTodo"
    />

    <StatCard
      title="To Do"
      :value="5"
      description="Tasks not started"
      :icon="CircleDashed"
    />

    <StatCard
      title="In Progress"
      :value="4"
      description="Tasks being worked on"
      :icon="Clock3"
    />

    <StatCard
      title="Completed"
      :value="3"
      description="Finished tasks"
      :icon="CheckCircle2"
    />
  </div>

    <div class="mt-10">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900">
          Recent Tasks
        </h2>

        <RouterLink
          to="/tasks"
          class="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all
        </RouterLink>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <TaskCard
          v-for="task in tasks.slice(0, 4)"
          :key="task.id"
          :task="task"
          @delete="handleDelete"
          @change-status="handleStatusChange"
        />
      </div>
    </div>
  </section>
</template>