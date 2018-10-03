import Vue from "vue";
import Router from "vue-router";
import DashboardPage from "@/components/DashboardPage";
import UsersPage from "@/components/UsersPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "DashboardPage",
      component: DashboardPage
    },
    {
      path: "/users",
      name: "UsersPage",
      component: UsersPage
    },
  ]
});
