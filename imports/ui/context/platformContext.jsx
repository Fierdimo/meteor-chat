import React from "react";

export const PlatformContext = React.createContext();

export default function PlatformProvider({ children }) {
  const [width, setWidth] = React.useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 480;

  return (
    <PlatformContext.Provider value={{ isMobile }}>
      {children}
    </PlatformContext.Provider>
  );
}
