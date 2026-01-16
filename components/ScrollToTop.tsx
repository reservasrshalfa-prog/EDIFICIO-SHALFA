
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reseta o scroll para o topo sempre que o caminho da URL mudar
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
