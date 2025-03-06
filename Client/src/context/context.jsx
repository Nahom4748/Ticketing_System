// Create ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isMenuCollapsed,
        toggleMenu: () => setIsMenuCollapsed(!isMenuCollapsed),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
