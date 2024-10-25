"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";

import { signOut } from "aws-amplify/auth";

import { useRouter } from "next/navigation";

const Page = () => {
  const { isAuthenticated, user, loading } = useAuth();

  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
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
  );
};

export default Page;
