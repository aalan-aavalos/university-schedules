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
    const userID = await createUser({
      "custom:area": "",
      "custom:career": "abff032d-f05d-4923-8e93-b1d2b18255a9",
      "custom:four_month_period": "4",
      "custom:rol": "student",
      email: "alangamer00185@gmail.com",
      preferred_username: "lAlanGamerl",
    });

    console.log(userID);
  };
  return (
    <div>
      <Button onClick={queryUsers}>Consultar usuarios de cognito</Button>
      <Button onClick={createUserOne}>Crear usuarios de cognito</Button>
    </div>
  );
};

export default page;
