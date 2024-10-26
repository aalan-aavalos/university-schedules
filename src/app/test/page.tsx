"use client";

import React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { createTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import { useDemoRouter } from "@toolpad/core/internal";

/* const rol: string = "adm"; */

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },

  /* rol === "adm" && */ {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
].filter(Boolean);

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/dashboard" && (
        <Typography>Dashboard content D for {pathname}</Typography>
      )}
      {pathname === "/orders" && (
        <Typography>Dashboard content O for {pathname}</Typography>
      )}
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        /* logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />, */
        title: "University Schedules",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
