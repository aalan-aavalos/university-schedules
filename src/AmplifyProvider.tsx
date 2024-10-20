// components/AmplifyProvider.tsx
"use client"; // Asegura que este componente se ejecute en el navegador

import { Amplify } from "aws-amplify";
import amplifyConfig from "./aws-exports";
import React from "react";

// Configuración de Amplify solo se ejecuta una vez
Amplify.configure(amplifyConfig);

const AmplifyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export { AmplifyProvider };
