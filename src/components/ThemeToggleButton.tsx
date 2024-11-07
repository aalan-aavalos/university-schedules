// ThemeToggleButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useThemeToggle } from "@/app/provider"; // Importa el hook desde el archivo provider

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useThemeToggle();

  return (
    <Button onClick={toggleTheme} variant="contained">
      Cambiar a {isDarkMode ? "Tema Claro" : "Tema Oscuro"}
    </Button>
  );
};

export default ThemeToggleButton;
