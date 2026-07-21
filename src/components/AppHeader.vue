<script setup lang="ts">
const navigationItems = [
  {
    label: "Dashboard",
    to: "/",
  },
  {
    label: "Tasks",
    to: "/tasks",
  },
  {
    label: "Create Task",
    to: "/tasks/create",
  },
];
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-gray-200 ">
    <div
      class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
    >
      <RouterLink to="/" class="text-xl font-bold  ">
        TaskFlow
      </RouterLink>

      <nav class="flex items-center gap-2">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          active-class="bg-slate-900 text-white hover:bg-slate-900 hover:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>