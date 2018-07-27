import DashboardJune from "views/Dashboard/DashboardJune";
import DashboardMay from "views/Dashboard/DashboardMay";
import DashboardApr from "views/Dashboard/DashboardApr";
import DashboardMar from "views/Dashboard/DashboardMar";
import DashboardFeb from "views/Dashboard/DashboardFeb";
import DashboardJan from "views/Dashboard/DashboardJan";


const dashboardRoutes = [
    {
        path: "/june",
        name: "June 2018",
        icon: "pe-7s-graph",
        component: DashboardJune
    },
    {
        path: "/may",
        name: "May 2018",
        icon: "pe-7s-graph",
        component: DashboardMay
    },
    {
        path: "/april",
        name: "April 2018",
        icon: "pe-7s-graph",
        component: DashboardApr
    },
    {
        path: "/mar",
        name: "March 2018",
        icon: "pe-7s-graph",
        component: DashboardMar
    },
    {
        path: "/feb",
        name: "February 2018",
        icon: "pe-7s-graph",
        component: DashboardFeb
    },
    {
        path: "/jan",
        name: "January 2018",
        icon: "pe-7s-graph",
        component: DashboardJan
    },
  // { redirect: true, path: "/", to: "/", name: "June 2018" }
];

export default dashboardRoutes;
