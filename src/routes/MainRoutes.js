import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import JoinTeam from "../views/pages/JoinTeam";
import LeaderBoard from "views/pages/Leaderboard/LeaderBoard";

// dashboard routing
const DashboardDefault = Loadable(
	lazy(() => import("views/dashboard/Default"))
);

// sample page routing
const DashboardPage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			path: "/",
			element: <DashboardPage />,
		},
		{
			path: "/dashboard",
			element: <DashboardPage />,
		},
		{
			path: "/profile",
			element: <DashboardDefault />,
		},
		{
			path: "/joinMatch/:mId",
			element: <JoinTeam />,
		},
		{
			path: "/leaderBoard/:mId",
			element: <LeaderBoard />,
		},
	],
};

export default MainRoutes;
