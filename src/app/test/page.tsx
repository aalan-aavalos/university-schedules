"use client";

import React from "react";

import { listUsers, createUser } from "@/aws-sdk/cognito_crud";
import { Button } from "@mui/material";

const page = () => {
  const queryUsers = async () => {
    const res = await listUsers();
    console.log("Resultado de usuarios:", res);
  };

  const createUserOne = async () => {
    await createUser("alangamer00185@gmail.com");
  };
  return (
    <div>
      <Button onClick={queryUsers}>Consultar usuarios de cognito</Button>
      <Button onClick={createUserOne}>Crear usuarios de cognito</Button>
    </div>
  );
};

export default page;
