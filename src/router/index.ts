import { createRouter, createWebHistory } from "vue-router";

import CreateTaskView from "../views/CreateTaskView.vue";
import DashboardView from "../views/DashboardView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import TaskDetailView from "../views/TaskDetailView.vue";
import TasksView from "../views/TasksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
    },
    {
      path: "/tasks/create",
      name: "create-task",
      component: CreateTaskView,
    },
    {
      path: "/tasks/:id",
      name: "task-detail",
      component: TaskDetailView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
