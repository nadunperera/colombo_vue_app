import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Users from "@/components/Users";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    }
  ]
});
