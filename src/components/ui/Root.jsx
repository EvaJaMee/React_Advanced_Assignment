//import from libraries
import { Outlet } from "react-router-dom";
// import from files
// components/ui
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    <div className="root-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
