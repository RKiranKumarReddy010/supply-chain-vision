import { useEffect } from "react";

const MouseIndicator = () => {
  useEffect(() => {
    // Restore default system cursor
    document.body.style.cursor = "auto";
    document.body.removeAttribute("data-disable-custom-cursor");
  }, []);

  return null;
};

export default MouseIndicator;
