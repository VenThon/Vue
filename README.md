# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


# Vue Learning Notes

This project is created with **Vue 3**, **Vite**, **TypeScript**, and **Tailwind CSS**.

## Install Project Dependencies

Run:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Set Up Tailwind CSS with Vite and Vue

Install Tailwind CSS and the Tailwind Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts`:

```ts
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
```

Add Tailwind CSS to your main CSS file, such as `src/style.css`:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}
```

Make sure the CSS file is imported in `src/main.ts`:

```ts
import { createApp } from "vue"

import App from "./App.vue"
import "./style.css"

createApp(App).mount("#app")
```

Official Tailwind CSS documentation:

[Install Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)

## Check the Vue Version

Run:

```bash
npm list vue
```

Example output:

```text
learnvue@0.0.0
└── vue@3.5.40
```

This means the project is using Vue version `3.5.40`.

You can also check `package.json`:

```json
{
  "dependencies": {
    "vue": "^3.5.39"
  }
}
```

The `^` symbol allows npm to install a compatible newer Vue 3 version, but it will not automatically install Vue 4.

## Vue Component Structure

A Vue Single-File Component normally contains three sections:

```vue
<script setup lang="ts">
const title = "Hello Vue"
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold">
      {{ title }}
    </h1>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
}
</style>
```

- `<script setup>` contains JavaScript or TypeScript logic.
- `<template>` contains the HTML structure.
- `<style scoped>` contains CSS that only affects the current component.

When using Tailwind CSS, most styles can be written directly inside the `class` attribute.

## Common Vue Directives

Vue directives are special attributes that start with `v-`.

### `v-html`

Use `v-html` to render a string as real HTML.

```vue
<script setup lang="ts">
const content = "<strong>Hello Vue</strong>"
</script>

<template>
  <div v-html="content"></div>
</template>
```

Be careful when using `v-html` with user input because it may create security risks.

### `v-bind`

Use `v-bind` to bind an HTML attribute or component prop to a JavaScript value.

```vue
<script setup lang="ts">
const imageUrl = "/profile.jpg"
const isDisabled = true
</script>

<template>
  <img v-bind:src="imageUrl" alt="Profile" />

  <button v-bind:disabled="isDisabled">
    Submit
  </button>
</template>
```

The shorthand for `v-bind` is `:`:

```vue
<img :src="imageUrl" alt="Profile" />

<button :disabled="isDisabled">
  Submit
</button>
```

You can also use it for dynamic classes:

```vue
<p :class="isActive ? 'text-green-600' : 'text-gray-500'">
  Status
</p>
```

### `v-for`

Use `v-for` to repeat an element for each item in an array.

```vue
<script setup lang="ts">
const navItems = [
  { id: 1, label: "One" },
  { id: 2, label: "Two" },
  { id: 3, label: "Three" },
]
</script>

<template>
  <ul>
    <li
      v-for="item in navItems"
      :key="item.id"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
```

Always provide a unique `:key` when using `v-for`.

### `v-on`

Use `v-on` to listen for events such as `click`, `input`, `submit`, or `mouseover`.

```vue
<script setup lang="ts">
import { ref } from "vue"

const count = ref(0)
</script>

<template>
  <button v-on:click="count++">
    Count: {{ count }}
  </button>
</template>
```

The shorthand for `v-on` is `@`:

```vue
<button @click="count++">
  Count: {{ count }}
</button>
```

For form submission:

```vue
<form @submit.prevent="handleSubmit">
  <button type="submit">
    Submit
  </button>
</form>
```

The `.prevent` modifier prevents the browser from refreshing the page.

### `v-slot`

Use `v-slot` to pass custom content from a parent component into a child component.

Child component:

```vue
<!-- BaseCard.vue -->

<template>
  <div class="rounded-lg border p-4">
    <header class="mb-3 border-b pb-3">
      <slot name="header" />
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>
```

Parent component:

```vue
<script setup lang="ts">
import BaseCard from "./components/BaseCard.vue"
</script>

<template>
  <BaseCard>
    <template v-slot:header>
      <h2 class="text-xl font-bold">
        User Profile
      </h2>
    </template>

    <p>This is the main card content.</p>
  </BaseCard>
</template>
```

The shorthand for `v-slot` is `#`:

```vue
<template #header>
  <h2>User Profile</h2>
</template>
```

### `v-if`

Use `v-if` to conditionally render or remove an element.

```vue
<script setup lang="ts">
import { ref } from "vue"

const isLoggedIn = ref(true)
</script>

<template>
  <p v-if="isLoggedIn">
    Welcome back!
  </p>

  <p v-else>
    Please log in.
  </p>
</template>
```

You can also use `v-else-if`:

```vue
<p v-if="status === 'approved'">
  Approved
</p>

<p v-else-if="status === 'pending'">
  Pending
</p>

<p v-else>
  Rejected
</p>
```

## Directive Summary

| Directive | Purpose | Shorthand |
|---|---|---|
| `v-html` | Renders an HTML string | None |
| `v-bind` | Binds attributes or props | `:` |
| `v-for` | Repeats elements | None |
| `v-on` | Listens for events | `@` |
| `v-slot` | Passes custom content into slots | `#` |
| `v-if` | Conditionally renders elements | None |

## Navbar and Content Example

### `src/components/nav/nav-bar.vue`

```vue
<script setup lang="ts">
const navItems = [
  {
    label: "One",
    target: "#content-one",
  },
  {
    label: "Two",
    target: "#content-two",
  },
  {
    label: "Three",
    target: "#content-three",
  },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-blue-700 px-6 py-4 text-white">
    <nav class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-white font-bold text-blue-700"
        >
          L
        </div>

        <h1 class="text-xl font-semibold">
          NavBar
        </h1>
      </div>

      <ul class="flex items-center gap-4">
        <li
          v-for="item in navItems"
          :key="item.target"
        >
          <a
            :href="item.target"
            class="rounded-md px-3 py-2 font-medium transition hover:bg-blue-600"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
```

### `src/components/section/section-content.vue`

```vue
<script setup lang="ts">
const sections = [
  {
    id: "content-one",
    title: "Content One",
    sectionClass: "bg-amber-200",
    textClass: "text-red-500",
  },
  {
    id: "content-two",
    title: "Content Two",
    sectionClass: "bg-gray-500",
    textClass: "text-white",
  },
  {
    id: "content-three",
    title: "Content Three",
    sectionClass: "bg-orange-300",
    textClass: "text-black",
  },
]
</script>

<template>
  <section
    v-for="section in sections"
    :id="section.id"
    :key="section.id"
    class="flex min-h-screen scroll-mt-20 items-center justify-center"
    :class="section.sectionClass"
  >
    <p
      class="text-2xl font-bold"
      :class="section.textClass"
    >
      {{ section.title }}
    </p>
  </section>
</template>
```

### `src/App.vue`

```vue
<script setup lang="ts">
import NavBar from "./components/nav/nav-bar.vue"
import SectionContent from "./components/section/section-content.vue"
</script>

<template>
  <main class="min-h-screen w-full">
    <NavBar />
    <SectionContent />
  </main>
</template>
```

When the user clicks a navbar item, the page scrolls to the matching section.

For example:

```vue
<a href="#content-one">
  One
</a>
```

connects to:

```vue
<section id="content-one">
  Content One
</section>
```

```vue
Vue 3
├── Vite — project setup and build tool
├── Vue Router — page navigation
├── Pinia — global state management
├── Tailwind CSS — styling
└── Axios or TanStack Query — API requests

```