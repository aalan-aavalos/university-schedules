"use client";

import { ButtonQuery } from "@/components/ButtonQuery";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";

import { fetchUserAttributes, signOut } from "aws-amplify/auth";

import { useRouter } from "next/navigation";

const Page = () => {
  const { isAuthenticated, user, loading } = useAuth();

  const router = useRouter();

  const info_user = async () => {
    try {
      const user = await fetchUserAttributes();
      console.log("user:", user);
    } catch (error) {
      console.error("Error al obtener el usuario autenticado:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {user?.nickname}!</h1>
      <p>Email: {user?.email}</p>

      <ButtonQuery />
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
      <Button variant="contained" onClick={info_user}>
        See user
      </Button>
    </div>
  );
};

export default Page;
