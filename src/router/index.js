import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Users from "@/components/Users";
import Events from "@/components/Events";
import Funnels from "@/components/Funnels";
import Invoices from "@/components/Invoices";
import Projects from "@/components/Projects";
import Sales from "@/components/Sales";
import Settings from "@/components/Settings";

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
    },
    {
      path: "/events",
      name: "Events",
      component: Events
    },
    {
      path: "/funnels",
      name: "Funnels",
      component: Funnels
    },
    {
      path: "/invoices",
      name: "Invoices",
      component: Invoices
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects
    },
    {
      path: "/sales",
      name: "Sales",
      component: Sales
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    }
  ]
});
