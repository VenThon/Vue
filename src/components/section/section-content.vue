<script setup lang="ts">
import { ref } from "vue";

const awesome = ref(true);
</script>

<template>
  <section
    id="content-one"
    class="flex h-96 scroll-mt-20 items-center justify-center bg-amber-50"
  >
    <div class="flex flex-col items-center gap-4 py-6">
    <button
      class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      @click="awesome = !awesome"
    >
      Toggle
    </button>

    <h1 v-if="awesome" class="text-md text-red-300 ">
      Vue is awesome!
    </h1>

    <h1 v-else class="text-2xl font-bold">
      Oh no 😢
    </h1>
  </div>
  </section>

  <section
    id="content-two"
    class="flex h-96 scroll-mt-20 items-center justify-center bg-gray-100"
  >
    <p class="text-xl font-semibold text-black">
      Content Two
    </p>
  </section>

  <section
    id="content-three"
    class="flex h-96 scroll-mt-20 items-center justify-center bg-orange-100"
  >
    <p class="text-xl font-semibold text-red-300">
      Content Three
    </p>
  </section>
</template>