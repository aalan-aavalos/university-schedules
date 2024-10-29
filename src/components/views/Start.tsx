import React from "react";

import { type FetchUserAttributesOutput } from "aws-amplify/auth";
import { SingOutButton } from "@/components/auth/SingOutButton";
const Start = ({ user }: { user: FetchUserAttributesOutput | null }) => {
  return (
    <div>
      <h1>Bienvenido, {user?.preferred_username}!</h1>
      <p>Email: {user?.email}</p>
      <p>Rol : {user?.["custom:rol"]}</p>

      <SingOutButton />
    </div>
  );
};

export { Start };
