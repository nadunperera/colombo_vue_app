import Vue from "vue";
import Router from "vue-router";
import ViewDashboard from "@/components/ViewDashboard";
import ViewUsers from "@/components/ViewUsers";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ViewDashboard",
      component: ViewDashboard
    },
    {
      path: "/users",
      name: "ViewUsers",
      component: ViewUsers
    },
  ]
});
