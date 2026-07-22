<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';

</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppHeader />
    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <RouterView />
    </main>
  </div>
</template>