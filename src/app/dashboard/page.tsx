"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";

import { signOut, type FetchUserAttributesOutput } from "aws-amplify/auth";

import { useRouter } from "next/navigation";

// layout:
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { createTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import { useDemoRouter } from "@toolpad/core/internal";

import { Gantt } from "@/components/gantt/Gantt";

/* const rol: string = "adm"; */

const NAVIGATION_STUDENT: Navigation = [
  {
    segment: "dashboard",
    title: "Inicio",
    icon: <DashboardIcon />,
  },

  {
    segment: "teacher_schedule",
    title: "Calendario",
    icon: <CalendarMonthIcon />,
  },
];

/* const NAVIGATION_TEACHER: Navigation = [
  {
    segment: "dashboard",
    title: "Inicio",
    icon: <DashboardIcon />,
  },

  {
    segment: "student_schedule",
    title: "Calendario",
    icon: <CalendarMonthIcon />,
  },
]; */

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

function DemoPageContent({
  pathname,
  user,
}: {
  pathname: string;
  user: FetchUserAttributesOutput | null;
}) {
  const router = useRouter();
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
        <div>
          <h1>Bienvenido, {user?.preferred_username}!</h1>
          <p>Email: {user?.email}</p>
          <p>Rol : {user?.["custom:rol"]}</p>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              router.push("/");
              signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      )}
      {pathname === "/teacher_schedule" && <Gantt />}
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

const Page = (props: DemoProps) => {
  const { window } = props;

  const routerMUI = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  const { isAuthenticated, user, loading } = useAuth();

  /* const getNavigation = (): Navigation => {}; */

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <AppProvider
      navigation={NAVIGATION_STUDENT}
      branding={{
        /* logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />, */
        title: "University Schedules",
      }}
      router={routerMUI}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent user={user} pathname={routerMUI.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default Page;
