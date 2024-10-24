"use client";

import React, { SyntheticEvent, useState } from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { SingInForm } from "@/components/login/SingInForm";
import { SingUpForm } from "@/components/login/SingUpForm";

const App = () => {
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <h1>Bienvenido</h1>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sing In" value="1" />
            <Tab label="Sing Up" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SingInForm />
        </TabPanel>
        <TabPanel value="2">
          <SingUpForm />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default App;
