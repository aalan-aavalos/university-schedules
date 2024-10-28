"use client";

/* Autenticación */
import { signOut, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

/* MaterialUI */
import { Button, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Dashboard, CalendarMonth, EditCalendar } from "@mui/icons-material";

/* MUI Toolpad */
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

/* Components */
import { Gantt } from "@/components/gantt/Gantt";

/* const NAVIGATION_STUDENT: Navigation = [
  {
    segment: "dashboard",
    title: "Inicio",
    icon: <Dashboard />,
  },
  {
    segment: "generator_schedule",
    title: "Generar Calendario",
    icon: <CalendarMonth />,
  },
  {
    segment: "administrator_schedules",
    title: "Administrar Calendarios",
    icon: <EditCalendar />,
  },
]; */

/* const NAVIGATION_ADMIN: Navigation = [
  {
    segment: "dashboard",
    title: "Inicio",
    icon: <DashboardIcon />,
  },

  // {
  //   segment: "user",
  //   title: "Calendario",
  //   icon: <CalendarMonthIcon />,
  // },
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

const getNavigation = (user: FetchUserAttributesOutput | null): Navigation => {
  const NAVIGATION_BAR: Navigation = [
    {
      segment: "dashboard",
      title: "Inicio",
      icon: <Dashboard />,
    },
  ];

  const { ["custom:rol"]: rol } = user as FetchUserAttributesOutput;

  switch (rol) {
    case "admin":
      NAVIGATION_BAR.push({
        segment: "generator_schedule",
        title: "Generar Calendario",
        icon: <CalendarMonth />,
      });
      break;

    case "coordinator":
      break;

    case "teacher":
      break;

    case "student":
      NAVIGATION_BAR.push({
        segment: "administrator_schedules",
        title: "Administrar Calendarios",
        icon: <EditCalendar />,
      });
      break;

    default:
      break;
  }

  console.log(rol);

  return NAVIGATION_BAR;
};

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

const Page = () => {
  const routerMUI = useDemoRouter("/dashboard");

  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <AppProvider
      navigation={getNavigation(user)}
      branding={{
        /* logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />, */
        title: "University Schedules",
      }}
      router={routerMUI}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent user={user} pathname={routerMUI.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default Page;
