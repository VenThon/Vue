<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    class="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
  >
    <h2 class="text-lg font-semibold text-slate-900">
      {{ title }}
    </h2>

    <p class="mt-2 text-sm text-slate-500">
      {{ description }}
    </p>
  </div>
</template>