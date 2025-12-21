import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Login from "../pages/Auth/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import ErrorPage from "../ErrorPages/ErrorPage";
import Profile from "../pages/Profile/Profile";
import Pricing from "../pages/Pricing/Pricing";
import TopContributorsOfTheWeek from "../pages/TopContributorsOfTheWeek/TopContributorsOfTheWeek";
import MostSavedLessons from "../pages/MostSavedLessons/MostSavedLessons";
import WhyLearningFromLifeMattersSection from "../pages/WhyLearningFromLifeMattersSection/WhyLearningFromLifeMattersSection";
import FeaturedLifeLessonsSection from "../pages/FeaturedLifeLessonsSection/FeaturedLifeLessonsSection";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddLessons from "../pages/Lessons/AddLessons";
import MyLessons from "../pages/Lessons/MyLessons";
import Payment from "../pages/Lessons/Payment";
import PaymentSuccess from "../pages/Lessons/PaymentSuccess";
import PaymentCancelled from "../pages/Lessons/PaymentCancelled";
import HomeLessons from "../pages/Lessons/HomeLessons";
import Lessons from "../pages/Lessons/Lessons";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/public-lessons",
        Component: Lessons,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "topContributorsOfTheWeek",
        Component: TopContributorsOfTheWeek,
      },
      {
        path: "mostSavedLessons",
        Component: MostSavedLessons,
      },
      {
        path: "whyLearningFromLifeMattersSection",
        Component: WhyLearningFromLifeMattersSection,
      },
      {
        path: "featuredLifeLessonsSection",
        Component: FeaturedLifeLessonsSection,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: HomeLessons,
        // loader: () => fetch("/digitalLife.json").then((res) => res.json()),
      },
      {
        path: "add-lessons",
        Component: AddLessons,
        loader: () => fetch("/digitalLife.json").then((res) => res.json()),
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "users/:email",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default router;
