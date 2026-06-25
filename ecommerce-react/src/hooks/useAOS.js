import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * useAOS Hook
 * Initializes AOS (Animate On Scroll) library for scroll-triggered animations
 * Call once in your main App or Layout component
 */
function useAOS() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
      easing: "ease-in-out",
      delay: 0,
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);
}

export default useAOS;
