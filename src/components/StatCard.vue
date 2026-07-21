<script setup lang="ts">
import type { Component } from "vue";

import { Card } from "@/components/ui/card";

defineProps<{
  title: string;
  value: number;
  description: string;
  icon: Component;
}>();
</script>

<template>
  <Card
    class="group relative overflow-hidden border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-sm font-medium text-slate-500">
          {{ title }}
        </p>

        <p class="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {{ value }}
        </p>

        <p class="mt-1 text-sm text-slate-500">
          {{ description }}
        </p>
      </div>

      <div
        class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white"
      >
        <component :is="icon" class="size-5" />
      </div>
    </div>
  </Card>
</template>