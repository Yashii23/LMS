import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const location = useLocation();

  const authPages = ["/login", "/register"];

  const showSidebar = !authPages.includes(location.pathname);

  return (
    <>
      {showSidebar && <Sidebar />}

      <div className={showSidebar ? "main-layout" : ""}>
        {children}
      </div>
    </>
  );
}

export default Layout;