import { AnimatePresence, motion as Motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import useAOS from "../hooks/useAOS";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

// Shared navigation and page shell for signed-in routes.
function AuthenticatedAppShell() {
  useAOS();

  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        <Motion.div
          key="layout-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </Motion.div>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default AuthenticatedAppShell;
