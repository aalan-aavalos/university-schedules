"use client"; // Asegura que este componente se ejecute en el navegador

import React from "react";

/* Providers de Material UI */
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AppProvider } from "@toolpad/core/AppProvider";

/* Provider de los cuadros de confirmación */
import { ConfirmProvider } from "material-ui-confirm";
/* Provider de los Toast */
import { SnackbarProvider } from "notistack";

/* Configuración de Amplify */
import { Amplify } from "aws-amplify";
import amplifyConfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(amplifyConfig, { ssr: true });

/* Tipos de datos */
import { ButtonProps } from "@mui/material";
import { ConfirmOptions } from "material-ui-confirm";

interface CustomConfirmOptions extends ConfirmOptions {
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
}

const optionsConfirmProvider: CustomConfirmOptions = {
  confirmationButtonProps: { variant: "contained", "aria-hidden": false },
  confirmationText: "Aceptar",
  cancellationButtonProps: {
    variant: "contained",
    color: "error",
    "aria-hidden": false,
  },
  cancellationText: "Cancelar",
  allowClose: false,
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfirmProvider defaultOptions={optionsConfirmProvider}>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={2500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AppRouterCacheProvider>
          <AppProvider>{children}</AppProvider>
        </AppRouterCacheProvider>
      </SnackbarProvider>
    </ConfirmProvider>
  );
};

export { Provider };
