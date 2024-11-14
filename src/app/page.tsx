"use client";

import React, { SyntheticEvent, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SingInForm } from "@/components/login/SingInForm";
import { SingUpForm } from "@/components/login/SingUpForm";
import { useAuth } from "@/hooks/useAuth";

const App = () => {
  const [value, setValue] = useState<string>("1");
  const { isAuthenticated, loading } = useAuth();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <>
        <h1>Ya tienes sesión</h1>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", mt: 4 }}>
        Bienvenido
      </Typography>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", maxWidth: 600 }}>
          <TabList onChange={handleChange} centered aria-label="Opciones de inicio de sesión">
            <Tab label="Sign In" value="1" sx={{ fontWeight: "bold" }} />
            <Tab label="Sign Up" value="2" sx={{ fontWeight: "bold" }} />
          </TabList>
        </Box>

        <TabPanel value="1">
          <SingInForm />
        </TabPanel>

        <TabPanel value="2">
          <SingUpForm />
        </TabPanel>
      </TabContext>
    </Box>

  );
};

export default App;
