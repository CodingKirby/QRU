import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";

import { QRUThemeProvider } from "./context/themeContext";
import Layout from "./components/layout/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NewCard from "./pages/NewCard";
import MyPage from "./pages/MyPage";
import MyCard from "./pages/MyCard";
import About from "./pages/About";
import Shuffle from "./pages/Shuffle";
import NotFound from "./pages/NotFound";
import Error from "./components/common/Error";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/cards",
    element: <NewCard />,
  },
  {
    path: "/cards/:id",
    element: <MyCard />,
  },
  {
    path: "/cards/shuffle",
    element: <Shuffle />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QRUThemeProvider>
        <RouterProvider router={router} />
      </QRUThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
