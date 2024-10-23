"use client";

import { ButtonQuery } from "@/components/ButtonQuery";

import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { isAuthenticated, user, loading } = useAuth();

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
    </div>
  );
};

export default Page;
