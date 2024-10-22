"use client";

import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Button } from "@mui/material";
import { ButtonQuery } from "@/components/ButtonQuery";

export function App() {
  const info_user = async () => {
    try {
      const user = await fetchUserAttributes();

      console.log("user:", user);
    } catch (error) {
      console.error("Error al obtener el usuario autenticado:", error);
    }
  };

  return (
    <>
      {/* <h1>Hello {user?.username}</h1> */}
      <Button variant="contained" color="error" onClick={() => signOut()}>
        Sign out
      </Button>

      <Button variant="contained" onClick={info_user}>
        See user
      </Button>

      <ButtonQuery />
    </>
  );
}

export default withAuthenticator(App);
