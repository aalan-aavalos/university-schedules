"use client";

import React from "react";

/* Configuracion de Amplify */
import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";

Amplify.configure(awsconfig);

import { generateClient } from "aws-amplify/api";
import { listTodos } from "@/graphql/queries";

const client = generateClient();

const ButtonQuery = () => {
  const query_data = async (name: string = "Invitado") => {
    const allTodos = await client.graphql({
      query: listTodos,
    });

    console.log("Bienvenido,", name);
    console.log("consultando....");
    console.log(allTodos);
  };
  return (
    <>
      <button onClick={() => query_data()}>Consultar datos</button>
    </>
  );
};

export { ButtonQuery };
