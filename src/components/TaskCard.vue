<script setup lang="ts">
import {ArrowUpRight} from "lucide-vue-next";
import { computed } from "vue";
import type { Task, TaskPriority,TaskStatus } from "../types/task";
import Button from "./ui/button/Button.vue";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  delete: [id: number];
  changeStatus: [id: number, status: TaskStatus];
}>();

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

const formattedDueDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(props.task.dueDate));
});

function handleStatusChange(event: Event) {
  const target = event.target as HTMLSelectElement;

  emit(
    "changeStatus",
    props.task.id,
    target.value as TaskStatus,
  );
}
</script>

<template>
  <article
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
       <RouterLink
  :to="`/tasks/${task.id}`"
  class="group inline-flex max-w-full items-center gap-2 text-base font-semibold text-slate-900 transition-colors hover:text-primary dark:text-slate-100"
>
  <span class="truncate underline-offset-4 group-hover:underline">
    {{ task.title }}
  </span>

  <ArrowUpRight
    class="size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
    aria-hidden="true"
  />
</RouterLink>

        <p class="mt-2 line-clamp-2 text-sm text-slate-600">
          {{ task.description }}
        </p>
      </div>

      <span
        class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
        :class="priorityClass[task.priority]"
      >
        {{ task.priority }}
      </span>
    </div>

    <div class="mt-5 flex flex-wrap items-center gap-2">
      <span
        class="rounded-full px-2.5 py-1 text-xs font-semibold"
        :class="statusClass[task.status]"
      >
        {{ statusLabel[task.status] }}
      </span>

      <span class="text-sm text-slate-500">
        Due {{ formattedDueDate }}
      </span>
    </div>

    <div class="mt-4 grid grid-cols-2  gap-2.5  items-center  border-slate-100 pt-4">
      <Select
        :model-value="task.status"
        @change="handleStatusChange"
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="todo">
            To Do
          </SelectItem>

          <SelectItem value="in-progress">
            In Progress
          </SelectItem>

          <SelectItem value="completed">
            Completed
          </SelectItem>
        </SelectContent>
      </Select>
      <Button  type="button"
      class="w-full"
        variant="destructive"
        @click="emit('delete', task.id)">
         Delete
      </Button>

    </div>
  </article>
</template>