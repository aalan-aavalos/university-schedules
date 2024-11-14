"use client";

/* Autenticación */
import { type FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuth } from "@/hooks/useAuth";

/* MaterialUI */
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  SpaceDashboard,
  CalendarMonth,
  // EditCalendar,
  ManageAccounts,
  Business,
  PostAdd,
  School,
  AssignmentInd,
} from "@mui/icons-material";

/* MUI Toolpad */
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

/* Components */

// General
import { Start } from "@/components/views/Start";

// Administrator
import { AreasAdmin } from "@/components/views/admin/AreasAdmin";
import { CareerAdmin } from "@/components/views/admin/CareerAdmin";
import { SubjectsAdmin } from "@/components/views/admin/SubjectsAdmin";
import { UsersAdmin } from "@/components/views/admin/UsersAdmin";

// Coordinator
import { AssignamentSubjects } from "@/components/views/coordinator/AssignamentSubjects";
import { CareerCoordinatorAdmin } from "@/components/views/coordinator/CareerCoordinatorAdmin";
import { SubjectsCoordinatorAdmin } from "@/components/views/coordinator/SubjectsCoordinatorAdmin";
import { UsersCoordinatorAdmin } from "@/components/views/coordinator/UsersCoordinatorAdmin";

// Teacher
import { ViewSubjects } from "@/components/views/teacher/ViewSubjects";
import { ScheduleTeacher } from "@/components/views/teacher/ScheduleTeacher";

// Student
import { ScheduleStudent } from "@/components/views/student/ScheduleStudent";

const getNavigation = (user: FetchUserAttributesOutput | null): Navigation => {
  const NAVIGATION_BAR: Navigation = [
    {
      segment: "dashboard",
      title: "Inicio",
      icon: <SpaceDashboard />,
    },
  ];

  const { ["custom:rol"]: rol } = user as FetchUserAttributesOutput;

  switch (rol) {
    case "admin":
      NAVIGATION_BAR.push(
        {
          kind: "header",
          title: "Administrar",
        },
        {
          segment: "areas_admin",
          title: "Areas",
          icon: <Business />,
        },
        {
          segment: "career_admin",
          title: "Carreras",
          icon: <School />,
        },
        {
          segment: "subjects_admin",
          title: "Materias",
          icon: <PostAdd />,
        },
        {
          segment: "user_admin",
          title: "Usuarios",
          icon: <ManageAccounts />,
        }
      );
      break;

    case "coordinator":
      NAVIGATION_BAR.push(
        {
          kind: "header",
          title: "Asignar",
        },
        {
          segment: "assignament_subjects_coordinator",
          title: "Materias a Profesores",
          icon: <AssignmentInd />,
        },
        {
          kind: "header",
          title: "Administrar",
        },
        {
          segment: "career_coordinator_admin",
          title: "Carreras",
          icon: <School />,
        },
        {
          segment: "subjects_coordinator_admin",
          title: "Materias",
          icon: <PostAdd />,
        },
        {
          segment: "user_coordinator_admin",
          title: "Usuarios",
          icon: <ManageAccounts />,
        }
      );
      break;

    case "teacher":
      NAVIGATION_BAR.push(
        {
          kind: "header",
          title: "Materias",
        },
        {
          segment: "subjects_teacher",
          title: "Visualizar",
          icon: <PostAdd />,
        },
        {
          kind: "header",
          title: "Calendario",
        },
        {
          segment: "generator_schedule_teacher",
          title: "Generar",
          icon: <CalendarMonth />,
        }
        /* {
          segment: "administrator_schedules_teacher",
          title: "Administrar",
          icon: <EditCalendar />,
        } */
      );
      break;

    case "student":
      NAVIGATION_BAR.push(
        {
          kind: "header",
          title: "Calendario",
        },
        {
          segment: "generator_schedule_student",
          title: "Generar",
          icon: <CalendarMonth />,
        }
        /*  {
          segment: "administrator_schedules_student",
          title: "Administrar",
          icon: <EditCalendar />,
        } */
      );
      break;

    default:
      break;
  }

  console.log(rol);

  return NAVIGATION_BAR;
};

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
  console.log(user);
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* General */}
      {pathname === "/dashboard" && <Start user={user} />}

      {/* Administrator */}
      {pathname === "/areas_admin" && <AreasAdmin />}
      {pathname === "/career_admin" && <CareerAdmin />}
      {pathname === "/subjects_admin" && <SubjectsAdmin />}
      {pathname === "/user_admin" && <UsersAdmin />}

      {/* Coordinator */}
      {pathname === "/assignament_subjects_coordinator" && (
        <AssignamentSubjects />
      )}
      {pathname === "/career_coordinator_admin" && <CareerCoordinatorAdmin />}
      {pathname === "/subjects_coordinator_admin" && (
        <SubjectsCoordinatorAdmin />
      )}
      {pathname === "/user_coordinator_admin" && <UsersCoordinatorAdmin />}

      {/* Teacher */}
      {pathname === "/subjects_teacher" && (
        <ViewSubjects teacharID={user?.sub} />
      )}
      {pathname === "/generator_schedule_teacher" && (
        <ScheduleTeacher teacharID={user?.sub} />
      )}

      {/* Student */}
      {pathname === "/generator_schedule_student" && <ScheduleStudent />}
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
