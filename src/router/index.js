import Vue from "vue";
import Router from "vue-router";
import DashboardPage from "@/components/DashboardPage";
import UsersPage from "@/components/UsersPage";
import UsersNew from "@/components/UsersNew";

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
    {
      path: "/users/new" ,
      name: "UsersNew",
      component: UsersNew
    },
  ]
});
