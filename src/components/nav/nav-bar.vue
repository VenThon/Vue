<script setup lang="ts">
import { ref } from 'vue';



// const navItems = ref ( ["One", "Two", "Three", "Four"])
const navItems = ref ( [
  { label: "One", target: "#content-one" },
  { label: "Two", target: "#content-two" },
  { label: "Three", target: "#content-three" },
])
</script>

<template>
  <header class="w-full bg-blue-700 px-6 py-4 text-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class=" flex size-10 items-center justify-center rounded-full bg-white  text-blue-700  "
        >
          <span class="text-sm font-bold">Logo</span>
        </div>

        <h1 class="text-xl font-semibold">
          NavBar
        </h1>
      </div>

      <ul class="flex items-center gap-6">
        <li v-for="item in navItems" :key="item.target">
          <a
            :href="item.target"
            class="font-medium underline-offset-4 transition hover:underline hover:text-blue-200"
          >
            {{ item.label}}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>